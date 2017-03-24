import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import { createStore, applyMiddleware, compose } from 'redux';
import { setOption } from './actions/options';
import { editActive, editInactive } from './actions/editable';
import { login, logout } from './actions/authentication';
import { get, set, remove, find } from './actions/data';
import save from './actions/save';
import { AUTH_SERVER } from './constants/options';
import { DATA_PREFIX } from './constants/state';
import * as types from './constants/actionTypes';
import { hideDefaultContent, configurePolymer } from './utils/prepare';
import { storeToObserver, dispatchThunkAndExpect, selectPropByPath, pathToUid } from './utils/helpers';
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
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    this._store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
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
  find(options = {}) {
    options.parent = pathToUid(options.parent);
    return dispatchThunkAndExpect(this._store, find(options), types.FIND_DATA_SUCCESSFUL);
  }

  get(path, ...args) {
    const uid = pathToUid(path);
    return dispatchThunkAndExpect(this._store, get(uid, ...args), types.GET_DATA_SUCCESSFUL);
  }

  set(path, ...args) {
    const uid = pathToUid(path);
    return dispatchThunkAndExpect(this._store, set(uid, ...args), types.SET_DATA_SUCCESSFUL);
  }

  remove(path, ...args) {
    const uid = pathToUid(path);
    return dispatchThunkAndExpect(this._store, remove(uid, ...args), types.REMOVE_DATA_SUCCESSFUL);
  }

  observe(path, ...args) {
    let callback = args.pop(),
        uid = pathToUid(path),
        pathInState,
        wrappedCallback;

    if (!uid) {
      throw new Error('Observe must be given a valid path');
    }

    pathInState = [ DATA_PREFIX, 'content', uid ];
    wrappedCallback = () => this.get(uid).then(callback);

    return storeToObserver(this._store).observe(pathInState, wrappedCallback);
  }

  save(...args) {
    return dispatchThunkAndExpect(this._store, save(...args), types.SAVE_SUCCESSFUL);
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
