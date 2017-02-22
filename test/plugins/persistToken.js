import { loginSuccessful } from '../../src/actions/authentication';
import { tokenIsValid, setTokenToStorage, readTokenFromStorage } from '../../src/plugins/persistToken';

const VALID_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3NpbXBsYS5hdXRoMC5jb20vIiwiZXhwIjoyNTM0MDIyNjEyMDB9.vqrpFIwCJ_m_GYtEMnfVBdHvd24BD9OFkuMJJRwnRaE',
      EXPIRED_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3NpbXBsYS5hdXRoMC5jb20vIiwiZXhwIjoxNDg3NzIzOTU5fQ.jwBkPMVVbtm6TyB-wTPyVI9ZEi0BoacXmutfwgYw9m0',
      WRONG_ISSUER_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3NvbWVjb21wYW55LmF1dGgwLmNvbS8iLCJleHAiOjI1MzQwMjI2MTIwMH0.lhflibqLa1yK48F5GlFwP20RKTI82nBAoMK9lECpn2M';

describe('persisting tokens', () => {
  const unobserve = sinon.stub();

  const Simpla = {
    observeState: sinon.stub().returns(unobserve),
    _store: {
      dispatch: sinon.stub()
    }
  }

  beforeEach(() => {
    sinon.stub(window.localStorage, 'setItem');
    sinon.stub(window.localStorage, 'getItem');
    sinon.stub(window.localStorage, 'removeItem');
  });

  afterEach(() => {
    window.localStorage.setItem.restore();
    window.localStorage.getItem.restore();
    window.localStorage.removeItem.restore();

    Simpla.observeState.reset();
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
      let setToken;

      setTokenToStorage(VALID_JWT);

      setToken = window.localStorage.setItem.lastCall.args[1];

      expect(setToken).to.equal(VALID_JWT);
    });

    it('should remove token if token is null', () => {
      setTokenToStorage(null);

      expect(window.localStorage.removeItem.called).to.be.true;
    });

    it('should squash localStorage errors', () => {
      let testFn = () => setTokenToStorage(VALID_JWT);

      window.localStorage.setItem.throws();

      expect(testFn).to.not.throw(Error);
    });
  });

  describe('reading token from storage', () => {
    it('should read the token from localStorage', () => {
      window.localStorage.getItem.returns(VALID_JWT);

      readTokenFromStorage(Simpla);

      expect(Simpla._store.dispatch.calledWith(loginSuccessful(VALID_JWT))).to.be.true;
    });

    it('should squash localStorage errors', () => {
      let testFn = () => readTokenFromStorage(Simpla);

      window.localStorage.getItem.throws();

      expect(testFn).to.not.throw(Error);
    });
  });

  describe('reading invalid token from storage', () => {
    it('should remove the token if invalid in storage', () => {
      window.localStorage.getItem.returns(EXPIRED_JWT);

      readTokenFromStorage(Simpla);

      expect(window.localStorage.removeItem.called).to.be.true;
    });

    it('should squash localStorage errors', () => {
      let testFn = () => readTokenFromStorage(Simpla);

      window.localStorage.getItem.returns(EXPIRED_JWT);
      window.localStorage.removeItem.throws();

      expect(testFn).to.not.throw(Error);
    });
  });
});
