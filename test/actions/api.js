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
} from '../../src/actions/api';
import { pathToUid } from '../../src/utils/helpers';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from '../__utils__/redux-mock-store';

const mockStore = configureMockStore([ thunk ]);
const TOKEN = 'some-token';
const SERVER = 'some-server';
const PATH = '/some/uid/to/something';
const UID = pathToUid(PATH);
const RAW_RESPONSE = { id: UID, foo: 'bar' };
const RESPONSE = { path: PATH, foo: 'bar' };
const HASH_PATH = '/some#place/something';
const URI_SAFE_HASH_UID = pathToUid(HASH_PATH).replace('#', '%23');

describe('data crud', () => {
  beforeEach(() => {
    fetchMock
      .mock(`${SERVER}/${UID}`, 'GET', RAW_RESPONSE)
      .mock(`${SERVER}/${URI_SAFE_HASH_UID}`, 'GET', RAW_RESPONSE)
      .mock(`${SERVER}/${UID}`, 'PUT', RAW_RESPONSE)
      .mock(`${SERVER}/${UID}`, 'DELETE', {});
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('get', () => {
    it('should GET the correct endpoint and dispatch get action', () => {
      let store = mockStore({
            config: {
              dataEndpoint: SERVER
            }
          }),
          expectedActions = [
            getData(PATH),
            getDataSuccessful(PATH, RESPONSE)
          ];

      return store.dispatch(get(PATH))
        .then(() => {
          expect(store.getActions()).to.deep.include.members(expectedActions)
        });
    });

    it('should encode uri components in url', () => {
      let store = mockStore({
        config: {
          dataEndpoint: SERVER
        }
      });

      return store.dispatch(get(HASH_PATH))
        .then(() => {
          expect(store.getActions()).to.deep.include(getDataSuccessful(HASH_PATH, RESPONSE));
        });
    });
  });

  describe('set', () => {
    const DATA = { bar: 'baz' };

    it('should PUT to the correct endpoint and dispatch set actions', () => {
      let store = mockStore({
            config: {
              dataEndpoint: SERVER
            },
            token: TOKEN
          }),
          expectedActions = [
            setData(PATH, DATA),
            setDataSuccessful(PATH, DATA, RESPONSE)
          ];

      return store.dispatch(set(PATH, DATA))
        .then(() => {
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
            config: {
              dataEndpoint: SERVER
            },
            token: TOKEN
          }),
          expectedActions = [
            removeData(PATH),
            removeDataSuccessful(PATH, {})
          ];

      return store.dispatch(remove(PATH))
        .then(() => {
          let { method, headers } = fetchMock.lastOptions(`${SERVER}/${UID}`);

          expect(store.getActions()).to.deep.include.members(expectedActions)
          expect(method).to.equal('DELETE');
          expect(headers['Authorization'].split(' ')[1]).to.equal(TOKEN);
        });
    });
  });
});
