import * as dataActions from '../../src/actions/data';
import * as apiActions from '../../src/actions/api';
import * as types from '../../src/constants/actionTypes';
import { INVALID_DATA } from '../../src/constants/errors';
import { DATA_PREFIX } from '../../src/constants/state';
import thunk from 'redux-thunk';
import configureMockStore from '../__utils__/redux-mock-store';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([ thunk ]);

const UID_FOR_STORED = 'foo.bar';
const STORED_AT_UID = { data: { foo: 'baz' } };
const BAD_DATA = { foo: 'bar' };
const SERVER = 'some-server';
const UID_FOR_NOT_STORED = 'some.uid.to.something';
const RESPONSE = { data: { foo: 'bar' } };

// Find Data
const FIND_CONTENT = {
  'foo': { id: 'foo', data: {} },
  'foo.bar': { id: 'foo.bar', data: {} }
};
const FIND_HIERARCHY = {
  foo: {
    bar: null
  }
};
const BLANK_QUERY = {};
const BLANK_QUERY_ITEMS = [{
  id: 'foo',
  data: {}
}, {
  id: 'foo.bar',
  data: {}
}];
const PARENT_QUERY = { parent: 'foo' };
const PARENT_QUERY_ITEMS = [{
  id: 'foo.bar',
  data: {}
}];

fetchMock
  .mock(`${SERVER}/${UID_FOR_NOT_STORED}`, 'GET', RESPONSE)
  .mock(`${SERVER}/${UID_FOR_NOT_STORED}`, 'PUT', RESPONSE)
  .mock(`${SERVER}/?parent=foo`, 'GET', { items: PARENT_QUERY_ITEMS })
  .mock(`${SERVER}/`, 'GET', { items: BLANK_QUERY_ITEMS })
  .mock(`${SERVER}/${UID_FOR_NOT_STORED}`, 'DELETE', {});

describe('data actions', () => {
  describe('find', () => {
    let initialState,
        store;

    beforeEach(() => {
      initialState = {
        config: {
          dataEndpoint: SERVER
        },
        [DATA_PREFIX]: {
          content: {},
          hierarchy: {}
        }
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
                dataActions.setData(item.uid, item),
                dataActions.setDataSuccessful(item.uid, item)
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
                dataActions.setData(item.uid, item),
                dataActions.setDataSuccessful(item.uid, item)
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
        content: {
          [ firstItem.id ]: firstItem
        },
        hierarchy: {
          [ firstItem.id ]: {}
        }
      };

      store = mockStore(initialState);

      return store.dispatch(dataActions.find(BLANK_QUERY))
        .then(() => {
          expect(store.getActions()).to.deep.equal([
            dataActions.findData(BLANK_QUERY),
            apiActions.findData(BLANK_QUERY),
            apiActions.findDataSuccessful(BLANK_QUERY, { items: BLANK_QUERY_ITEMS }),
            dataActions.setData(secondItem.uid, secondItem),
            dataActions.setDataSuccessful(secondItem.uid, secondItem),
            // NOTE: There're no reducers on the state, therefore it only returns what
            //  matches in the state at the start
            dataActions.findDataSuccessful(BLANK_QUERY, { items: [ firstItem ] })
          ]);
        });
    });
  });

  describe('get', () => {
    const data = {
      content: {
        [ UID_FOR_STORED ]: STORED_AT_UID
      }
    };

    it('should get value in the state', () => {
      let store = mockStore({ [ DATA_PREFIX ]: data });

      return store.dispatch(dataActions.get(UID_FOR_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.equal([
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
  });

  describe('set', () => {
    it('should fire off set and set successful', () => {
      let store = mockStore({});

      return store.dispatch(dataActions.set(UID_FOR_STORED, STORED_AT_UID))
        .then(() => {
          expect(store.getActions()).to.deep.equal([
            dataActions.setData(UID_FOR_STORED, STORED_AT_UID),
            dataActions.setDataSuccessful(UID_FOR_STORED, STORED_AT_UID)
          ]);
        });
    });

    it('should fail if data doesnt match correct structure', () => {
      let store = mockStore({});

      return store.dispatch(dataActions.set(UID_FOR_STORED, BAD_DATA))
        .then(() => {
          throw Error('Set should have errored');
        })
        .catch((err) => {
          expect(store.getActions()).to.deep.equal([
            dataActions.setData(UID_FOR_STORED, BAD_DATA),
            dataActions.setDataFailed(UID_FOR_STORED, new Error(INVALID_DATA))
          ])
        });
    });

    it('should accept any data if validate is set to false', () => {
      let store = mockStore({});

      return store.dispatch(dataActions.set(UID_FOR_STORED, BAD_DATA, false))
        .then(() => {
          expect(store.getActions()).to.deep.equal([
            dataActions.setData(UID_FOR_STORED, BAD_DATA),
            dataActions.setDataSuccessful(UID_FOR_STORED, BAD_DATA)
          ]);
        });
    });
  });

  describe('remove', () => {
    it('should fire off remove and remove successful', () => {
      let store = mockStore({});

      return store.dispatch(dataActions.remove(UID_FOR_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.equal([
            dataActions.removeData(UID_FOR_STORED),
            dataActions.removeDataSuccessful(UID_FOR_STORED)
          ]);
        });
    });
  });
});
