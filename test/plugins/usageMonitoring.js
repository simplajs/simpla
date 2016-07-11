import usageMonitoring from '../../src/plugins/usageMonitoring';
import fetchMock from 'fetch-mock';
import configureMockStore from '../__utils__/redux-mock-store';

const mockStore = configureMockStore();

const SERVER = 'some-server',
      PROJECT = 'some-project';

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

fetchMock
  .mock(`${SERVER}/projects/${PROJECT}/sessions`, 'POST');

describe('usage monitoring', () => {
  let lastOptions;

  beforeEach(() => {
    window.localStorage.removeItem('sm-session');

    usageMonitoring(Simpla);

    lastOptions = fetchMock.lastOptions(`${SERVER}/projects/${PROJECT}/sessions`);
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

  it('should set a new token in localStorage', function() {
    expect(window.localStorage.getItem('sm-session')).to.be.ok;
  });

  it('should update the token on beforeunload', function() {
    let current = window.localStorage.getItem('sm-session');

    window.dispatchEvent(new Event('beforeunload'));
    expect(window.localStorage.getItem('sm-session')).not.to.equal(current);
  });
});
