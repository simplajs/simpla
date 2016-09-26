import usageMonitoring from '../../src/plugins/usageMonitoring';
import fetchMock from 'fetch-mock';
import configureMockStore from '../__utils__/redux-mock-store';

const mockStore = configureMockStore();

const SERVER = 'some-server',
      PROJECT = 'some-project';

const URL = `${SERVER}/projects/${PROJECT}/sessions`;

const Simpla = {
  getState() {
    return {
      options: {
        authEndpoint: SERVER,
        project: PROJECT
      }
    };
  }
}

const BadSimpla = {
  getState() {
    return {
      options: {}
    };
  },
  observeState: sinon.stub().returns(sinon.stub())
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
    window.localStorage.removeItem('sm-session');
    sinon.stub(window, 'addEventListener');

    usageMonitoring(Simpla);

    lastOptions = fetchMock.lastOptions(URL);
  });

  afterEach(() => {
    window.addEventListener.restore();
  });

  it('should call the right endpoint', () => {
    expect(lastOptions).to.not.be.undefined;
  });

  it('should call endpoint with POST method', () => {
    expect(lastOptions.method).to.equal('POST');
  });

  it('should send element count with the body', () => {
    let body = JSON.parse(lastOptions.body);
    expect(body.elements).to.be.defined;
  });

  it('should set Content-Type to application/json', () => {
    let headers = lastOptions.headers;
    expect(headers['Content-Type']).to.equal('application/json');
  });

  it('should set a new token in localStorage', () => {
    expect(window.localStorage.getItem('sm-session')).to.be.ok;
  });

  describe('handling empty options', () => {
    beforeEach(() => {
      fetchMock.reset();
      window.localStorage.removeItem('sm-session');
      usageMonitoring(BadSimpla);
    });

    it('should not call fetch if options are undefined', () => {
      expect(fetchMock.calls().matched).to.be.empty;
      expect(fetchMock.calls().unmatched).to.be.empty;
    });

    it ('should call fetch after Simpla has been updated', () => {
      let lastCall = BadSimpla.observeState.lastCall,
          [ observing, observer ] = lastCall.args;

      expect(observing).to.equal('options');
      observer({ authEndpoint: SERVER, project: PROJECT });
      expect(fetchMock.calls().matched).to.have.lengthOf(1);
    });
  });

  it('should update the token on beforeunload', (done) => {
    let current = window.localStorage.getItem('sm-session'),
        lastCall,
        listeningTo,
        callback;

    usageMonitoring(Simpla);
    lastCall = window.addEventListener.lastCall

    expect(lastCall).to.be.ok;

    [ listeningTo, callback ] = lastCall.args;
    expect(listeningTo).to.equal('beforeunload');

    setTimeout(() => {
      callback();
      expect(window.localStorage.getItem('sm-session')).not.to.equal(current);
      done();
    }, 5);
  });
});
