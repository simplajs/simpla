const SESSION_KEY = 'sm-session',
      SECOND = 1000,
      INTERVAL = 10 * SECOND;

export default function(Simpla) {
  /**
   * Ping the server at the usage endpoint
   * @return {undefined}
   */
  function ping() {
    let elements = document.querySelectorAll('simpla-text, simpla-img').length,
        { authEndpoint, project } = Simpla.getState().options,
        endpoint = `${authEndpoint}/projects/${project}/sessions`;

    console.log(Simpla.getState(), endpoint);
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

    return expiry && parseInt(expiry) > now;
  }

  /**
   * Update the session to now + interval time
   * @return {undefined}
   */
  function resetSession() {
    window.localStorage.setItem(SESSION_KEY, Date.now() + INTERVAL);
  }

  // If they're not in the session, send a ping to the server
  if (!stillInSession()) {
    ping();
  }

  // Reset the session token
  resetSession();

  // When they leave the site, reset the session token
  window.addEventListener('beforeunload', function() {
    resetSession();
  });
}
