import { LOGIN_SUCCESSFUL, LOGOUT_SUCCESSFUL } from '../../src/constants/actionTypes';
import tokenReducer from '../../src/reducers/token';

describe('state of token', () => {
  it('should set token on LOGIN_SUCCESSFUL', () => {
    let token = 'foo';

    expect(tokenReducer(undefined, {
      type: LOGIN_SUCCESSFUL,
      token
    })).to.deep.equal(token);
  });

  it('should remove token on LOGOUT_SUCCESSFUL', () => {
    expect(tokenReducer(undefined, {
      type: LOGOUT_SUCCESSFUL
    })).to.deep.equal(null);
  });
});
