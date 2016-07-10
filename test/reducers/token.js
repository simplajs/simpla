import { LOGIN_SUCCESSFUL, LOGOUT } from '../../src/constants/actionTypes';
import tokenReducer from '../../src/reducers/token';

describe('state of token', () => {
  it('should set token on LOGIN_SUCCESSFUL', () => {
    let token = 'foo';

    expect(tokenReducer(undefined, {
      type: LOGIN_SUCCESSFUL,
      token
    })).to.deep.equal(token);
  });

  it('should remove token on LOGOUT', () => {
    expect(tokenReducer(undefined, {
      type: LOGOUT
    })).to.deep.equal(null);
  });
});
