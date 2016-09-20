import {
  get,
  getData,
  getDataSuccessful,
  set,
  setData,
  setDataSuccessful,
  remove,
  removeData,
  removeDataSuccessful
} from '../../src/actions/data';
import thunk from 'redux-thunk';
import configureMockStore from '../__utils__/redux-mock-store';

const mockStore = configureMockStore([ thunk ]);

const UID_FOR_STORED = 'foo.bar';
const STORED_AT_UID = 'baz';

describe('data actions', () => {
  describe('get', () => {
    let dataInState,
        store;

    beforeEach(() => {
      let data = { foo: { bar: STORED_AT_UID } };

      store = mockStore({ data });
      dataInState = store.dispatch(get(UID_FOR_STORED));
    });

    it('should get value in the state', () => {
      return dataInState.then((response) => {
        expect(store.getActions()).to.deep.equal([
          getData(UID_FOR_STORED),
          getDataSuccessful(UID_FOR_STORED, STORED_AT_UID)
        ]);
      });
    });
  });

  describe('set', () => {
    it('should fire off set and set successful', () => {
      let store = mockStore({});

      return store.dispatch(set(UID_FOR_STORED, STORED_AT_UID))
        .then(() => {
          expect(store.getActions()).to.deep.equal([
            setData(UID_FOR_STORED, STORED_AT_UID),
            setDataSuccessful(UID_FOR_STORED, STORED_AT_UID)
          ]);
        });
    });
  });

  describe('remove', () => {
    it('should fire off remove and remove successful', () => {
      let store = mockStore({});

      return store.dispatch(remove(UID_FOR_STORED))
        .then(() => {
          expect(store.getActions()).to.deep.equal([
            removeData(UID_FOR_STORED),
            removeDataSuccessful(UID_FOR_STORED)
          ]);
        });
    });
  });
});
