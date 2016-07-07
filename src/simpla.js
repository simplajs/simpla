import { createStore } from 'redux';
import { setAuthEndpoint, setDataEndpoint } from './actions/options';
import { importElement } from './actions/imports';
import { AUTH_SERVER, BASE_PATH, ELEMENTS } from './constants/options';
import rootReducer from './reducers';

const store = createStore(rootReducer);
const Simpla = function Simpla(options) {
  Simpla._store = Simpla._store || store;

  let project,
      base = '',
      authEndpoint,
      dataEndpoint,
      elements = [];

  // Initialize the auth server
  authEndpoint = AUTH_SERVER;
  Simpla._store.dispatch(setAuthEndpoint(authEndpoint));

  // Initialize data endpoint
  if (typeof options === 'string') {
    project = options;
  } else {
    project = options.project;
  }

  dataEndpoint = `${AUTH_SERVER}/projects/${project}/items`;
  Simpla._store.dispatch(setDataEndpoint(dataEndpoint));

  // Initialize elements
  if (typeof options.elements === 'undefined') { // Doesn't exist, use defaults
    elements = ELEMENTS;
    base = BASE_PATH;
  } else if (options.elements instanceof Array) { // Exists and is an array of paths
    elements = options.elements;
  } else if (options.elements) { // Exists, and not falsey
    // Use given, or fallback to defaults
    elements = options.elements.paths || ELEMENTS;
    base = options.elements.base || BASE_PATH;
  }

  elements.forEach(element => Simpla._store.dispatch(importElement(`${base}${element}`)));
};

export default Simpla;
