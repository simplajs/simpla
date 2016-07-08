import 'isomorphic-fetch';

/**
 * Check Status and request courtesy of feathers-rest
 * See https://github.com/feathersjs/feathers-rest/blob/master/src/client/fetch.js
 */
function checkStatus(response) {
  if (response.ok) {
    return response;
  }

  return new Promise((resolve, reject) => {
    let body = response.body,
        buffer = '';

    body.on('data', data => buffer += data.toString());
    body.on('error', reject);
    body.on('end', () => {
      let error = new Error(buffer);

      try {
        error = JSON.parse(buffer);
      } catch (e) {
        error.code = response.status;
      }

      error.response = response;

      reject(error);
    });
  });
}

function request(options) {
  let fetchOptions = Object.assign({}, options);

  fetchOptions.headers = Object.assign({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }, fetchOptions.headers);

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  return fetch(options.url, fetchOptions)
      .then(checkStatus)
      .then(response => response.json());
};

function requestWithToken(options) {
  let token = options.token;

  if (token) {
    options.headers = Object.assign({
      'Authorization': `Bearer ${token}`
    }, options.headers);
  }

  return request(options);
}

export default {
  get(url, options) {
    return request(Object.assign({ method: 'GET' }, options, { url }));
  },

  post(url, options) {
    return requestWithToken(Object.assign({ method: 'POST' }, options, { url }));
  },

  put(url, options) {
    return requestWithToken(Object.assign({ method: 'PUT' }, options, { url }));
  },

  delete(url, options) {
    return requestWithToken(Object.assign({ method: 'DELETE' }, options, { url }));
  }
}
