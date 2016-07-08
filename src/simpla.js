import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import { createStore, applyMiddleware } from 'redux';
import { setAuthEndpoint, setDataEndpoint } from './actions/options';
import { importElement } from './actions/imports';
import { login, logout } from './actions/authentication';
import { get, set, remove } from './actions/data';
import { AUTH_SERVER, BASE_PATH, ELEMENTS } from './constants/options';
import { hideDefaultContent, readyWebComponents, configurePolymer } from './utils/prepare';
import { supportDeprecatedInitializer, supportDeprecatedConfig } from './utils/deprecation';
import { storeToObserver } from './utils/helpers';
import { emitter } from './middleware/emitter';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Create core store
const store = createStore(rootReducer, applyMiddleware(thunk));

// Hide Default Content
hideDefaultContent();

// Conditionally load in web components
readyWebComponents();

// Setup Polymer configuration
configurePolymer();

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

  // Add in deprecated configuration
  supportDeprecatedConfig(authEndpoint, project);

  return Simpla;
};

// Support deprecated initialization method
supportDeprecatedInitializer(Simpla);

// Add mixins
Object.assign(Simpla, {
  // Authentication
  login(...args) {
    return store.dispatch(login(...args));
  },

  logout(...args) {
    return store.dispatch(logout(...args));
  },

  // Data
  get(...args) {
    return store.dispatch(get(...args))
      .then(action => action.response);
  },

  set(...args) {
    return store.dispatch(set(...args))
      .then(action => action.response);
  },

  remove(...args) {
    return store.dispatch(remove(...args))
      .then(action => action.response);
  },

  // Events
  on(...args) {
    emitter.on(...args);
  },

  off(...args) {
    emitter.off(...args);
  },

  once(...args) {
    emitter.once(...args);
  },

  emit(...args) {
    emitter.emit(...args);
  },

  // State
  getState() {
    return (this._store || store).getState();
  },

  observe(...args) {
    return storeToObserver(this._store || store).observe(...args);
  },

  // Backwards compatibility for previous SDK
  client: Simpla
});

export default Simpla;
