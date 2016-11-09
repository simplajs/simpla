import client from '../../src/utils/client';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const SERVER = 'some-server';
const UID = 'some.uid.to.something';
const RESPONSE = { foo: 'bar' };

describe('client', () => {
  beforeEach(() => {
    fetchMock
      .mock(`${SERVER}/${UID}`, 'GET', RESPONSE)
  });

  it('should not request w/ content-type on GETs', () => {
    client.get(`${SERVER}/${UID}`);

    let { headers, method } = fetchMock.lastOptions(`${SERVER}/${UID}`);

    expect(headers['Content-Type']).to.be.undefined;
  });
});
