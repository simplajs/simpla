import fetch from '../utils/fetch';

export default function(Simpla) {
  let observer,
      tryPing;

  tryPing = ({ authEndpoint, project }) => {
    if (authEndpoint && project) {
      fetch(`${authEndpoint}/projects/${project}/sessions`, { method: 'POST' })
      observer && observer.unobserve();
      return true;
    }

    return false;
  };

  if (!tryPing(Simpla.getState('config'))) {
    observer = Simpla.observeState('config', tryPing);
  }
}
