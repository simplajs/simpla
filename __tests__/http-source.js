import HttpSource from '../src/http-source.js';

jest.unmock('../src/http-source.js');

describe('http-source', () => {
  let http;

  beforeAll(() => {
    http = new HttpSource({ data: '/content', uploads: '/uploads' });
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  test('getting and transforming data', () => {
    fetch.mockResponseOnce(JSON.stringify({ text: 'Hello world [upload picture.png]' }));
    return http.get('/foo').then(response => {
      expect(fetch).toHaveBeenCalledWith('/content/foo.json');
      expect(response).toMatchSnapshot();
    });
  });

  test('dealing with a 404', () => {
    fetch.mockResponseOnce('', { status: 404 });
    return http.get('/foo').then(result => {
      expect(result).toBeNull();
    });
  });
});
