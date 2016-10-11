import * as dataActions from '../../src/actions/data';
import * as apiActions from '../../src/actions/api';
import * as types from '../../src/constants/actionTypes';
import { INVALID_DATA } from '../../src/constants/errors';
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

fetchMock
  .mock(`${SERVER}/${UID_FOR_NOT_STORED}`, 'GET', RESPONSE)
  .mock(`${SERVER}/${UID_FOR_NOT_STORED}`, 'PUT', RESPONSE)
  .mock(`${SERVER}/${UID_FOR_NOT_STORED}`, 'DELETE', {});

describe('data actions', () => {
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
