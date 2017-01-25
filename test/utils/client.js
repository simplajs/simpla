import client from '../../src/utils/client';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const SERVER = 'some-server';
const UID = 'some.uid.to.something';
const RESPONSE = { foo: 'bar' };
const EMPTY_UID = 'some.uid.to.nowhere';
const EMPTY_RESPONSE = {
  status: 204,
  sendAsJson: false
};

describe('client', () => {
  beforeEach(() => {
    fetchMock
      .mock(`${SERVER}/${UID}`, 'GET', RESPONSE)
      .mock(`${SERVER}/${EMPTY_UID}`, 'GET', EMPTY_RESPONSE);
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('should not request w/ content-type on GETs', () => {
    client.get(`${SERVER}/${UID}`);

    let { headers, method } = fetchMock.lastOptions(`${SERVER}/${UID}`);

    expect(headers['Content-Type']).to.be.undefined;
  });

  it('should return null for 204 responses', () => {
    return client.get(`${SERVER}/${EMPTY_UID}`)
      .then(response => {
        expect(response).to.be.null;
      });
  });
});
