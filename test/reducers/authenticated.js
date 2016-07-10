import { LOGIN_SUCCESSFUL, LOGOUT_SUCCESSFUL } from '../../src/constants/actionTypes';
import authenticatedReducer from '../../src/reducers/authenticated';

describe('state of authenticated', () => {
  it('should return true on LOGIN_SUCCESSFUL', () => {
    expect(authenticatedReducer(false, { type: LOGIN_SUCCESSFUL })).to.deep.equal(true);
  });

  it('should return false on LOGOUT_SUCCESSFUL', () => {
    expect(authenticatedReducer(true, { type: LOGOUT_SUCCESSFUL })).to.deep.equal(false);
  });
});
