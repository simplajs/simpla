import { storeToObserver, selectPropByPath } from '../../src/utils/helpers';
import { createStore } from 'redux';

describe('helpers', () => {
  describe('selectPropByPath', () => {
    it('should be able to select deep properties', () => {
      expect(selectPropByPath('foo.bar.1.baz', {
        foo: {
          bar: [{}, {
            baz: 'qux'
          }]
        }
      })).to.equal('qux');
    });
  });

  describe('storeToObserver', () => {
    it('should get called on every state change if just a callback given', () => {
      let spy = sinon.spy(),
          store;

      store = createStore((state, action) => {
        return state ? [...state, state.length] : [];
      });

      storeToObserver(store).observe(spy);

      store.dispatch({ type: '' });
      expect(spy.lastCall.args).to.deep.equal([ [ 0 ], [] ]);

      store.dispatch({ type: '' });
      expect(spy.lastCall.args).to.deep.equal([ [ 0, 1 ], [ 0 ] ]);
    });

    it('should observe only subproperties when given a selector string', () => {
      let barSpy = sinon.spy(),
          bazSpy = sinon.spy(),
          initial = {
            foo: {
              bar: null,
              baz: null
            }
          },
          store,
          observable;

      store = createStore((state = initial, action) => {
        switch (action.type) {
        case 'set-foo-bar':
          return Object.assign({}, state, {
            foo: Object.assign({}, state.foo, { bar: action.value })
          });
        case 'set-foo-baz':
          return Object.assign({}, state, {
            foo: Object.assign({}, state.foo, { baz: action.value })
          });
        default:
          return state;
        }
      });

      observable = storeToObserver(store);

      observable.observe('foo.bar', barSpy);
      observable.observe('foo.baz', bazSpy);

      store.dispatch({
        type: 'set-foo-bar',
        value: 'bar'
      });

      expect(bazSpy.called).to.be.false;
      expect(barSpy.lastCall.args).to.deep.equal([ 'bar', null ]);

      store.dispatch({
        type: 'set-foo-baz',
        value: 'baz'
      });

      expect(bazSpy.lastCall.args).to.deep.equal([ 'baz', null ]);
      expect(barSpy.callCount).to.equal(1);
    });
  });
});
