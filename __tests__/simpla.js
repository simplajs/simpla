import Simpla from '../src/simpla';
import HTTPSource from '../src/http-source';
import GHStorage from '../src/gh-storage';
import NetlifyAuth from '../src/adapters/netlify';

const MOCK_DATE = new Date('2017-08-08');
const ITEMS = {
  saved: Object.values(HTTPSource._mockData),
  unsaved: [{
    path: '/some-item',
    type: 'Random Item',
    data: {
      value: 'Some data'
    }
  }, {
    path: '/another-item',
    type: 'Random Item',
    data: {
      value: 'Some more data'
    }
  }]
};  

describe('Simpla', () => {
  let simpla,
    authentication;

  beforeEach(() => {
    simpla = new Simpla();
    authentication = new NetlifyAuth();

    simpla.init({
      repo: 'someone/something',
      auth: authentication
    });
  });

  afterEach(() => {
    localStorage.clear();
    GHStorage.mockClear();
    NetlifyAuth.mockClear();
    HTTPSource.mockClear();
  });

  beforeAll(() => {
    Date.mock(MOCK_DATE);
  });

  afterAll(() => {
    Date.resetMock();
  });

  describe('content', () => {
    describe('get', () => {
      test('get data over HTTP', async () => {
        const saved = await simpla.get(ITEMS.saved[0].path);
        const unsaved = await simpla.get(ITEMS.unsaved[0].path);

        expect(saved).toMatchObject(ITEMS.saved[0]);
        expect(unsaved).toBeNull();
      });

      test('manually set data', async () => {
        const item = ITEMS.unsaved[0];

        const setItem = await simpla.set(item.path, item);
        const gotItem = await simpla.get(item.path);
        
        expect(gotItem).toMatchObject(setItem);
      });
    });

    describe('set', () => {
      const paths = { valid: '/path', invalid: 'path' };
      const jamie = { name: 'Jamie' };
      const path = '/person/jamie';

      test('creating data', async () => {
        const afterSet = await simpla.set(path, { data: jamie });
        expect(afterSet).toMatchSnapshot();

        const afterGet = await simpla.get(path);
        expect(afterGet).toMatchObject(afterSet);
      });

      test('updating data', async () => {
        await simpla.set(path, { data: jamie });
        Date.mock(MOCK_DATE.getTime() + 10000);
        const afterUpdate = await simpla.set(path, {
          data: Object.assign({ number: 28 }, jamie)
        });

        expect(new Date(afterUpdate.updatedAt).getTime()).toBeGreaterThan(
          new Date(afterUpdate.createdAt).getTime()
        );
      });

      test('validating paths', () => {
        expect(simpla.set(paths.invalid, { data: {} })).rejects.toBeDefined();
      });

      test('validating data properties', () => {
        expect(simpla.set(paths.valid, { foo: 'bar' })).rejects.toBeDefined();
      });

      test('validating data types', () => {
        expect(simpla.set(paths.valid, { type: 4 })).rejects.toBeDefined();
        expect(simpla.set(paths.valid, { data: 4 })).rejects.toBeDefined();
      });

      test('getting data overriden', async () => {
        const setAtPath = '/item';
        const declared = {
          path: '/another-path',
          createdAt: new Date('2000-01-01'),
          updatedAt: new Date('2000-01-01'),
          data: {}
        };

        const result = await simpla.set(setAtPath, declared);
        expect(result.path).toEqual(setAtPath);
        expect(result.createdAt).not.toEqual(declared.createdAt);
        expect(result.updatedAt).not.toEqual(declared.updatedAt);
      });
    });

    describe('observe', () => {
      test('observe', async () => {
        let counter = 0;

        const path = '/some-item';
        const observer = jest.fn();
        const { unobserve } = simpla.observe(path, observer);

        const expected = await simpla.set(path, { data: { count: counter++ } });
        expect(observer).toHaveBeenCalledWith(expected, expected.path);

        const called = observer.mock.calls.length;
        await simpla.set(path, expected);
        expect(observer).toHaveBeenCalledTimes(called);

        unobserve();
        await simpla.set(path, { data: { count: counter++ } });
        expect(observer).toHaveBeenCalledTimes(called);
      });
    });
  });

  describe('state', () => {
    describe('getState', () => {
      test('config', () => {
        expect(simpla.getState('config')).toMatchSnapshot();
      });
    
      test('editable', () => {
        expect(simpla.getState('editable')).toBe(false);

        simpla.editable(true);
        expect(simpla.getState('editable')).toBe(true);

        simpla.editable(false);
        expect(simpla.getState('editable')).toBe(false);
      });

      test('buffer', async () => {
        const item = ITEMS.unsaved[0];
        
        await simpla.get(item.path);
        const buffer = simpla.getState('buffer');

        expect(buffer[item.path].modified).toBe(false);

        await simpla.set(item.path, item);
        expect(buffer[item.path].modified).toBe(true);
      });
    });

    describe('observeState', () => {
      test('triggering changes', () => {
        const observer = jest.fn();
        const updated = !simpla.getState('editable');
        simpla.observeState('editable', observer);

        simpla.editable(updated);
        expect(observer).toHaveBeenCalledWith(updated, 'editable');
      });
    });
  });

  describe('authentication', () => {
    beforeEach(async () => {
      await simpla.login();
    });

    describe('login', () => {
      test('calls authenticate', async () => {
        expect(authentication.authenticate).toHaveBeenCalled();
      });

      test('stores token in state', async () => {
        expect(simpla.getState('token')).toBe(NetlifyAuth._mockData.token);
        expect(simpla.getState('authenticated')).toBe(true);
      });

      test('persists token', async () => {
        const extraSimplaInstance = new Simpla();
        extraSimplaInstance.init({});

        expect(extraSimplaInstance.getState('token')).toEqual(simpla.getState('token'));
      });
    });

    describe('logout', () => {
      beforeEach(async () => {
        await simpla.logout();
      });

      test('updates state', () => {
        expect(simpla.getState('token')).toBeNull();
        expect(simpla.getState('authenticated')).toBe(false);
      });

      test('removes persistant', () => {
        const extraSimplaInstance = new Simpla();
        extraSimplaInstance.init({});

        expect(extraSimplaInstance.getState('token')).toBeNull();
      });
    });
  });

  describe('saving', () => {
    it('should only commit changed files', async () => {
      const storage = GHStorage.mock.instances[0];
      const { saved, unsaved } = ITEMS;

      const [ shouldNotBeSet, shouldBeRemoved ] = saved;
      const [ shouldBeSet, shouldNotBeRemoved ] = unsaved;

      await simpla.set(shouldNotBeSet.path, shouldNotBeSet);
      await simpla.remove(shouldNotBeRemoved.path);
      
      await simpla.set(shouldBeSet.path, shouldBeSet);
      await simpla.remove(shouldBeRemoved.path);

      await simpla.save(); 

      const savedItems = storage._mockState.transactions[0];

      expect(savedItems).toHaveProperty(shouldBeSet.path);
      expect(savedItems).toHaveProperty(shouldBeRemoved.path);

      expect(savedItems).not.toHaveProperty(shouldNotBeSet.path);
      expect(savedItems).not.toHaveProperty(shouldNotBeRemoved.path);
    });

    it('should be able to save only a given path', async () => {
      const storage = GHStorage.mock.instances[0];
      const { unsaved } = ITEMS;
      const toSave = unsaved[0];

      await Promise.all(
        unsaved.map(item => simpla.set(item.path, item))
      );

      await simpla.save(toSave.path);

      const savedItems = storage._mockState.transactions[0];

      expect(savedItems).toHaveProperty(toSave.path);
      expect(savedItems[toSave.path]).toMatchObject(toSave);

      expect(Object.keys(savedItems)).toHaveLength(1);
    });

    it('should reject invalid paths', async () => {
      await expect(simpla.save('invalid-path')).rejects.toBeDefined();
    });
  });
});
