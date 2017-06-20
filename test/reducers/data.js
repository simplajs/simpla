import content from '../../src/reducers/data';
import { setDataSuccessful, removeDataSuccessful } from '../../src/actions/data';
import { makeItemWith } from '../../src/utils/helpers';

describe('dataReducer', () => {
  describe('setting data', () => {
    it('should create a flat map of paths to their data', () => {
      let path = '/foo/bar',
          state = content({}, setDataSuccessful(path, {}));

      expect(state[path]).to.deep.equal(makeItemWith(path, {}));
    });

    it('should store deep copies of the data', () => {
      let data = { foo: { bar: 'baz' } },
          state = content({}, setDataSuccessful('foo', data));

      data.foo.bar = 'qux';
      expect(state['foo'].foo.bar).to.equal('baz');
    });

    it('should ensure the data set into the state contains the path prop', () => {
      let path = '/foo/bar',
          state = content({}, setDataSuccessful(path, {}));

      expect(state[path].path).to.equal(path);
    });

    it('should not set data if no change has occurred', () => {
      let action = setDataSuccessful('/foo/bar', {}),
          initialState = content({}, action),
          secondaryState = content(initialState, action);

      expect(initialState).to.equal(secondaryState);
    });
  });

  describe('removing data', () => {
    it('should set content at that point to null', () => {
      let state = content({
        ['/foo/bar']: {}
      }, removeDataSuccessful('/foo/bar'));

      expect(state['/foo/bar']).to.equal(null);
    });

    it('should set to null even it didnt exist before', () => {
      let state = content({}, removeDataSuccessful('/foo/bar'));
      expect(state['/foo/bar']).to.equal(null);
    });

    it('should not return a new object if it would make no difference', () => {
      let currentState = {
        [ '/foo/bar' ]: null
      };

      expect(content(currentState, removeDataSuccessful('/foo/bar'))).to.equal(currentState);
    });
  });
});
