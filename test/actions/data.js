import { get, set, remove } from '../../src/actions/data';
import thunk from 'redux-thunk';
import * as types from '../../src/constants/actionTypes';
import configureMockStore from '../__utils__/redux-mock-store';

const mockStore = configureMockStore([ thunk ]);

describe('data actions', () => {
  describe('get', () => {
    const UID_FOR_STORED = 'foo.bar';
    const STORED_AT_UID = 'baz';
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
          type: types.GET_DATA_STATE,
          uid: UID_FOR_STORED
        }]);

        expect(response).to.equal(STORED_AT_UID);
      });
    });
  });

  describe('set', () => {

  });

  describe('remove', () => {

  });
});
