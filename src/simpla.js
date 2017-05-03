import 'es6-promise/auto';
import { createStore, applyMiddleware, compose } from 'redux';
import { setOption } from './actions/options';
import { editActive, editInactive } from './actions/editable';
import { login, logout } from './actions/authentication';
import { get, set, remove, find } from './actions/data';
import { observeQuery } from './actions/queries';
import save from './actions/save';
import { AUTH_SERVER } from './constants/options';
import { DATA_PREFIX, QUERIES_PREFIX, PUBLIC_STATES } from './constants/state';
import * as types from './constants/actionTypes';
import { configurePolymer } from './utils/prepare';
import {
  storeToObserver,
  dispatchThunkAndExpect,
  pathToUid,
  itemUidToPath,
  queryResultsToPath,
  validatePath,
  toQueryParams,
  uidsToResponse
} from './utils/helpers';
import ping from './plugins/ping';
import persistToken from './plugins/persistToken';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

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
    let parentPath = options.parent;
    options.parent = pathToUid(parentPath);
    return Promise.resolve()
      .then(() => validatePath(parentPath))
      .then(() => dispatchThunkAndExpect(
        this._store,
        find(options),
        types.FIND_DATA_SUCCESSFUL
      ))
      .then(queryResultsToPath);
  }

  get(path, ...args) {
    const uid = pathToUid(path);
    return Promise.resolve()
      .then(() => validatePath(path))
      .then(() => dispatchThunkAndExpect(
        this._store,
        get(uid, ...args),
        types.GET_DATA_SUCCESSFUL
      ))
      .then(itemUidToPath);
  }

  set(path, ...args) {
    const uid = pathToUid(path);
    return Promise.resolve()
      .then(() => validatePath(path))
      .then(() => dispatchThunkAndExpect(
        this._store,
        set(uid, ...args),
        types.SET_DATA_SUCCESSFUL
      ))
      .then(itemUidToPath);
  }

  remove(path, ...args) {
    const uid = pathToUid(path);
    return Promise.resolve()
      .then(() => validatePath(path))
      .then(() => dispatchThunkAndExpect(
        this._store,
        remove(uid, ...args),
        types.REMOVE_DATA_SUCCESSFUL
      ))
      .then(itemUidToPath);
  }

  observe(path, ...args) {
    let callback = args.pop(),
        uid = pathToUid(path),
        pathInState,
        wrappedCallback;

    if (!uid) {
      throw new Error('Observe must be given a valid path');
    }

    validatePath(path);

    pathInState = [ DATA_PREFIX, 'content', uid ];
    wrappedCallback = () => this.get(path).then(callback);

    return storeToObserver(this._store).observe(pathInState, wrappedCallback);
  }

  observeQuery(query, callback) {
    let queryString,
        pathInStore,
        wrappedCallback;

    query.parent = pathToUid(query.parent);
    queryString = toQueryParams(query);
    pathInStore = [ QUERIES_PREFIX, queryString, 'matches' ];

    this._store.dispatch(observeQuery(query));

    wrappedCallback = (uids) => {
      return callback(
        queryResultsToPath(
          uidsToResponse(uids, this._store.getState())
        )
      );
    }

    return storeToObserver(this._store).observe(pathInStore, wrappedCallback);
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

    if (path) {
      return PUBLIC_STATES.indexOf(path) === -1 ? undefined : state[path];
    }
    
    return PUBLIC_STATES.reduce((publicState, property) => {
      publicState[property] = state[property];
      return publicState;
    }, {});
  }

  observeState(...args) {
    return storeToObserver(this._store).observe(...args);
  }
}

// Init plugins
const plugins = [
  ping,
  persistToken
];

plugins.forEach(plugin => plugin(Simpla));

export default Simpla;
