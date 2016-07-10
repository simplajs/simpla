let HASH_EDIT = '#edit';

export default function hashTracking(Simpla) {
  // Part one, bind from hash to Simpla
  let hashObserver = ({ target }) => {
    if (target.location.hash === HASH_EDIT) {
      Simpla.startEditing();
    } else {
      Simpla.stopEditing();
    }
  }

  window.addEventListener('hashchange', hashObserver);
  // Kickstart it
  hashObserver({ target: window });

  // Part two, bind from Simpla to hash
  Simpla.observe('editing', (editing) => {
    if (editing) {
      window.location.hash = HASH_EDIT;
    } else {
      window.location.hash = '';
    }
  });
}
