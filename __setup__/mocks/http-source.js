jest.mock('../../src/http-source', () => {
  const Source = jest.fn(function() {
    Object.assign(this, {
      get: jest.fn(path => {
        return Promise.resolve(Source._mockData[path] || null);
      })
    });

    return this;
  });

  Source._mockData = {
    '/heading': {
      path: '/heading',
      type: 'Text',
      data: {
        text: 'Hello World'
      },
      createdAt: '2017-08-08T00:00:00.000Z',
      updatedAt: '2017-08-08T00:00:00.000Z'
    },
    '/sub-heading': {
      path: '/sub-heading',
      type: 'Text',
      data: {
        text: 'It\'s a great day!'
      },
      createdAt: '2017-08-08T00:00:00.000Z',
      updatedAt: '2017-08-08T00:00:00.000Z'
    }
  };

  return Source;
});