import dataReducer from '../../src/reducers/data';
import { SET_DATA_STATE, REMOVE_DATA_STATE } from '../../src/constants/actionTypes';

describe('dataReducer', () => {
  describe('handling SET_DATA_STATE', () => {
    it('should update the state path by the given uid and data', () => {
      let state = dataReducer({}, {
        type: SET_DATA_STATE,
        uid: 'foo.bar.baz',
        data: { qux: 'foo' }
      });

      expect(state.foo.bar.baz).to.deep.equal({ qux: 'foo' });
    });

    it('should add a clone, not a reference', () => {
      let data = { baz: 'qux' },
          state = dataReducer({}, {
            type: SET_DATA_STATE,
            uid: 'foo.bar',
            data
          });

      data.baz = 'nope';
      expect(state.foo.bar.baz).to.deep.equal('qux');
    });
  });

  describe('handling REMOVE_DATA_STATE', () => {
    it('should set data to null when removing from state', () => {
      let state = dataReducer({ foo: { bar: { baz: true } } }, {
        type: REMOVE_DATA_STATE,
        uid: 'foo.bar'
      });

      expect(state.foo.bar).to.equal(null);
    });
  });
});
