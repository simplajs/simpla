import { get, set, remove } from '../../src/actions/data';
import thunk from 'redux-thunk';
import * as types from '../../src/constants/actionTypes';
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
        expect(store.getActions()).to.deep.equal([{
          type: types.GET_DATA,
          uid: UID_FOR_STORED
        }, {
          type: types.GET_DATA_SUCCESSFUL,
          uid: UID_FOR_STORED,
          response: STORED_AT_UID
        }]);
      });
    });
  });

  describe('set', () => {
    it('should fire off set and set successful', () => {
      let store = mockStore({});

      return store.dispatch(set(UID_FOR_STORED, STORED_AT_UID))
        .then(() => {
          expect(store.getActions()).to.deep.equal([{
            type: types.SET_DATA,
            uid: UID_FOR_STORED,
            data: STORED_AT_UID
          }, {
            type: types.SET_DATA_SUCCESSFUL,
            uid: UID_FOR_STORED,
            response: STORED_AT_UID
          }]);
        });
    });
  });

  describe('remove', () => {

  });
});
