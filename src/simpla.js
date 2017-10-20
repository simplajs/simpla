import HttpSource from './http-source.js';
import GitHubStorage from './gh-storage.js';
import Store from './store.js';
import {
  assign,
  equal,
  clone,
  validatePath,
  validateItem,
  byModified
} from './utils.js';

const LOCAL_STORAGE_KEY = 'sm.oss.token';
const DATA_FOLDER = 'data';
const UPLOADS_FOLDER = 'uploads';
const BASE_FOLDER = '_content';

export default class Simpla {
  constructor() {
    this._content = new Store();
    this._states = new Store();
    this._cache = new Store();

    this.version = VERSION;
  }

  /**
   * Initialize Simpla with given configuration
   * @param {Object} Configuration options 
   */
  init(config = {}) {
    let {
      repo,
      auth,
      public: publicFolder = '',
      branch = 'master',
      source = `https://raw.githubusercontent.com/${repo}/${branch}/${publicFolder}`,
      _indexes = []
    } = config;

    source =
      source.charAt(source.length - 1) === '/' ? source.slice(0, -1) : source;

    const data = `/${BASE_FOLDER}/${DATA_FOLDER}`;
    const uploads = `/${BASE_FOLDER}/${UPLOADS_FOLDER}`;

    // Setup adaptors
    this._source = new HttpSource({
      data: source + data,
      uploads: source + uploads,
      cacheBusting: /\/\/raw\.githubusercontent\.com/.test(source)
    });

    this._auth = auth;
    this._storage = new GitHubStorage({
      data: publicFolder ? `/${publicFolder}${data}` : data,
      uploads: publicFolder ? `/${publicFolder}${uploads}` : uploads,
      repo,
      branch
    });

    // Setup states
    const updateBuffer = (item, key) => {
      let buffer = this._states.get('buffer'),
        remote = this._cache.get(key),
        modified = !equal(remote && remote.data, item && item.data);

      buffer[key] = { modified };

      this._states.set('buffer', buffer);
    };

    this._content.observe('*', updateBuffer);
    this._cache.observe('*', updateBuffer);

    this.observeState('token', token => {
      if (token) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, token);
      } else {
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      }

      this._states.set('authenticated', !!token);
      this._storage.credentials = { token };
    });

    this._states.set('config', { repo, branch, public: publicFolder, source });
    this._states.set(
      'token',
      window.localStorage.getItem(LOCAL_STORAGE_KEY) || null
    );
    this._states.set('editable', false);
    this._states.set('buffer', {});

    // Setup indexes
    _indexes.forEach(index => {
      const byCreated = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
      const { name, filter } = index;

      this.get(`/_index/${name}`).then(index => {
        const store = new Store();
        let items = (index && index.data) || [];
        items.forEach(item => store.set(item.path, item));

        // For all items not in index
        this._content.observe('*', (item, key) => {
          if (filter(item)) {
            store.set(key, item);
          } else if (store.has(key)) {
            store.set(key, null);
          }
        });

        store.observe('*', () => {
          let data = store
            .entries()
            .map(([, item]) => item)
            .filter(item => !!item)
            .sort(byCreated);
          this._content.set(`/_index/${name}`, { data });
        });
      });
    });
  }

  /**
   * Fetch content from storage for given key
   * @param {string} path Path to item
   * @returns {Promise<Object>} Value of item in storage
   */
  _fetch(path) {
    if (this._cache.has(path)) {
      return Promise.resolve(this._cache.get(path));
    }

    return this._source.get(path).then(body => {
      this._cache.set(path, body);
      return body;
    });
  }

  /**
   * Get given stored state
   * @param {string} state 
   * @returns {*} Value of state
   */
  getState(state) {
    return state ? this._states.get(state) : this._states.toObject();
  }

  /**
   * Switch edit mode on or off
   * @param {boolean} on 
   * @returns {undefined}
   */
  editable(on) {
    this._states.set('editable', on);
  }

  /**
   * Observe given state
   * @param {string} state State to observer 
   * @param {Function} callback Function to call each time state changes 
   * @returns {Object} Returns subscription object with unobserve function
   */
  observeState(state, callback) {
    return this._states.observe(state, callback);
  }

  /**
   * Get current value at given path
   * @param {string} path Path of value to retrieve 
   */
  get(path) {
    if (this._content.has(path)) {
      return Promise.resolve(this._content.get(path));
    }

    return this._fetch(path).then(data => {
      this._content.set(path, data);
      return data;
    });
  }

  /**
   * Set data at given path
   * @param {string} path 
   * @param {Object} value 
   * @returns {Promise<Object>} Promise which resolves to given value
   */
  set(path, value) {
    return Promise.resolve()
      .then(() => {
        validatePath(path);
        validateItem(value);
        return this.get(path);
      })
      .then(current => {
        const same = prop => value && current && equal(value[prop], current[prop]);

        // Data and type are the only properties which might have changed,
        //  if they're the same, there's no need to update the internal
        //  content store and we can do a quick return
        if (value === current || (same('data') && same('type'))) {
          return current;
        }

        if (value === null) {
          return Promise.resolve(this._content.set(path, value));
        }

        const working = assign({ type: null }, current || {}, value, {
          path
        });

        if (!current) {
          working.createdAt = new Date().toISOString();
        }

        working.updatedAt = new Date().toISOString();

        this._content.set(path, clone(working));

        // Note: this could be costly, worth keeping an eye on
        return working;
      });
  }

  /**
   * Remove data at given path
   * @param {string} path 
   * @returns {Promise<Object>} Promise which resolves to null 
   */
  remove(path) {
    validatePath(path);
    return this.set(path, null);
  }

  /**
   * Observe value at given path
   * @param {string} path 
   * @param {Function} callback
   * @returns {Object} Returns subscription object with unobserve function 
   */
  observe(path, callback) {
    validatePath(path);
    return this._content.observe(path, callback);
  }

  /**
   * Login using current authentication module. Stores resulting token
   * @returns {Promise<undefined>} Returns once successfully authenticated
   */
  login() {
    return this._auth.authenticate().then(({ token }) => {
      this._states.set('token', token);
    });
  }

  /**
   * Logs out, meaning it sets the current token to null
   */
  logout() {
    this._states.set('token', null);
  }

  /**
   * Save changes in local buffer to storage. If path is provided, will 
   *   only save changes at that path
   * @param {string?} path
   * @returns {Promise<undefined>} Resolves once all changes saved
   */
  save(path) {
    const buffer = this.getState('buffer');
    const entries = path ? [[ path, this._content.get(path) ]] : this._content.entries();
    const changedFiles = entries.filter(byModified(buffer));
    const hasChanges = !!changedFiles.length;

    const persistAll = transaction => {
      if (!hasChanges) {
        return;
      }

      changedFiles.forEach(([path, contents]) => {
        if (contents === null) {
          transaction.remove(path);
        } else {
          transaction.set(path, contents);
        }
      });

      return transaction.commit();
    };

    const resetContent = () => {
      // TODO: This doesn't account for any conversions made in the storage
      changedFiles.forEach(([key, contents]) => {
        this._content.set(key, contents);
        this._cache.set(key, contents);
      });
    };

    return Promise.resolve()
      .then(() => {
        if (path) {
          validatePath(path);
        }

        if (hasChanges) {
          return this._storage.startTransaction();
        }
      })
      .then(persistAll)
      .then(resetContent);
  }

  /**
   * Load all items in remote database. Useful for refactoring database
   *  or initialising indexes
   * @returns {Promise<Array<Object>>} Resolves to an array of all remote items
   */
  _loadDB() {
    return this._storage.all().then(paths => {
      return Promise.all(paths.map(path => this.get(path)));
    });
  }
}
