import { FIND_DATA_FROM_API_SUCCESSFUL } from '../../src/constants/actionTypes';
import queriesReducer from '../../src/reducers/queries';
import { toQueryParams } from '../../src/utils/helpers';

describe('queriesReducer', () => {
  it('should have an initial state', () => {
    expect(queriesReducer(undefined, {})).to.deep.equal({});
  });

  it('should set arbitrary option values', () => {
    let query = { foo: 'bar' };
    expect(queriesReducer({}, {
      type: FIND_DATA_FROM_API_SUCCESSFUL,
      query
    })).to.deep.equal({
      [ toQueryParams(query) ]: true
    });
  });
});
