import { hierarchy, content } from '../../src/reducers/data';
import { setDataSuccessful, removeDataSuccessful } from '../../src/actions/data';
import { makeItemWith } from '../../src/utils/helpers';

describe('dataReducer', () => {
  describe('setting data', () => {
    describe('hierarchy', () => {
      it('should build a tree based on UID given', () => {
        let state = hierarchy(undefined, setDataSuccessful('foo.bar.baz', {}));
        expect(state.foo.bar.baz).to.be.defined;
      });

      it('shouldnt disturb other branches of the tree', () => {
        let state = hierarchy({
          foo: {
            bar: {
              baz: {}
            }
          },
          baz: {
            qux: {}
          }
        }, setDataSuccessful('foo.qux', {}));

        expect(state).to.deep.equal({
          foo: {
            bar: {
              baz: {}
            },
            qux: {}
          },
          baz: {
            qux: {}
          }
        });
      });
    });

    describe('content', () => {
      it('should create a flat map of uids to their data', () => {
        let uid = 'foo.bar',
            state = content({}, setDataSuccessful(uid, {}));

        expect(state[uid]).to.deep.equal(makeItemWith(uid, {}));
      });

      it('should store deep copies of the data', () => {
        let data = { foo: { bar: 'baz' } },
            state = content({}, setDataSuccessful('foo', data));

        data.foo.bar = 'qux';
        expect(state['foo'].foo.bar).to.equal('baz');
      });
    });

    it('should ensure the data set into the state contains the id prop', () => {
      let uid = 'foo.bar',
          state = content({}, setDataSuccessful(uid, {}));

      expect(state[uid].id).to.equal(uid);
    });

    it('should not set data if no change has occurred', () => {
      let action = setDataSuccessful('foo.bar', {}),
          initialState = content({}, action),
          secondaryState = content(initialState, action);

      expect(initialState).to.equal(secondaryState);
    });
  });

  describe('removing data', () => {
    describe('hierarchy', () => {
      it('should remove the tree at that point', () => {
        let state = hierarchy({
          foo: {
            bar: {
              baz: {}
            }
          }
        }, removeDataSuccessful('foo.bar'));

        expect(state.foo.bar).to.be.undefined;
      });

      it('should do nothing if it cant find that section of the tree', () => {
        let state = hierarchy({
          foo: {}
        }, removeDataSuccessful('foo.bar.baz'));

        expect(state.foo.bar).to.be.undefined;
      });
    });

    describe('content', () => {
      it('should set content at that point to null', () => {
        let state = content({
          ['foo.bar']: {}
        }, removeDataSuccessful('foo.bar'));

        expect(state['foo.bar']).to.equal(null);
      });

      it('should set to null even it didnt exist before', () => {
        let state = content({}, removeDataSuccessful('foo.bar'));
        expect(state['foo.bar']).to.equal(null);
      });

      it('should not return a new object if it would make no difference', () => {
        let currentState = {
          [ 'foo.bar' ]: null
        };

        expect(content(currentState, removeDataSuccessful('foo.bar'))).to.equal(currentState);
      });
    });
  });
});
