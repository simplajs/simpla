import { storeToObserver, selectPropByPath, dispatchThunkAndExpect } from '../../src/utils/helpers';
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

    it('should return undefined if selecting deep unknown', () => {
      expect(selectPropByPath('foo.bar.baz', {
        foo: {}
      })).to.be.undefined;
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

    it('should ensure internal comparisons states are updated before calling observer', () => {
      let store = { getState: sinon.stub().returns({}), subscribe: sinon.stub() },
          observable = storeToObserver(store),
          calls = 0,
          subscriber;

      observable.observe(() => {
        if (calls++ > 0) {
          throw new Error('Should only be called once if value doesnt change');
        }
        subscriber();
      });

      store.getState = sinon.stub().returns(null);
      subscriber = store.subscribe.lastCall.args[0];
      subscriber();
    });

    it('should return a function', () => {
      let store = createStore((state) => state),
          observable = storeToObserver(store),
          unobserve = observable.observe('', () => {});

      expect(unobserve).to.be.a('function');
    });
  });

  describe('dispatchThunkAndExpect', () => {
    const GOOD_TYPE = 'good-type',
          BAD_TYPE = 'bad-type',
          RESPONSE = 'response',
          THUNK = 'thunk';

    it('should resolve on the correct type', () => {
      let store = {
            dispatch: sinon.stub()
              .returns(Promise.resolve({ type: GOOD_TYPE, response: RESPONSE }))
          },
          resolveSpy = sinon.spy(),
          rejectSpy = sinon.spy();

      return dispatchThunkAndExpect(store, THUNK, GOOD_TYPE)
        .then(resolveSpy, rejectSpy)
        .then(() => {
          expect(resolveSpy.called).to.be.true;
          expect(resolveSpy.calledWith(RESPONSE)).to.be.true;
          expect(store.dispatch.calledWith(THUNK)).to.be.true;
        });
    });

    it('should reject on the wrong type', () => {
      let store = {
            dispatch: sinon.stub()
              .returns(Promise.resolve({ type: BAD_TYPE, response: RESPONSE }))
          },
          resolveSpy = sinon.spy(),
          rejectSpy = sinon.spy();

      return dispatchThunkAndExpect(store, THUNK, GOOD_TYPE)
        .then(resolveSpy, rejectSpy)
        .then(() => {
          expect(rejectSpy.called).to.be.true;
          expect(rejectSpy.calledWith(RESPONSE)).to.be.true;
          expect(store.dispatch.calledWith(THUNK)).to.be.true;
        });
    });
  });
});
