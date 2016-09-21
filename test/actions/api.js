import { get, set, remove } from '../../src/actions/api';
import thunk from 'redux-thunk';
import * as types from '../../src/constants/actionTypes';
import fetchMock from 'fetch-mock';
import configureMockStore from '../__utils__/redux-mock-store';

const mockStore = configureMockStore([ thunk ]);
const TOKEN = 'some-token';
const SERVER = 'some-server';
const UID = 'some.uid.to.something';
const RESPONSE = { foo: 'bar' };

describe('data crud', () => {
  beforeEach(() => {
    fetchMock
      .mock(`${SERVER}/${UID}`, 'GET', RESPONSE)
      .mock(`${SERVER}/${UID}`, 'PUT', RESPONSE)
      .mock(`${SERVER}/${UID}`, 'DELETE', {});
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('get', () => {
    it('should GET the correct endpoint and dispatch get action', () => {
      let store = mockStore({
            options: {
              dataEndpoint: SERVER
            }
          }),
          expectedActions = [{
            type: types.GET_DATA_FROM_API,
            uid: UID,
            data: undefined
          }, {
            type: types.GET_DATA_FROM_API_SUCCESSFUL,
            uid: UID,
            response: RESPONSE
          }];

      return store.dispatch(get(UID))
        .then(() => {
          expect(store.getActions()).to.deep.include.members(expectedActions)
        });
    });
  });

  describe('set', () => {
    const DATA = { bar: 'baz' };

    it('should PUT to the correct endpoint and dispatch set actions', () => {
      let store = mockStore({
            options: {
              dataEndpoint: SERVER
            },
            token: TOKEN
          }),
          expectedActions = [{
            type: types.SET_DATA_TO_API,
            uid: UID,
            data: DATA
          }, {
            type: types.SET_DATA_TO_API_SUCCESSFUL,
            uid: UID,
            response: RESPONSE
          }];

      return store.dispatch(set(UID, DATA))
        .then(() => {
          console.log(fetchMock.calls());
          let lastOptions = fetchMock.lastOptions(`${SERVER}/${UID}`),
              body = JSON.parse(lastOptions.body),
              { headers, method } = lastOptions;
          expect(store.getActions()).to.deep.include.members(expectedActions)
          expect(body).to.deep.equal(DATA);
          expect(method).to.equal('PUT');
          expect(headers['Authorization'].split(' ')[1]).to.equal(TOKEN);
        });
    });
  });

  describe('remove', () => {
    it('should DELETE the right endpoint', () => {
      let store = mockStore({
            options: {
              dataEndpoint: SERVER
            },
            token: TOKEN
          }),
          expectedActions = [{
            type: types.REMOVE_DATA_FROM_API,
            uid: UID,
            data: undefined
          }, {
            type: types.REMOVE_DATA_FROM_API_SUCCESSFUL,
            uid: UID,
            response: {}
          }];

      return store.dispatch(remove(UID))
        .then(() => {
          let { method, headers } = fetchMock.lastOptions(`${SERVER}/${UID}`);

          expect(store.getActions()).to.deep.include.members(expectedActions)
          expect(method).to.equal('DELETE');
          expect(headers['Authorization'].split(' ')[1]).to.equal(TOKEN);
        });
    });
  });
});
