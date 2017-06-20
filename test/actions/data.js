import * as dataActions from '../../src/actions/data';
import * as apiActions from '../../src/actions/api';
import { INVALID_DATA } from '../../src/constants/errors';
import { DATA_PREFIX, QUERIES_PREFIX } from '../../src/constants/state';
import { toQueryParams, makeBlankItem, pathToUid, toUidQuery } from '../../src/utils/helpers';
import thunk from 'redux-thunk';
import configureMockStore from '../__utils__/redux-mock-store';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([ thunk ]);

const PATH_FOR_STORED = '/foo/bar';
const TO_STORE = { data: { foo: 'baz' } };
const STORE_AT_PATH = { path: PATH_FOR_STORED, data: { foo: 'baz' } };
const BAD_DATA = { foo: 'bar' };
const SERVER = 'some-server';
const PATH_FOR_NOT_STORED = '/some/uid/to/something';
const PATH_FOR_EMPTY_NOT_STORED = '/some/uid/to/nothing';
const RESPONSE = { path: PATH_FOR_NOT_STORED, data: { foo: 'bar' } };

// Find Data
const BLANK_QUERY = {};
const BLANK_QUERY_ITEMS = [{
  path: '/foo',
  data: {}
}, {
  path: '/foo/bar',
  data: {}
}];
const PARENT_QUERY = { parent: '/foo' };
const PARENT_QUERY_STRING = toQueryParams(PARENT_QUERY);
const PARENT_QUERY_ITEMS = [{
  path: '/foo/bar',
  data: {}
}];

describe('data actions', () => {
  beforeEach(() => {
    fetchMock
      .mock(`${SERVER}/${pathToUid(PATH_FOR_NOT_STORED)}`, 'GET', RESPONSE)
      .mock(`${SERVER}/${pathToUid(PATH_FOR_NOT_STORED)}`, 'PUT', RESPONSE)
      .mock(`${SERVER}/${toQueryParams(toUidQuery(PARENT_QUERY))}`, 'GET', { items: PARENT_QUERY_ITEMS })
      .mock(`${SERVER}/`, 'GET', { items: BLANK_QUERY_ITEMS })
      .mock(`${SERVER}/${pathToUid(PATH_FOR_NOT_STORED)}`, 'DELETE', {})
      .mock(`${SERVER}/${pathToUid(PATH_FOR_EMPTY_NOT_STORED)}`, 'GET', { status: 204 });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('find', () => {
    let initialState,
        store;

    beforeEach(() => {
      initialState = {
        config: {
          dataEndpoint: SERVER
        },
        [DATA_PREFIX]: {}
      };
      store = mockStore(initialState);
    });

    it('should return all data in state if no params', () => {
      return store.dispatch(dataActions.find(BLANK_QUERY))
        .then(() => {
          let toInclude = [
            dataActions.findData(BLANK_QUERY),
            apiActions.findData(BLANK_QUERY),
            apiActions.findDataSuccessful(BLANK_QUERY, { items: BLANK_QUERY_ITEMS }),
            ...BLANK_QUERY_ITEMS.reduce((actions, item) => {
              return [
                ...actions,
                dataActions.setData(item.path, item),
                dataActions.setDataSuccessful(item.path, item)
              ];
            }, []),
            // NOTE: Items is empty because the state is empty; no reducers are
            //  on the mock store
            dataActions.findDataSuccessful(BLANK_QUERY, { items: [] })
          ];

          expect(store.getActions()).to.deep.include.members(toInclude);
        });
    });

    it('should add query param when filtering by parent', () => {
      return store.dispatch(dataActions.find(PARENT_QUERY))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.findData(PARENT_QUERY),
            apiActions.findData(PARENT_QUERY),
            apiActions.findDataSuccessful(PARENT_QUERY, { items: PARENT_QUERY_ITEMS }),
            ...PARENT_QUERY_ITEMS.reduce((actions, item) => {
              return [
                ...actions,
                dataActions.setData(item.path, item),
                dataActions.setDataSuccessful(item.path, item)
              ];
            }, []),
            // NOTE: Items is empty because the state is empty; no reducers are
            //  on the mock store
            dataActions.findDataSuccessful(PARENT_QUERY, { items: [] })
          ]);
        });
    });

    it('shouldnt overwrite the state if already stored', () => {
      // Partially fill buffer
      let [ firstItem, secondItem ] = BLANK_QUERY_ITEMS;
      initialState[DATA_PREFIX] = {
        [ firstItem.path ]: firstItem
      };

      store = mockStore(initialState);

      return store.dispatch(dataActions.find(BLANK_QUERY))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.findData(BLANK_QUERY),
            apiActions.findData(BLANK_QUERY),
            apiActions.findDataSuccessful(BLANK_QUERY, { items: BLANK_QUERY_ITEMS }),
            dataActions.setData(secondItem.path, secondItem),
            dataActions.setDataSuccessful(secondItem.path, secondItem),
            // NOTE: There're no reducers on the state, therefore it only returns what
            //  matches in the state at the start
            dataActions.findDataSuccessful(BLANK_QUERY, { items: [ firstItem ] })
          ]);

          expect(store.getActions()).not.to.deep.include.members([
            dataActions.setData(firstItem.path, firstItem),
            dataActions.setDataSuccessful(firstItem.path, firstItem),
          ]);
        });
    });

    it('should just return whats in the state if the query has already run', () => {
      initialState[QUERIES_PREFIX] = {
        [ PARENT_QUERY_STRING ]: { queriedRemote: true }
      };

      store = mockStore(initialState);

      return store.dispatch(dataActions.find(PARENT_QUERY))
        .then(() => {
          expect(store.getActions()).not.to.deep.include.members([
            apiActions.findData(PARENT_QUERY),
            apiActions.findDataSuccessful(PARENT_QUERY, { items: PARENT_QUERY_ITEMS }),
            ...PARENT_QUERY_ITEMS.reduce((actions, item) => {
              return [
                ...actions,
                dataActions.setData(item.path, item),
                dataActions.setDataSuccessful(item.path, item)
              ];
            }, [])
          ]);

          expect(store.getActions()).to.deep.include.members([
            dataActions.findData(PARENT_QUERY),
            dataActions.findDataSuccessful(PARENT_QUERY, { items: [] })
          ]);
        });
    });
  });

  describe('get', () => {
    const data = {
      [ PATH_FOR_STORED ]: STORE_AT_PATH
    };

    it('should get value in the state', () => {
      let store = mockStore({ [ DATA_PREFIX ]: data });

      return store.dispatch(dataActions.get(PATH_FOR_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.getData(PATH_FOR_STORED),
            dataActions.getDataSuccessful(PATH_FOR_STORED, STORE_AT_PATH)
          ]);
        });
    });

    it('should get values from API if no value is in state', () => {
      let store = mockStore({
        config: {
          dataEndpoint: SERVER
        },
        data
      });

      return store.dispatch(dataActions.get(PATH_FOR_NOT_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.getData(PATH_FOR_NOT_STORED),
            apiActions.getData(PATH_FOR_NOT_STORED),
            apiActions.getDataSuccessful(PATH_FOR_NOT_STORED, RESPONSE),
            dataActions.setData(PATH_FOR_NOT_STORED, RESPONSE),
            dataActions.setDataSuccessful(PATH_FOR_NOT_STORED, RESPONSE),
            dataActions.getDataSuccessful(PATH_FOR_NOT_STORED, RESPONSE)
          ]);
        });
    });

    it('should set null to the state if null on server', () => {
      let store = mockStore({
        config: { dataEndpoint: SERVER },
        data
      });

      return store.dispatch(dataActions.get(PATH_FOR_EMPTY_NOT_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.getData(PATH_FOR_EMPTY_NOT_STORED),
            apiActions.getData(PATH_FOR_EMPTY_NOT_STORED),
            apiActions.getDataSuccessful(PATH_FOR_EMPTY_NOT_STORED, null),
            dataActions.setData(PATH_FOR_EMPTY_NOT_STORED, null),
            dataActions.setDataSuccessful(PATH_FOR_EMPTY_NOT_STORED, null),
            dataActions.getDataSuccessful(PATH_FOR_EMPTY_NOT_STORED, null)
          ])
        });
    });

    it('should not set implicit ancestors when getting from API', () => {
      let child = PATH_FOR_NOT_STORED,
          parent = PATH_FOR_NOT_STORED.split('.').slice(0, -1).join('.'),
          store = mockStore({
            config: {
              dataEndpoint: SERVER
            },
            data
          });

      return store.dispatch(dataActions.get(child))
        .then(() => {
          expect(store.getActions()).to.not.deep.include.members([
            dataActions.setData(parent, makeBlankItem())
          ]);
        });
    });
  });

  describe('set', () => {
    it('should fire off set and set successful', () => {
      let store = mockStore({});

      return store.dispatch(dataActions.set(PATH_FOR_STORED, TO_STORE))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.setData(PATH_FOR_STORED, TO_STORE),
            dataActions.setDataSuccessful(PATH_FOR_STORED, STORE_AT_PATH)
          ]);
        });
    });

    it('should set ancestors if not in buffer', () => {
      let child = '/foo/bar/baz/qux',
          missingAncestors = [ '/foo/bar/baz', '/foo/bar' ],
          knownAncestor = '/foo',
          expectedActions,
          unexpectedActions,
          initialState,
          store;

      initialState = {
        [ DATA_PREFIX ]: {
          [ knownAncestor ]: makeBlankItem()
        }
      };

      store = mockStore(initialState);

      expectedActions = missingAncestors.reduce((actions, path) => {
        return [
          ...actions,
          dataActions.setData(path, makeBlankItem()),
          dataActions.setDataSuccessful(path, makeBlankItem(), { persist: false })
        ];
      }, []);

      unexpectedActions = [ dataActions.setData(knownAncestor, makeBlankItem()) ];

      return store.dispatch(dataActions.set(child, makeBlankItem()))
        .then(() => {
          expect(store.getActions())
            .to.deep.include.members(expectedActions)
            .and.to.not.deep.include.members(unexpectedActions);
        });
    });

    it('shouldnt create ancestors if createAncestry is false', () => {
      let store = mockStore({});

      return store.dispatch(dataActions.set('/foo/bar/baz/qux', makeBlankItem(), { createAncestry: false }))
        .then(() => {
          expect(store.getActions())
            .to.not.deep.include.members([
              dataActions.setData('/foo/bar/baz', makeBlankItem())
            ]);
        });
    });

    it('should fail if data doesnt match correct structure', () => {
      let store = mockStore({});

      return store.dispatch(dataActions.set(PATH_FOR_STORED, BAD_DATA))
        .then(() => {
          throw Error('Set should have errored');
        })
        .catch(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.setData(PATH_FOR_STORED, BAD_DATA),
            dataActions.setDataFailed(PATH_FOR_STORED, new Error(INVALID_DATA))
          ])
        });
    });

    it('should accept any data if validate is set to false', () => {
      let store = mockStore({});

      return store.dispatch(dataActions.set(PATH_FOR_STORED, BAD_DATA, { validate: false }))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.setData(PATH_FOR_STORED, BAD_DATA),
            dataActions.setDataSuccessful(PATH_FOR_STORED, BAD_DATA)
          ])
          .and.to.not.deep.include.members([
            dataActions.setDataFailed(PATH_FOR_STORED, new Error(INVALID_DATA))
          ]);
        });
    });
  });

  describe('remove', () => {
    it('should fire off remove and remove successful', () => {
      let store = mockStore({});

      return store.dispatch(dataActions.remove(PATH_FOR_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.removeData(PATH_FOR_STORED),
            dataActions.removeDataSuccessful(PATH_FOR_STORED)
          ]);
        });
    });

    it('should fire remove actions for children', () => {
      let store = mockStore({
        [ DATA_PREFIX ]: {
          '/foo': {
            path: '/foo'
          },
          '/foo/bar': {
            path: '/foo/bar'
          }
        }
      });

      return store.dispatch(dataActions.remove('/foo'))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.removeData('/foo/bar'),
            dataActions.removeDataSuccessful('/foo/bar', { persist: false })
          ]);
        })
    });
  });
});
