import 'es6-promise/auto';
import { createStore, applyMiddleware } from 'redux';
import { setOption } from './actions/options';
import { editActive, editInactive } from './actions/editable';
import { login, logout } from './actions/authentication';
import { get, set, remove, find } from './actions/data';
import { observeQuery } from './actions/queries';
import save from './actions/save';
import { AUTH_SERVER } from './constants/options';
import { DATA_PREFIX, QUERIES_PREFIX, PUBLIC_STATE_MAP } from './constants/state';
import * as types from './constants/actionTypes';
import { configurePolymer } from './utils/prepare';
import {
  storeToObserver,
  dispatchThunkAndExpect,
  get as getByPath,
  validatePath,
  toQueryParams,
  pathsToResponse,
  clone
} from './utils/helpers';
import ping from './plugins/ping';
import persistToken from './plugins/persistToken';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

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
  }

  // Authentication
  login(...args) {
    return dispatchThunkAndExpect(this._store, login(...args), types.LOGIN_SUCCESSFUL);
  }

  logout(...args) {
    return dispatchThunkAndExpect(this._store, logout(...args), types.LOGOUT_SUCCESSFUL);
  }

  // Data
  find(query = {}) {
    const { ancestor, parent } = query;

    return Promise.resolve()
      .then(() => ancestor && validatePath(ancestor))
      .then(() => parent && validatePath(parent))
      .then(() => dispatchThunkAndExpect(
        this._store,
        find(query),
        types.FIND_DATA_SUCCESSFUL
      ))
      .then(clone);
  }

  get(path, ...args) {
    return Promise.resolve()
      .then(() => validatePath(path))
      .then(() => dispatchThunkAndExpect(
        this._store,
        get(path, ...args),
        types.GET_DATA_SUCCESSFUL
      ))
      .then(clone);
  }

  set(path, ...args) {
    return Promise.resolve()
      .then(() => validatePath(path))
      .then(() => dispatchThunkAndExpect(
        this._store,
        set(path, ...args),
        types.SET_DATA_SUCCESSFUL
      ));
  }

  remove(path, ...args) {
    return Promise.resolve()
      .then(() => validatePath(path))
      .then(() => dispatchThunkAndExpect(
        this._store,
        remove(path, ...args),
        types.REMOVE_DATA_SUCCESSFUL
      ));
  }

  observe(path, ...args) {
    let callback = args.pop(),
        pathInState,
        wrappedCallback;

    if (!path) {
      throw new Error('Observe must be given a valid path');
    }

    validatePath(path);

    pathInState = [ DATA_PREFIX, path ];
    wrappedCallback = () => this.get(path).then(callback);

    return storeToObserver(this._store).observe(pathInState, wrappedCallback);
  }

  observeQuery(query, callback) {
    let content,
        queryString,
        pathInStore,
        wrappedCallback;

    // Clone so as to not affect given param
    query = Object.assign({}, query);

    queryString = toQueryParams(query);

    pathInStore = [ QUERIES_PREFIX, queryString, 'matches' ];
    content = this._store.getState()[DATA_PREFIX];

    if (query.parent) {
      validatePath(query.parent);
    }

    if (query.ancestor) {
      validatePath(query.ancestor);
    }

    this._store.dispatch(observeQuery({ query, content }));

    wrappedCallback = (paths) => {
      return callback(
        clone(pathsToResponse(paths, this._store.getState()))
      );
    }

    return storeToObserver(this._store).observe(pathInStore, wrappedCallback);
  }

  prefetch(path) {
    return this.find({ ancestor: path }).then(() => {});
  }

  save(...args) {
    return dispatchThunkAndExpect(this._store, save(...args), types.SAVE_SUCCESSFUL);
  }

  // Editable
  editable(on) {
    this._store.dispatch(on ? editActive() : editInactive());
  }

  // State
  getState(substate) {
    let state = this._store.getState();

    if (substate) {
      return PUBLIC_STATE_MAP[substate] && getByPath(state, PUBLIC_STATE_MAP[substate]);
    }

    return Object.keys(PUBLIC_STATE_MAP).reduce((publicState, property) => {
      return Object.assign(
        publicState,
        { [ property ]: getByPath(state, PUBLIC_STATE_MAP[property]) }
      );
    }, {});
  }

  observeState(substate, callback) {
    if (!substate) {
      throw new Error('No state given. Must include a state to observe e.g. Simpla.observeState(\'authenticated\', showAdmin)');
    }

    let realSubstate = PUBLIC_STATE_MAP[substate];
    return storeToObserver(this._store).observe(realSubstate, callback);
  }
}

// Init plugins
const plugins = [
  ping,
  persistToken
];

plugins.forEach(plugin => plugin(Simpla));

export default Simpla;
