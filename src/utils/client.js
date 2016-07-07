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
    Accept: 'application/json'
  }, fetchOptions.headers);

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  return fetch(options.url, fetchOptions)
      .then(checkStatus)
      .then(response => response.json());
};

export default {
  get(url) {
    return request({ url, method: 'GET' });
  },

  post(url, body, token) {
    return request({
      url,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  delete(url, token) {
    return request({
      url,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
