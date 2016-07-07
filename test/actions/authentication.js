import { login, logout } from '../../src/actions/authentication';
import { AUTH_SERVER } from '../../src/constants/options';
import thunk from 'redux-thunk';
import * as types from '../../src/constants/actionTypes';
import fetchMock from 'fetch-mock';
import configureMockStore from '../__utils__/redux-mock-store';

const mockStore = configureMockStore([ thunk ]);
const TOKEN = 'some-token';

fetchMock
  .mock(`${AUTH_SERVER}/login`, 'POST', {
    token: TOKEN
  });

describe('authentication actions', () => {
  describe('login', () => {
    it('should request login endpoint and fire action with response token', () => {
      let store = mockStore({
            options: {
              authEndpoint: AUTH_SERVER
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
            token: TOKEN
          }];

      return store.dispatch(login({ email, password }))
        .then(() => {
          console.log(store.getActions());
          expect(store.getActions()).to.deep.equal(expectedActions);
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
