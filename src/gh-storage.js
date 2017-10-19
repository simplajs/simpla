import fetch from 'unfetch';
import {
  encodeBase64Unicode,
  getRandomString,
  noop,
  toShortcodeAndUploads
} from './utils';

export default class GitHub {
  constructor({
    repo,
    data = 'data',
    uploads = 'uploads',
    branch = 'master',
    credentials = null
  }) {
    this.repo = repo;
    this.branch = branch;
    this.paths = { data, uploads };
    this.credentials = credentials;
  }

  /**
   * Make authenticated request to GitHub
   * @param {string} urlPart URL part inserted after repo name
   * @param {Object=?} options Optional options object 
   */
  _request(urlPart, { method = 'GET', body } = {}) {
    const url = `https://api.github.com/repos/${this.repo}/${urlPart}`;
    const headers = { Authorization: `token ${this.credentials.token}` };

    body = body && JSON.stringify(body);

    if (!this.credentials.token) {
      return Promise.reject(
        new Error(
          `Could not make request to GitHub, invalid token "${this.credentials
            .token}"`
        )
      );
    }

    return fetch(url, { method, body, headers }).then(response => {
      if (response.status === 204) {
        return null;
      }

      return response.json().then(result => {
        // 404s are often expected and OK, others aren't
        if (!response.ok && response.status !== 404) {
          throw result;
        }

        return result;
      });
    });
  }

  _enqueue(next) {
    if (this._waitFor) {
      this._waitFor = this._waitFor.then(next);
    } else {
      this._waitFor = Promise.resolve().then(next);
    }

    return this._waitFor;
  }

  /**
   * Get all item paths in storage
   * @return {Promise<Array<string>>} Promise which resolves to an array of paths
   */
  all() {
    const dataPathParts = this.paths.data.split('/');
    const dataFolderName = dataPathParts.pop();
    const containerFolderPath = dataPathParts.join('/');

    const getBaseTree = results => {
      let dataFolder = results.find(({ name }) => name === dataFolderName);

      if (!dataFolder) {
        throw new Error(`Could not find folder "${this.paths.data}"`);
      }

      return this._request(`git/trees/${dataFolder.sha}?recursive=1`);
    };

    const getFilePaths = ({ tree }) => {
      return tree
        .filter(item => item.type === 'blob')
        .map(({ path }) => `/${path.replace('.json', '')}`);
    };

    return this._enqueue(() => {
      return this._request(`contents${containerFolderPath}?ref=${this.branch}`)
        .then(getBaseTree)
        .then(getFilePaths);
    });
  }

  /**
   * Start new storage transaction. For this module, means it will create a new
   * branch, then make all operations on that branch. Then after commit, it will
   * merge that branch back into the current working branch.
   * @return {Promise<Branch>} Transaction for operations to take place on 
   */
  startTransaction() {
    const transaction = new Transaction({
      repo: this.repo,
      from: this.branch,
      credentials: this.credentials,
      branch: `simpla-editing-${getRandomString()}`,
      data: this.paths.data,
      uploads: this.paths.uploads
    });

    const getShaFor = branch => {
      return this._request(`branches/${branch}`).then(
        ({ commit }) => commit.sha
      );
    };

    const createBranch = sha => {
      return this._request(`git/refs`, {
        method: 'POST',
        body: { ref: `refs/heads/${transaction.branch}`, sha }
      });
    };

    return getShaFor(this.branch)
      .then(createBranch)
      .then(() => transaction);
  }

  /**
   * Sets file at given path.
   * @param {string} path Path to file
   * @param {Object} data Data of file in plain Object to be serialized
   * @returns {Promise<object | string>} Resolves with given contents
   */
  set(path, data) {
    const [content, uploads] = toShortcodeAndUploads(data);

    const get = file => this._request(`contents${file}?ref=${this.branch}`);
    const toUploadEntry = ([file, content]) => [
      `${this.paths.uploads}/${file}`,
      content
    ];

    const itemPath = `${this.paths.data}${path}.json`;
    const itemContent = encodeBase64Unicode(JSON.stringify(content, null, 2));
    const itemEntry = [itemPath, itemContent];

    const asFileEntries = uploads.map(toUploadEntry).concat([itemEntry]);

    const updateEntry = (file, content) => ({ sha }) => {
      return this._request(`contents${file}`, {
        method: 'PUT',
        body: {
          message: `Updating ${file}`,
          branch: this.branch,
          path: file.slice(1),
          content,
          sha
        }
      });
    };

    const updateFile = ([file, content]) => {
      return this._enqueue(() => get(file).then(updateEntry(file, content)));
    };

    return Promise.all(asFileEntries.map(updateFile)).then(() => data);
  }

  /**
   * Remove file at given path
   * @param {string} path Path to file
   * @returns {Promise<null>} Resolves to null once finished
   */
  remove(path) {
    const file = `${this.paths.data}${path}.json`;
    const get = file => this._request(`contents${file}?ref=${this.branch}`);

    const deleteContent = ({ sha }) => {
      return this._request(`contents${file}`, {
        method: 'DELETE',
        body: {
          message: `Removing ${path}`,
          branch: this.branch,
          path: file.slice(1),
          sha
        }
      });
    };

    return this._enqueue(() => {
      return get(file)
        .then(deleteContent)
        .then(() => null);
    });
  }
}

class Transaction extends GitHub {
  constructor(options) {
    super(options);
    this.from = options.from;
  }

  /**
   * Commit all changes made in current transaction
   * i.e. merge all changes in branch back into branch
   * this was forked from
   * @return {Promise<undefined>} Resolves once successfully merged
   */
  commit() {
    const mergeIntoPreviousBranch = () => {
      return this._request('merges', {
        method: 'POST',
        body: {
          message: 'Merging editing branch',
          head: this.branch,
          base: this.from
        }
      });
    };

    const deleteOwnBranch = () => {
      return this._request(`git/refs/heads/${this.branch}`, {
        method: 'DELETE'
      });
    };

    return this._enqueue(() => {
      return mergeIntoPreviousBranch()
        .then(deleteOwnBranch)
        .then(noop);
    });
  }
}
