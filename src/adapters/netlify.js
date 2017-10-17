const NETLIFY_API = 'https://api.netlify.com';
const PROVIDER = 'github';
const AUTHORIZING = `authorizing:${PROVIDER}`;
const AUTHORIZED = `authorization:${PROVIDER}`;
const SUCCESS = 'success';
const FAIL = 'fail';
const SITE_NAME_SUFFIX = `.netlify.com`;

function once(callback) {
  let wrapped = (...args) => {
    if (callback(...args)) {
      window.removeEventListener('message', wrapped, false);
    }
  };

  window.addEventListener('message', wrapped, false);
}

function getWindowConfig() {
  const WIDTH = 960;
  const HEIGHT = 600;
  return [
    'toolbar=no',
    'location=no',
    'directories=no',
    'status=no',
    'menubar=no',
    'scrollbars=no',
    'resizable=no',
    'copyhistory=no',
    `width=${WIDTH}`, 
    `height=${HEIGHT}`, 
    `top=${screen.height / 2 - HEIGHT / 2}`, 
    `left=${screen.width / 2 - WIDTH / 2}`
  ].join(',');
}

function authorize() {
  return new Promise((resolve, reject) => {
    once(event => {
      let response, status;

      if (event.origin !== NETLIFY_API) {
        return false;
      }

      [, status, response] = event.data.match(
        new RegExp(`^${AUTHORIZED}:(${SUCCESS}|${FAIL}):(.+)$`)
      );

      response = JSON.parse(response);

      if (status === FAIL) {
        reject(new Error(response));
      } else {
        resolve(response);
      }

      return true;
    });
  });
}

function shakeHandsWith(win) {
  return new Promise(resolve => {
    once(event => {
      if (event.data === AUTHORIZING && event.origin === NETLIFY_API) {
        win.postMessage(event.data, event.origin);
        resolve();
        return true;
      }
    });
  });
}

export default class NetlifyAuthentication {
  constructor({ site }) {
    this._authUrl = `${NETLIFY_API}/auth?scope=repo&provider=${PROVIDER}&site_id=${site + SITE_NAME_SUFFIX}`;
  }

  authenticate() {
    let opened = window.open(this._authUrl, '_blank', getWindowConfig()),
      authFlow = shakeHandsWith(opened).then(authorize);

    opened.focus();
    authFlow.then(() => opened.close());

    return authFlow;
  }
}