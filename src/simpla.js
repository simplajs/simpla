import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import { createStore, applyMiddleware } from 'redux';
import { setOption } from './actions/options';
import { importElement } from './actions/imports';
import { editActive, editInactive } from './actions/editing';
import { login, logout } from './actions/authentication';
import { get, set, remove } from './actions/data';
import save from './actions/save';
import { AUTH_SERVER, BASE_PATH, ELEMENTS } from './constants/options';
import * as types from './constants/actionTypes';
import { hideDefaultContent, readyWebComponents, configurePolymer } from './utils/prepare';
import { storeToObserver, ensureActionMatches, dispatchThunkAndExpect } from './utils/helpers';
import { emitter } from './middleware/emitter';
import { supportDeprecatedConfig, supportDeprecatedInitializer } from './plugins/deprecation';
import hashTracking from './plugins/hashTracking';
import usageMonitoring from './plugins/usageMonitoring';
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
      elements = [];

  // Initialize data endpoint
  if (typeof options === 'string') {
    project = options;
  } else {
    project = options.project;
  }

  Simpla._store.dispatch(setOption('project', project));

  // Initialize endpoints
  Simpla._store.dispatch(setOption('authEndpoint', AUTH_SERVER));
  Simpla._store.dispatch(setOption('dataEndpoint', `${AUTH_SERVER}/projects/${project}/items`));

  if (typeof options._useHashTracking !== 'undefined') {
    Simpla._store.dispatch(setOption('_useHashTracking', options._useHashTracking));
  } else {
    Simpla._store.dispatch(setOption('_useHashTracking', true));
  }

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

  return Simpla;
};

// Add mixins
Object.assign(Simpla, {
  // Authentication
  login(...args) {
    return dispatchThunkAndExpect(store, login(...args), types.LOGIN_SUCCESSFUL);
  },

  logout(...args) {
    return dispatchThunkAndExpect(store, logout(...args), types.LOGOUT_SUCCESSFUL);
  },

  // Data
  get(...args) {
    return dispatchThunkAndExpect(store, get(...args), types.GET_DATA_SUCCESSFUL);
  },

  set(...args) {
    return dispatchThunkAndExpect(store, set(...args), types.SET_DATA_SUCCESSFUL);
  },

  remove(...args) {
    return dispatchThunkAndExpect(store, remove(...args), types.REMOVE_DATA_SUCCESSFUL);
  },

  save(...args) {
    return dispatchThunkAndExpect(store, save(...args), types.SAVE_SUCCESSFUL);
  },

  observe(...args) {
    let callback = args.pop(),
        path = args[0] ? `_data.${args[0]}` : '_data';

    return storeToObserver(this._store || store).observe(path, callback);
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

  // Editing
  toggleEditing(on) {
    (this._store || store).dispatch(on ? editActive() : editInactive());
  },

  // State
  getState() {
    return (this._store || store).getState();
  },

  observeState(...args) {
    return storeToObserver(this._store || store).observe(...args);
  },

  // Backwards compatibility for previous SDK
  client: Simpla
});

// Init plugins
[
  hashTracking,
  supportDeprecatedInitializer,
  supportDeprecatedConfig,
  usageMonitoring
].forEach(plugin => plugin(Simpla));

export default Simpla;
