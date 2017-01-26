import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import { createStore, applyMiddleware } from 'redux';
import { setOption } from './actions/options';
import { editActive, editInactive } from './actions/editable';
import { login, logout } from './actions/authentication';
import { get, set, remove, find } from './actions/data';
import save from './actions/save';
import { AUTH_SERVER } from './constants/options';
import { DATA_PREFIX } from './constants/state';
import * as types from './constants/actionTypes';
import { hideDefaultContent, readyWebComponents, configurePolymer } from './utils/prepare';
import { storeToObserver, dispatchThunkAndExpect, selectPropByPath } from './utils/helpers';
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

  let project;

  // Initialize data endpoint
  if (typeof options === 'string') {
    project = options;
  } else {
    project = options.project;
  }

  Simpla._store.dispatch(setOption('project', project));

  // Initialize endpoints
  Simpla._store.dispatch(setOption('authEndpoint', options._authEndpoint || AUTH_SERVER));
  Simpla._store.dispatch(setOption('dataEndpoint', options._dataEndpoint || `${AUTH_SERVER}/projects/${project}/content`));

  if (typeof options.hashTracking !== 'undefined') {
    Simpla._store.dispatch(setOption('hashTracking', options.hashTracking));
  } else {
    Simpla._store.dispatch(setOption('hashTracking', true));
  }

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
  find(...args) {
    return dispatchThunkAndExpect(store, find(...args), types.FIND_DATA_SUCCESSFUL);
  },

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
        path = args[0] ? `${DATA_PREFIX}.hierarchy.${args[0]}` : `${DATA_PREFIX}.hierarchy`,
        wrappedCallback = () => this.get(args[0]).then(callback);

    return storeToObserver(this._store || store).observe(path, wrappedCallback);
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

  // Editable
  editable(on) {
    (this._store || store).dispatch(on ? editActive() : editInactive());
  },

  // State
  getState(path) {
    let state = (this._store || store).getState();
    return path ? selectPropByPath(path, state) : state;
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
