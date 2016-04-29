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

  return client;
}

Simpla.constructor = SimplaClass;

// Bring over static methods
Object.getOwnPropertyNames(SimplaClass)
  .filter(prop => typeof Object.getOwnPropertyDescriptor(SimplaClass, prop).value === 'function')
  .forEach(prop => Simpla[prop] = SimplaClass[prop]);
