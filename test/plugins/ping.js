import ping from '../../src/plugins/ping';
import fetchMock from 'fetch-mock';

const SERVER = 'some-server',
      PROJECT = 'some-project';

const URL = `${SERVER}/projects/${PROJECT}/sessions`;

const Simpla = {
  getState(path) {
    if (path === 'config') {
      return {
        authEndpoint: SERVER,
        project: PROJECT
      }
    }
  }
}

const BadSimpla = {
  getState() {
    return {
      config: {}
    };
  },
  observeState: sinon.stub().returns({ unobserve: sinon.stub() })
}

describe('usage monitoring', () => {
  let lastOptions;

  before(() => {
    fetchMock
      .mock(URL, 'POST');
  });

  after(() => {
    fetchMock.restore();
  });

  beforeEach(() => {
    ping(Simpla);

    lastOptions = fetchMock.lastOptions(URL);
  });

  it('should call the right endpoint', () => {
    expect(lastOptions).to.not.be.undefined;
  });

  it('should call endpoint with POST method', () => {
    expect(lastOptions.method).to.equal('POST');
  });

  describe('handling empty config', () => {
    beforeEach(() => {
      fetchMock.reset();
      window.localStorage.removeItem('sm-session');
      ping(BadSimpla);
    });

    it('should not call fetch if config are undefined', () => {
      expect(fetchMock.calls().matched).to.be.empty;
      expect(fetchMock.calls().unmatched).to.be.empty;
    });

    it ('should call fetch after Simpla has been updated', () => {
      let lastCall = BadSimpla.observeState.lastCall,
          [ observing, observer ] = lastCall.args;

      expect(observing).to.equal('config');
      observer({ authEndpoint: SERVER, project: PROJECT });
      expect(fetchMock.calls().matched).to.have.lengthOf(1);
    });
  });
});
