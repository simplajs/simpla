import { setAuthEndpoint, setDataEndpoint } from '../../src/actions/options';
import { SET_OPTION } from '../../src/constants/actionTypes';

describe('options action creators', () => {
  describe('setAuthEndpoint', () => {
    it('should create a SET_OPTION action with authEndpoint prop / value', () => {
      let value = 'auth-endpoint',
          expected = {
            type: SET_OPTION,
            prop: 'authEndpoint',
            value
          },
          result = setAuthEndpoint(value);

      expect(result).to.deep.equal(expected);
    });
  });

  describe('setDataEndpoint', () => {
    it('should create a SET_OPTION action with dataEndpoint prop / value', () => {
      let value = 'data-endpoint',
          expected = {
            type: SET_OPTION,
            prop: 'dataEndpoint',
            value
          },
          result = setDataEndpoint(value);

      expect(result).to.deep.equal(expected);
    });
  });
});
