import save, { startSave, saveSuccessful, saveFailed } from '../../src/actions/save';
import * as apiActions from '../../src/actions/api';
import thunk from 'redux-thunk';
import * as types from '../../src/constants/actionTypes';
import fetchMock from 'fetch-mock';
import configureMockStore from '../__utils__/redux-mock-store';

const mockStore = configureMockStore([ thunk ]);
const TOKEN = 'some-token';
const SERVER = 'some-server';
const UID = 'some.uid.to.something';
const DATA = { foo: 'bar' };
const RESPONSE = DATA;

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
      options: {
        dataEndpoint: SERVER
      },
      token: TOKEN,
      save: Object.assign({}, TO_SET, TO_REMOVE, TO_REMAIN)
    });

    Object.keys(TO_SET)
      .forEach(uid => fetchMock.mock(`${SERVER}/${uid}`, 'PUT', TO_SET[uid].local));

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
    let uid = Object.keys(TO_SET)[0];

    fetchMock.restore();

    return store.dispatch(save())
      .then(() => {
        expect(store.getActions()).to.deep.include(saveFailed())
      })
  });
});
