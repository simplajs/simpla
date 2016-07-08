import { SET_OPTION } from '../../src/constants/actionTypes';
import optionsReducer from '../../src/reducers/options';

describe('optionsReducer', () => {
  it('should have an initial state', () => {
    expect(optionsReducer(undefined, {})).to.deep.equal({});
  });

  it('should set arbitrary option values', () => {
    expect(optionsReducer({}, {
      type: SET_OPTION,
      prop: 'foo',
      value: 'bar'
    })).to.deep.equal({
      foo: 'bar'
    });
  });
});
