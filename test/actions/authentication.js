import { login, logout } from '../../src/actions/authentication';
import thunk from 'redux-thunk';
import * as types from '../../src/constants/actionTypes';
import fetchMock from 'fetch-mock';
import configureMockStore from '../__utils__/redux-mock-store';

const mockStore = configureMockStore([ thunk ]);
const TOKEN = 'some-token';
const SERVER = 'some-server';

fetchMock
  .mock(`${SERVER}/login`, 'POST', {
    token: TOKEN
  });

describe('authentication actions', () => {
  describe('login', () => {
    it('should request login endpoint and fire action with response token', () => {
      let store = mockStore({
            options: {
              authEndpoint: SERVER
            }
          }),
          email = 'foo@bar.com',
          password = 'foobar',
          expectedActions = [{
            type: types.LOGIN,
            email,
            password
          }, {
            type: types.LOGIN_SUCCESSFUL,
            response: TOKEN
          }];

      return store.dispatch(login({ email, password }))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          expect(JSON.parse(fetchMock.lastOptions(`${SERVER}/login`).body)).to.deep.equal({ email, password });
        });
    });
  });

  describe('logout', () => {
    it('should just fire a logout', () => {
      let store = mockStore({});

      return store.dispatch(logout())
        .then(() => {
          expect(store.getActions()).to.deep.equal([{
            type: types.LOGOUT
          }]);
        });
    });
  });
});
