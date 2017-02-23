import tokenReducer from '../../src/reducers/token';
import { loginSuccessful, logoutSuccessful } from '../../src/actions/authentication';

describe('state of token', () => {
  it('should set token on LOGIN_SUCCESSFUL', () => {
    let token = 'foo';

    expect(tokenReducer(undefined, loginSuccessful(token))).to.deep.equal(token);
  });

  it('should remove token on LOGOUT_SUCCESSFUL', () => {
    expect(tokenReducer(undefined, logoutSuccessful())).to.deep.equal(null);
  });
});
