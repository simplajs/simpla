import { hierachy, content } from '../../src/reducers/data';
import { setDataSuccessful, removeDataSuccessful } from '../../src/actions/data';

describe('dataReducer', () => {
  describe('setting data', () => {
    describe('hierachy', () => {
      it('should build a tree based on UID given', () => {
        let state = hierachy(undefined, setDataSuccessful('foo.bar.baz', {}));
        expect(state.foo.bar.baz).to.be.defined;
      });

      it('shouldnt disturb other branches of the tree', () => {
        let state = hierachy({
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
        let state = content({}, setDataSuccessful('foo.bar', {}));
        expect(state['foo.bar']).to.deep.equal({});
      });

      it('should store deep copies of the data', () => {
        let data = { foo: { bar: 'baz' } },
            state = content({}, setDataSuccessful('foo', data));

        data.foo.bar = 'qux';
        expect(state['foo'].foo.bar).to.equal('baz');
      });
    });
  });

  describe('removing data', () => {
    describe('hierachy', () => {
      it('should remove the tree at that point', () => {
        let state = hierachy({
          foo: {
            bar: {
              baz: {}
            }
          }
        }, removeDataSuccessful('foo.bar'));

        expect(state.foo.bar).to.be.undefined;
      });

      it('should do nothing if it cant find that section of the tree', () => {
        let state = hierachy({
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
    });
  });
});
