const SESSION_KEY = 'sm-session',
      SECOND = 1000,
      INTERVAL = 10 * SECOND;

export default function(Simpla) {

  /**
   * Ping the server at the usage endpoint
   * @return {undefined}
   */
  function ping(endpoint) {
    let elements = document.querySelectorAll('simpla-text, simpla-img').length;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ elements })
    });
  }

  /**
   * Check if user is still within the session time period
   * @return {Boolean} true if still in session, false otherwise
   */
  function stillInSession() {
    let expiry,
        now;

    try {
      expiry = window.localStorage.getItem(SESSION_KEY);
    } catch (e) {
      expiry = null;
    }

    now = Date.now();

    return expiry && parseInt(expiry) > now;
  }

  /**
   * Update the session to now + interval time
   * @return {undefined}
   */
  function resetSession() {
    try {
      window.localStorage.setItem(SESSION_KEY, Date.now() + INTERVAL);
    } catch(e) {
      // Fail silently, thisis low priority work and doesn't matter greatly if
      //  we cant set
    }
  }

  function checkAndPing({ authEndpoint, project }) {
    let endpoint = `${authEndpoint}/projects/${project}/sessions`;

    if (authEndpoint && project) {
      ping(endpoint);
      return true;
    }

    return false;
  }

  function run() {
    // If they're not in the session, send a ping to the server
    if (!stillInSession()) {
      if (!checkAndPing(Simpla.getState().options)) {
        let unobserve = Simpla.observeState('options', (options) => {
          if (checkAndPing(options)) {
            unobserve();
          }
        });
      }
    }

    // Reset the session token
    resetSession();
  }

  let documentIsReady = () => document.readyState === 'interactive' || document.readyState === 'complete';
  if (documentIsReady()) {
    run();
  } else {
    let listener = () => {
      if (documentIsReady()) {
        run();
        document.removeEventListener('readystatechange', listener);
      }
    };
    document.addEventListener('readystatechange', listener)
  }

  // When they leave the site, reset the session token
  window.addEventListener('beforeunload', resetSession);
}
