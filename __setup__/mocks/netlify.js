jest.mock('../../src/adapters/netlify.js', () => {
  const Netlify = jest.fn(function() {
    Object.assign(this, {
      authenticate: jest.fn(() => Promise.resolve(Netlify._mockData))
    });

    return this;
  });

  Netlify._mockData = {
    token: 'some-token'
  };

  return Netlify;
});