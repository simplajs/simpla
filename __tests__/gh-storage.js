import GhStorage from '../src/gh-storage.js';

jest.unmock('../src/gh-storage.js');

expect.addSnapshotSerializer({
  test(val) {
    return val && Array.isArray(val) && 'headers' in val[1] && 'body' in val[1];
  },
  print(val, serialize) {
    const [ url, { method, body, headers } ] = val;
    return serialize({
      url,
      method,
      body: body && JSON.parse(body),
      auth: headers.Authorization
    });
  }
});

const MOCK_TOKEN = 'some-token';
const BLANK_RESPONSE = [ JSON.stringify(''), { status: 200 } ];
const RESPONSES = {
  getContent: [ JSON.stringify({ sha: 'content-sha' }), { status: 200 } ],
  getBranch: [ JSON.stringify({ commit: { sha: 'commit-sha' } }), { status: 200 }],
  setContent: BLANK_RESPONSE,
  removeContent: BLANK_RESPONSE,
  createBranch: BLANK_RESPONSE,
  deleteBranch: BLANK_RESPONSE,
  createMerge: BLANK_RESPONSE 
};

describe('gh-storage', () => {
  let github;

  beforeAll(() => {
    Math._random = Math.random;
    Math.random = () => 0.5555;
  });

  afterAll(() => {
    Math.random = Math._random;
  });

  beforeEach(() => {
    github = new GhStorage({
      repo: 'someone/something',
      data: '/data',
      uploads: '/uploads',
      branch: 'master'
    });

    github.credentials = { token: MOCK_TOKEN };
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  describe('set', () => {
    it('should fetch and update files on GitHub', async () => {
      const [ mockFetch ] = fetch.mockResponses(RESPONSES.getContent, RESPONSES.setContent);
      await github.set('/foo', { some: 'data' });

      const [ get, put ] = mockFetch.mock.calls;

      expect(get).toMatchSnapshot();
      expect(put).toMatchSnapshot();
    });
  });

  describe('remove', () => {
    it('should get and remove blobs from GitHub', async () => {
      const [ mockFetch ] = fetch.mockResponses(RESPONSES.getContent, RESPONSES.removeContent);
      await github.remove('/foo');

      const [ get, remove ] = mockFetch.mock.calls;

      expect(get).toMatchSnapshot();
      expect(remove).toMatchSnapshot();
    });
  });

  describe('startTransaction', () => {
    it('should create a new branch', async () => {
      const [ mockFetch ] = fetch.mockResponses(RESPONSES.getBranch, RESPONSES.createBranch);
      await github.startTransaction();

      const [ getBranch, createBranch ] = mockFetch.mock.calls;

      expect(getBranch).toMatchSnapshot();
      expect(createBranch).toMatchSnapshot();
    });
  });

  describe('transaction', () => {
    let transaction;

    beforeEach(async () => {
      fetch.mockResponses(RESPONSES.getBranch, RESPONSES.createBranch);
      transaction = await github.startTransaction();
      fetch.resetMocks();
    });

    describe('commit', () => {
      it('should create a merge', async () => {
        const [ mockFetch ] = fetch.mockResponses(RESPONSES.createMerge, RESPONSES.deleteBranch);
        await transaction.commit();
        const [ createMerge, deleteBranch ] = mockFetch.mock.calls;

        expect(createMerge).toMatchSnapshot();
        expect(deleteBranch).toMatchSnapshot();
      });
    });
  });
});