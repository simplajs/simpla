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
import { hideDefaultContent, configurePolymer } from './utils/prepare';
import { storeToObserver, dispatchThunkAndExpect, selectPropByPath } from './utils/helpers';
import { supportDeprecatedConfig } from './plugins/deprecation';
import usageMonitoring from './plugins/usageMonitoring';
import persistToken from './plugins/persistToken';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Hide Default Content
hideDefaultContent();

// Setup Polymer configuration
configurePolymer();

const Simpla = new class Simpla {
  constructor() {
    this._store = createStore(rootReducer, applyMiddleware(thunk));
  }

  init(project) {
    this._store.dispatch(setOption('project', project));

    // Initialize endpoints
    this._store.dispatch(setOption('authEndpoint', AUTH_SERVER));
    this._store.dispatch(setOption('dataEndpoint', `${AUTH_SERVER}/projects/${project}/content`));
    this._store.dispatch(setOption('hashTracking', true));
  }

  // Authentication
  login(...args) {
    return dispatchThunkAndExpect(this._store, login(...args), types.LOGIN_SUCCESSFUL);
  }

  logout(...args) {
    return dispatchThunkAndExpect(this._store, logout(...args), types.LOGOUT_SUCCESSFUL);
  }

  // Data
  find(...args) {
    return dispatchThunkAndExpect(this._store, find(...args), types.FIND_DATA_SUCCESSFUL);
  }

  get(...args) {
    return dispatchThunkAndExpect(this._store, get(...args), types.GET_DATA_SUCCESSFUL);
  }

  set(...args) {
    return dispatchThunkAndExpect(this._store, set(...args), types.SET_DATA_SUCCESSFUL);
  }

  remove(...args) {
    return dispatchThunkAndExpect(this._store, remove(...args), types.REMOVE_DATA_SUCCESSFUL);
  }

  save(...args) {
    return dispatchThunkAndExpect(this._store, save(...args), types.SAVE_SUCCESSFUL);
  }

  observe(...args) {
    let callback = args.pop(),
        path = args[0] ? `${DATA_PREFIX}.hierarchy.${args[0]}` : `${DATA_PREFIX}.hierarchy`,
        wrappedCallback = () => this.get(args[0]).then(callback);

    return storeToObserver(this._store).observe(path, wrappedCallback);
  }

  // Editable
  editable(on) {
    this._store.dispatch(on ? editActive() : editInactive());
  }

  // State
  getState(path) {
    let state = this._store.getState();
    return path ? selectPropByPath(path, state) : state;
  }

  observeState(...args) {
    return storeToObserver(this._store).observe(...args);
  }
}

// Init plugins
const plugins = [
  supportDeprecatedConfig,
  usageMonitoring,
  persistToken
];

plugins.forEach(plugin => plugin(Simpla));

export default Simpla;
