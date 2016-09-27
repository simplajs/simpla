import client from '../../src/utils/client';
import fetchMock from 'fetch-mock';

const URL = 'some-server';

fetchMock
  .mock(URL, 'GET', {});

describe('client', () => {
  describe('get', () => {
    it('shouldnt make a request with Content-Type set', () => {
      return client.get(URL)
        .then(() => {
          let { headers } = fetchMock.lastOptions(URL);

          expect(headers['Content-Type']).to.be.undefined;
        });
    });
  });
});
