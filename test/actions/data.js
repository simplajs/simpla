import * as dataActions from '../../src/actions/data';
import * as apiActions from '../../src/actions/api';
import { INVALID_DATA } from '../../src/constants/errors';
import { DATA_PREFIX, QUERIES_PREFIX } from '../../src/constants/state';
import { toQueryParams, makeBlankItem } from '../../src/utils/helpers';
import thunk from 'redux-thunk';
import configureMockStore from '../__utils__/redux-mock-store';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([ thunk ]);

const UID_FOR_STORED = 'foo.bar';
const TO_STORE = { data: { foo: 'baz' } };
const STORED_AT_UID = { id: UID_FOR_STORED, data: { foo: 'baz' } };
const BAD_DATA = { foo: 'bar' };
const SERVER = 'some-server';
const UID_FOR_NOT_STORED = 'some.uid.to.something';
const UID_FOR_EMPTY_NOT_STORED = 'some.uid.to.nothing';
const RESPONSE = { id: UID_FOR_NOT_STORED, data: { foo: 'bar' } };

// Find Data
const BLANK_QUERY = {};
const BLANK_QUERY_ITEMS = [{
  id: 'foo',
  data: {}
}, {
  id: 'foo.bar',
  data: {}
}];
const PARENT_QUERY = { parent: 'foo' };
const PARENT_QUERY_STRING = toQueryParams({ parent: 'foo' });
const PARENT_QUERY_ITEMS = [{
  id: 'foo.bar',
  data: {}
}];

describe('data actions', () => {
  beforeEach(() => {
    fetchMock
      .mock(`${SERVER}/${UID_FOR_NOT_STORED}`, 'GET', RESPONSE)
      .mock(`${SERVER}/${UID_FOR_NOT_STORED}`, 'PUT', RESPONSE)
      .mock(`${SERVER}/${PARENT_QUERY_STRING}`, 'GET', { items: PARENT_QUERY_ITEMS })
      .mock(`${SERVER}/`, 'GET', { items: BLANK_QUERY_ITEMS })
      .mock(`${SERVER}/${UID_FOR_NOT_STORED}`, 'DELETE', {})
      .mock(`${SERVER}/${UID_FOR_EMPTY_NOT_STORED}`, 'GET', { status: 204 });
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
                dataActions.setData(item.id, item),
                dataActions.setDataSuccessful(item.id, item)
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
                dataActions.setData(item.id, item),
                dataActions.setDataSuccessful(item.id, item)
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
        [ firstItem.id ]: firstItem
      };

      store = mockStore(initialState);

      return store.dispatch(dataActions.find(BLANK_QUERY))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.findData(BLANK_QUERY),
            apiActions.findData(BLANK_QUERY),
            apiActions.findDataSuccessful(BLANK_QUERY, { items: BLANK_QUERY_ITEMS }),
            dataActions.setData(secondItem.id, secondItem),
            dataActions.setDataSuccessful(secondItem.id, secondItem),
            // NOTE: There're no reducers on the state, therefore it only returns what
            //  matches in the state at the start
            dataActions.findDataSuccessful(BLANK_QUERY, { items: [ firstItem ] })
          ]);

          expect(store.getActions()).not.to.deep.include.members([
            dataActions.setData(firstItem.id, firstItem),
            dataActions.setDataSuccessful(firstItem.id, firstItem),
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
                dataActions.setData(item.id, item),
                dataActions.setDataSuccessful(item.id, item)
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
      [ UID_FOR_STORED ]: STORED_AT_UID
    };

    it('should get value in the state', () => {
      let store = mockStore({ [ DATA_PREFIX ]: data });

      return store.dispatch(dataActions.get(UID_FOR_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.getData(UID_FOR_STORED),
            dataActions.getDataSuccessful(UID_FOR_STORED, STORED_AT_UID)
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

      return store.dispatch(dataActions.get(UID_FOR_NOT_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.getData(UID_FOR_NOT_STORED),
            apiActions.getData(UID_FOR_NOT_STORED),
            apiActions.getDataSuccessful(UID_FOR_NOT_STORED, RESPONSE),
            dataActions.setData(UID_FOR_NOT_STORED, RESPONSE),
            dataActions.setDataSuccessful(UID_FOR_NOT_STORED, RESPONSE),
            dataActions.getDataSuccessful(UID_FOR_NOT_STORED, RESPONSE)
          ]);
        });
    });

    it('should set null to the state if null on server', () => {
      let store = mockStore({
        config: { dataEndpoint: SERVER },
        data
      });

      return store.dispatch(dataActions.get(UID_FOR_EMPTY_NOT_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.getData(UID_FOR_EMPTY_NOT_STORED),
            apiActions.getData(UID_FOR_EMPTY_NOT_STORED),
            apiActions.getDataSuccessful(UID_FOR_EMPTY_NOT_STORED, null),
            dataActions.setData(UID_FOR_EMPTY_NOT_STORED, null),
            dataActions.setDataSuccessful(UID_FOR_EMPTY_NOT_STORED, null),
            dataActions.getDataSuccessful(UID_FOR_EMPTY_NOT_STORED, null)
          ])
        });
    });

    it('should not set implicit ancestors when getting from API', () => {
      let child = UID_FOR_NOT_STORED,
          parent = UID_FOR_NOT_STORED.split('.').slice(0, -1).join('.'),
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

      return store.dispatch(dataActions.set(UID_FOR_STORED, TO_STORE))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.setData(UID_FOR_STORED, TO_STORE),
            dataActions.setDataSuccessful(UID_FOR_STORED, STORED_AT_UID)
          ]);
        });
    });

    it('should set ancestors if not in buffer', () => {
      let child = 'foo.bar.baz.qux',
          missingAncestors = [ 'foo.bar.baz', 'foo.bar' ],
          knownAncestor = 'foo',
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

      expectedActions = missingAncestors.reduce((actions, id) => {
        return [
          ...actions,
          dataActions.setData(id, makeBlankItem()),
          dataActions.setDataSuccessful(id, makeBlankItem(), { persist: false })
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

      return store.dispatch(dataActions.set('foo.bar.baz.qux', makeBlankItem(), { createAncestry: false }))
        .then(() => {
          expect(store.getActions())
            .to.not.deep.include.members([
              dataActions.setData('foo.bar.baz', makeBlankItem())
            ]);
        });
    });

    it('should fail if data doesnt match correct structure', () => {
      let store = mockStore({});

      return store.dispatch(dataActions.set(UID_FOR_STORED, BAD_DATA))
        .then(() => {
          throw Error('Set should have errored');
        })
        .catch(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.setData(UID_FOR_STORED, BAD_DATA),
            dataActions.setDataFailed(UID_FOR_STORED, new Error(INVALID_DATA))
          ])
        });
    });

    it('should accept any data if validate is set to false', () => {
      let store = mockStore({});

      return store.dispatch(dataActions.set(UID_FOR_STORED, BAD_DATA, { validate: false }))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.setData(UID_FOR_STORED, BAD_DATA),
            dataActions.setDataSuccessful(UID_FOR_STORED, BAD_DATA)
          ])
          .and.to.not.deep.include.members([
            dataActions.setDataFailed(UID_FOR_STORED, new Error(INVALID_DATA))
          ]);
        });
    });
  });

  describe('remove', () => {
    it('should fire off remove and remove successful', () => {
      let store = mockStore({});

      return store.dispatch(dataActions.remove(UID_FOR_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.removeData(UID_FOR_STORED),
            dataActions.removeDataSuccessful(UID_FOR_STORED)
          ]);
        });
    });

    it('should fire remove actions for children', () => {
      let store = mockStore({
        [ DATA_PREFIX ]: {
          'foo': {
            id: 'foo'
          },
          'foo.bar': {
            id: 'foo.bar'
          }
        }
      });

      return store.dispatch(dataActions.remove('foo'))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            dataActions.removeData('foo.bar'),
            dataActions.removeDataSuccessful('foo.bar', { persist: false })
          ]);
        })
    });
  });
});
