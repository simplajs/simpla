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
    let expiry = window.localStorage.getItem(SESSION_KEY),
        now = Date.now();

    return false; //expiry && parseInt(expiry) > now;
  }

  /**
   * Update the session to now + interval time
   * @return {undefined}
   */
  function resetSession() {
    window.localStorage.setItem(SESSION_KEY, Date.now() + INTERVAL);
  }

  function checkAndPing({ authEndpoint, project }) {
    let endpoint = `${authEndpoint}/projects/${project}/sessions`;

    if (authEndpoint && project) {
      ping(endpoint);
      return true;
    }

    return false;
  }

  // If they're not in the session, send a ping to the server
  if (!stillInSession()) {
    if (!checkAndPing(Simpla.getState().options)) {
      let unobserve = Simpla.observe('options', (options) => {
        if (checkAndPing(options)) {
          unobserve();
        }
      });
    }
  }

  // Reset the session token
  resetSession();

  // When they leave the site, reset the session token
  window.addEventListener('beforeunload', resetSession);
}
