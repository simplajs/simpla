let HASH_EDIT = '#edit';

export default function hashTracking(Simpla) {
  let unobserve = () => {};

  // Part one, bind from hash to Simpla
  function hashObserver({ target }) {
    if (target.location.hash === HASH_EDIT) {
      Simpla.toggleEditing(true);
    } else {
      Simpla.toggleEditing(false);
    }
  }

  function updateHash(editing) {
    if (editing) {
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
    unobserve = Simpla.observeState('editing', updateHash);
  }

  function stopTracking() {
    window.removeEventListener('hashchange', hashObserver);
    unobserve();
  }

  Simpla.observeState('options._useHashTracking', (shouldTrack) => {
    if (shouldTrack) {
      startTracking();
    } else {
      stopTracking();
    }
  });

  if (Simpla.getState().options._useHashTracking) {
    startTracking();
  }
}
