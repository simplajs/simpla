let HASH_EDIT = '#edit';

export default function hashTracking(Simpla) {
  let unobserve = () => {};

  // Part one, bind from hash to Simpla
  function hashObserver({ target }) {
    if (target.location.hash === HASH_EDIT) {
      Simpla.toggleEditable(true);
    } else {
      Simpla.toggleEditable(false);
    }
  }

  function updateHash(editable) {
    if (editable) {
      window.location.hash = HASH_EDIT;
    } else {
      window.location.hash = '';
    }
  }

  function startTracking() {
    window.addEventListener('hashchange', hashObserver);

    // Kickstart it
    hashObserver({ target: window });

    // Part two, bind from Simpla to hash
    unobserve = Simpla.observeState('editable', updateHash);
  }

  function stopTracking() {
    window.removeEventListener('hashchange', hashObserver);
    unobserve();
  }

  Simpla.observeState('config._useHashTracking', (shouldTrack) => {
    if (shouldTrack) {
      startTracking();
    } else {
      stopTracking();
    }
  });

  if (Simpla.getState().config._useHashTracking) {
    startTracking();
  }
}
