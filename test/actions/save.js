import save, { startSave, saveSuccessful, saveFailed } from '../../src/actions/save';
import { makeItemWith, pathToUid } from '../../src/utils/helpers';
import * as apiActions from '../../src/actions/api';
import * as dataActions from '../../src/actions/data';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from '../__utils__/redux-mock-store';

const mockStore = configureMockStore([ thunk ]);
const TOKEN = 'some-token';
const SERVER = 'some-server';

const TO_SET = {
  [ '/foo/bar' ]: {
    remote: null,
    local: { path: '/foo/bar', foo: 'bar' },
    changed: true
  },
  [ '/foo/qux' ]: {
    remote: null,
    local: { path: '/foo/qux', foo: 'qux' },
    changed: true
  }
};

const TO_SET_RESPONSES = Object.keys(TO_SET)
  .reduce((responses, path) => {
    return Object.assign(responses, { [ path ]: makeItemWith(path, TO_SET[path].local) });
  }, {});

const TO_REMOVE = {
  ['/bar/qux'] : {
    remote: '',
    local: null,
    changed: true
  }
};

const TO_REMAIN = {
  [ '/foo/baz']: {
    remote: '',
    local: '',
    changed: false
  }
};

describe('save actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      config: {
        dataEndpoint: SERVER
      },
      token: TOKEN,
      buffer: {
        verbose: Object.assign({}, TO_SET, TO_REMOVE, TO_REMAIN)
      }
    });

    Object.keys(TO_SET)
      .forEach(path => fetchMock.mock(`${SERVER}/${pathToUid(path)}`, 'PUT', TO_SET_RESPONSES[path]));

    Object.keys(TO_REMOVE)
      .forEach(path => fetchMock.mock(`${SERVER}/${pathToUid(path)}`, 'DELETE', {}));
  });

  afterEach(() => {
    fetchMock.restore();
  })

  it('should fire saving when starting', () => {
    return store.dispatch(save())
      .then(() => {
        expect(store.getActions()).to.deep.include.members([
          startSave(),
          saveSuccessful()
        ]);
      });
  });

  it('should fire setDataApi actions on all data that changed with a value', () => {
    let toSetData = path => apiActions.setData(path, TO_SET[path].local),
        actions = Object.keys(TO_SET).map(toSetData);

    return store.dispatch(save())
      .then(() => {
        expect(store.getActions()).to.deep.include.members(actions);
      });
  });

  it('should fire local setData after successfully setting data to API', () => {
    let toSetLocal = path => dataActions.setData(path, TO_SET_RESPONSES[path]),
        actions = Object.keys(TO_SET).map(toSetLocal);

    return store.dispatch(save())
      .then(() => {
        expect(store.getActions()).to.deep.include.members(actions);
      });
  });

  it('should fire removeDataApi actions on all data that changed to null', () => {
    let toRemoveData = path => apiActions.removeData(path),
        actions = Object.keys(TO_REMOVE).map(toRemoveData);

    return store.dispatch(save())
      .then(() => {
        expect(store.getActions()).to.deep.include.members(actions);
      });
  });

  it('should throw save unsuccessful if any fetch fails', () => {
    fetchMock.restore();

    return store.dispatch(save())
      .then(() => {
        expect(store.getActions()).to.deep.include(saveFailed())
      })
  });
});
