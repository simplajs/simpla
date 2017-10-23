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
    return http.get('/foo').then(({ text }) => {
      expect(fetch).toHaveBeenCalledWith('/content/foo.json');
      expect(text).toEqual('Hello world /uploads/picture.png');
    });
  });

  test('transforming more than one picture', () => {
    fetch.mockResponseOnce(JSON.stringify({ text: 'One: [upload one.png], two: [upload two.png]' }));
    return http.get('/foo').then(({ text }) => {
      expect(text).toEqual('One: /uploads/one.png, two: /uploads/two.png');
    });
  });

  test('dealing with a 404', () => {
    fetch.mockResponseOnce('', { status: 404 });
    return http.get('/foo').then(result => {
      expect(result).toBeNull();
    });
  });
});
