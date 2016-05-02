import { readyWebComponents, configurePolymer } from './utils';
import SimplaClass from './class';

// Start the load process, store returned promise
const ensureReady = readyWebComponents().then(configurePolymer);

/**
 * Boot Simpla
 * @param {Simpla} Returns client of Simpla
 */
export default function Simpla(...args) {
  if (Simpla.client) {
    console.warn('Simpla already initialized, doing nothing.');
    return Simpla.client;
  }

  let client = new SimplaClass(...args);

  // Start loading elements once browser is ready
  ensureReady
    .then(() => SimplaClass.loadElements(client.options.elements, client.options.base));

  // Set client on self
  Simpla.client = client;


  /**
   * NOTE: Also for backwards compatibility. This below is a private API and can be
   * 	safely removed once all elements who depend on it are upgraded
   */
  window.simpla = {
    config: {
      server: client.options.api.auth,
      api: client.options.project
    }
  };

  return client;
}

Simpla.constructor = SimplaClass;

// Bring over static methods
Object.getOwnPropertyNames(SimplaClass)
  .filter(prop => typeof Object.getOwnPropertyDescriptor(SimplaClass, prop).value === 'function')
  .forEach(prop => Simpla[prop] = SimplaClass[prop]);


/**
 * NOTE: This is here purely for backwards compatibility, in future it should
 * 	be removed when possible
 * 	@return {undefined}
 */
(() => {
  let tag = document.querySelector('script[simpla-api]'),
      project = tag && tag.getAttribute('simpla-api');

  if (project) {
    console.warn(`The [simpla-api] attribute setup method is deprecated. Please use Simpla('${project}') instead, see https://www.simpla.io/docs/start`);
    Simpla(project);
  }
})();
