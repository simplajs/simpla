let HASH_EDIT = '#edit';

export default function hashTracking(Simpla) {
  let observer = { unobserve: () => {} };

  // Part one, bind from hash to Simpla
  function hashObserver({ target }) {
    if (target.location.hash === HASH_EDIT) {
      Simpla.editable(true);
    } else {
      Simpla.editable(false);
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
    observer = Simpla.observeState('editable', updateHash);
  }

  function stopTracking() {
    window.removeEventListener('hashchange', hashObserver);
    observer.unobserve();
  }

  Simpla.observeState('config.hashTracking', (shouldTrack) => {
    if (shouldTrack) {
      startTracking();
    } else {
      stopTracking();
    }
  });

  if (Simpla.getState().config.hashTracking) {
    startTracking();
  }
}
