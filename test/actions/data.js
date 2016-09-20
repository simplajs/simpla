import {
  get,
  getData,
  getDataSuccessful,
  set,
  setData,
  setDataSuccessful,
  remove,
  removeData,
  removeDataSuccessful
} from '../../src/actions/data';
import * as types from '../../src/constants/actionTypes';
import thunk from 'redux-thunk';
import configureMockStore from '../__utils__/redux-mock-store';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([ thunk ]);

const UID_FOR_STORED = 'foo.bar';
const STORED_AT_UID = 'baz';

const SERVER = 'some-server';
const UID_FOR_NOT_STORED = 'some.uid.to.something';
const RESPONSE = { foo: 'bar' };

fetchMock
  .mock(`${SERVER}/${UID_FOR_NOT_STORED}`, 'GET', RESPONSE)
  .mock(`${SERVER}/${UID_FOR_NOT_STORED}`, 'PUT', RESPONSE)
  .mock(`${SERVER}/${UID_FOR_NOT_STORED}`, 'DELETE', {});

describe('data actions', () => {
  describe('get', () => {
    const data = { foo: { bar: STORED_AT_UID } };

    it('should get value in the state', () => {
      let store = mockStore({ data });

      return store.dispatch(get(UID_FOR_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.equal([
            getData(UID_FOR_STORED),
            getDataSuccessful(UID_FOR_STORED, STORED_AT_UID)
          ]);
        });
    });

    it('should get values from API if no value is in state', () => {
      let store = mockStore({
        options: {
          dataEndpoint: SERVER
        },
        data
      });

      return store.dispatch(get(UID_FOR_NOT_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.include.members([
            getData(UID_FOR_NOT_STORED),
            {
              type: types.GET_DATA_FROM_API,
              uid: UID_FOR_NOT_STORED,
              data: undefined
            }, {
              type: types.GET_DATA_FROM_API_SUCCESSFUL,
              uid: UID_FOR_NOT_STORED,
              response: RESPONSE
            },
            setData(UID_FOR_NOT_STORED, RESPONSE),
            setDataSuccessful(UID_FOR_NOT_STORED, RESPONSE),
            {
              type: types.GET_DATA_SUCCESSFUL,
              uid: UID_FOR_NOT_STORED,
              response: RESPONSE
            }
          ]);
        });
    });
  });

  describe('set', () => {
    it('should fire off set and set successful', () => {
      let store = mockStore({});

      return store.dispatch(set(UID_FOR_STORED, STORED_AT_UID))
        .then(() => {
          expect(store.getActions()).to.deep.equal([
            setData(UID_FOR_STORED, STORED_AT_UID),
            setDataSuccessful(UID_FOR_STORED, STORED_AT_UID)
          ]);
        });
    });
  });

  describe('remove', () => {
    it('should fire off remove and remove successful', () => {
      let store = mockStore({});

      return store.dispatch(remove(UID_FOR_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.equal([
            removeData(UID_FOR_STORED),
            removeDataSuccessful(UID_FOR_STORED)
          ]);
        });
    });
  });
});
