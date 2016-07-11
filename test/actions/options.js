import { setOption } from '../../src/actions/options';
import { SET_OPTION } from '../../src/constants/actionTypes';

describe('options action creators', () => {
  describe('setOption', () => {
    it('should create a SET_OPTION action with given prop / value', () => {
      let value = 'auth-endpoint',
          prop = 'authEndpoint',
          expected = {
            type: SET_OPTION,
            prop,
            value
          },
          result = setOption(prop, value);

      expect(result).to.deep.equal(expected);
    });
  });
});
