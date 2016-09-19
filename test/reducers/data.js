import dataReducer from '../../src/reducers/data';
import { UPDATE_DATA_STATE } from '../../src/constants/actionTypes';

describe('dataReducer', () => {
  it('should update the state path by the given uid and data', () => {
    let state = dataReducer({}, {
      type: UPDATE_DATA_STATE,
      uid: 'foo.bar.baz',
      data: { qux: 'foo' }
    });

    expect(state.foo.bar.baz).to.deep.equal({ qux: 'foo' });
  });

  it('should add a clone, not a reference', () => {
    let data = { baz: 'qux' },
        state = dataReducer({}, {
          type: UPDATE_DATA_STATE,
          uid: 'foo.bar',
          data
        });

    data.baz = 'nope';
    expect(state.foo.bar.baz).to.deep.equal('qux');
  });
});
