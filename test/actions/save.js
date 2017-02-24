import save, { startSave, saveSuccessful, saveFailed } from '../../src/actions/save';
import { makeItemWith } from '../../src/utils/helpers';
import * as apiActions from '../../src/actions/api';
import * as dataActions from '../../src/actions/data';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from '../__utils__/redux-mock-store';

const mockStore = configureMockStore([ thunk ]);
const TOKEN = 'some-token';
const SERVER = 'some-server';

const TO_SET = {
  [ 'foo.bar' ]: {
    remote: null,
    local: { foo: 'bar' },
    changed: true
  },
  [ 'foo.qux' ]: {
    remote: null,
    local: { foo: 'qux' },
    changed: true
  }
};

const TO_SET_RESPONSES = Object.keys(TO_SET)
  .reduce((responses, uid) => {
    return Object.assign(responses, { [ uid ]: makeItemWith(uid, TO_SET[uid].local) });
  }, {});

const TO_REMOVE = {
  ['bar.qux'] : {
    remote: '',
    local: null,
    changed: true
  }
};

const TO_REMAIN = {
  [ 'foo.baz']: {
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
      save: Object.assign({}, TO_SET, TO_REMOVE, TO_REMAIN)
    });

    Object.keys(TO_SET)
      .forEach(uid => fetchMock.mock(`${SERVER}/${uid}`, 'PUT', TO_SET_RESPONSES[uid]));

    Object.keys(TO_REMOVE)
      .forEach(uid => fetchMock.mock(`${SERVER}/${uid}`, 'DELETE', {}));
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
    let toSetData = uid => apiActions.setData(uid, TO_SET[uid].local),
        actions = Object.keys(TO_SET).map(toSetData);

    return store.dispatch(save())
      .then(() => {
        debugger;
        expect(store.getActions()).to.deep.include.members(actions);
      });
  });

  it('should fire local setData after successfully setting data to API', () => {
    let toSetLocal = uid => dataActions.setData(uid, TO_SET_RESPONSES[uid]),
        actions = Object.keys(TO_SET).map(toSetLocal);

    return store.dispatch(save())
      .then(() => {
        expect(store.getActions()).to.deep.include.members(actions);
      });
  });

  it('should fire removeDataApi actions on all data that changed to null', () => {
    let toRemoveData = uid => apiActions.removeData(uid),
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
