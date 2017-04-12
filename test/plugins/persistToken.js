import { loginSuccessful } from '../../src/actions/authentication';
import { tokenIsValid, setTokenToStorage, readTokenFromStorage, TOKEN_KEY } from '../../src/plugins/persistToken';

const VALID_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3NpbXBsYS5hdXRoMC5jb20vIiwiZXhwIjoyNTM0MDIyNjEyMDB9.vqrpFIwCJ_m_GYtEMnfVBdHvd24BD9OFkuMJJRwnRaE',
      EXPIRED_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3NpbXBsYS5hdXRoMC5jb20vIiwiZXhwIjoxNDg3NzIzOTU5fQ.jwBkPMVVbtm6TyB-wTPyVI9ZEi0BoacXmutfwgYw9m0',
      WRONG_ISSUER_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3NvbWVjb21wYW55LmF1dGgwLmNvbS8iLCJleHAiOjI1MzQwMjI2MTIwMH0.lhflibqLa1yK48F5GlFwP20RKTI82nBAoMK9lECpn2M';

describe('persisting tokens', () => {
  const Simpla = {
    _store: {
      dispatch: sinon.stub()
    }
  }

  afterEach(() => {
    Simpla._store.dispatch.reset();
  });

  describe('validating token', () => {
    it('should reject expired tokens', () => {
      expect(tokenIsValid(EXPIRED_JWT)).to.be.false;
    });

    it('should reject tokens with wrong issuer', () => {
      expect(tokenIsValid(WRONG_ISSUER_JWT)).to.be.false;
    });

    it('should accept valid tokens', () => {
      expect(tokenIsValid(VALID_JWT)).to.be.true;
    });
  });

  describe('setting token to storage', () => {
    it('should set the token to localStorage', () => {
      setTokenToStorage(VALID_JWT);

      expect(window.localStorage.getItem(TOKEN_KEY)).to.equal(VALID_JWT);
    });

    it('should remove token if token is null', () => {
      setTokenToStorage(null);

      expect(window.localStorage.getItem(TOKEN_KEY)).to.be.null;
    });
  });

  describe('reading token from storage', () => {
    it('should read the token from localStorage', () => {
      window.localStorage.setItem(TOKEN_KEY, VALID_JWT);

      readTokenFromStorage(Simpla);

      expect(Simpla._store.dispatch.calledWith(loginSuccessful(VALID_JWT))).to.be.true;
    });
  });

  describe('reading invalid token from storage', () => {
    it('should remove the token if invalid in storage', () => {
      window.localStorage.setItem(TOKEN_KEY, EXPIRED_JWT);

      readTokenFromStorage(Simpla);

      expect(window.localStorage.getItem(TOKEN_KEY)).to.be.null;
    });
  });

  // This cannot be currently tested as localStorage is protected in some browsers
  //  https://github.com/sinonjs/sinon/issues/662
  xdescribe('handling locked localStorage', () => {
    it('should errors while setting', () => {
      let testFn = () => setTokenToStorage(VALID_JWT);

      sinon.stub(window.localStorage, 'setItem').throws();

      expect(testFn).to.not.throw(Error);
    });

    it('squash errors while reading', () => {
      let testFn = () => readTokenFromStorage(Simpla);

      sinon.stub(window.localStorage, 'getItem').throws();

      expect(testFn).to.not.throw(Error);
    });

    it('squash errors while removing', () => {
      let testFn = () => readTokenFromStorage(Simpla);

      sinon.stub(window.localStorage, 'getItem').returns(EXPIRED_JWT);
      sinon.stub(window.localStorage, 'removeItem').throws();

      expect(testFn).to.not.throw(Error);
    });
  });
});
