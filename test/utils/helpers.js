import {
  storeToObserver,
  selectPropByPath,
  dispatchThunkAndExpect,
  runDispatchAndExpect,
  dataIsValid,
  toQueryParams,
  findDataInState,
  makeItemWith,
  pathToUid,
  uidToPath,
  itemUidToPath,
  validatePath,
  matchesQuery,
  clone,
  jsonIsEqual
} from '../../src/utils/helpers';
import {
  DATA_PREFIX
} from '../../src/constants/state';
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

      store = createStore((state) => {
        return state ? [...state, state.length] : [];
      });

      storeToObserver(store).observe(spy);

      store.dispatch({ type: '' });
      expect(spy.lastCall.args).to.deep.equal([ [ 0 ], [] ]);

      store.dispatch({ type: '' });
      expect(spy.lastCall.args).to.deep.equal([ [ 0, 1 ], [ 0 ] ]);
    });

    describe('watching deep paths', () => {
      function runTest(pathA, pathB) {
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

        observable.observe(pathA, barSpy);
        observable.observe(pathB, bazSpy);

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
      }

      it('should observe subproperties when given a selector string', () => {
        runTest('foo.bar', 'foo.baz');
      });

      it('should observe subproperties when given a path as an array', () => {
        runTest(['foo', 'bar'], [ 'foo', 'baz' ]);
      });
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

    it('should return an observer object', () => {
      let store = createStore((state) => state),
          observable = storeToObserver(store),
          observer = observable.observe('', () => {});

      expect(observer.unobserve).to.be.a('function');
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

  describe('dataIsValid', () => {
    it('should deny empty objects', () => {
      expect(dataIsValid({})).to.be.false;
    });

    it('should deny null or undefined objects', () => {
      expect(dataIsValid()).to.be.false;
      expect(dataIsValid(null)).to.be.false;
    });

    it('should accept objects the include the keys \'type\' and \'data\'', () => {
      expect(dataIsValid({ type: 'foo' })).to.be.true;
      expect(dataIsValid({ data: 'foo' })).to.be.true;
      expect(dataIsValid({ type: 'foo', data: 'bar' })).to.be.true;
    });

    it('should deny objects with extra props', () => {
      expect(dataIsValid({ type: 'foo', foo: 'bar' })).to.be.false;
    });
  });

  describe('toQueryParams', () => {
    it('should take a simple key value JS object and turn into query string', () => {
      let asObj = { foo: 'bar', baz: 'qux bang' },
          asString = '?baz=qux%20bang&foo=bar';

      expect(toQueryParams(asObj)).to.equal(asString);
    });

    it('should return an empty string on empty objects', () => {
      expect(toQueryParams({})).to.equal('');
    });

    it('should stringify always in the same order', () => {
      let queryString = '?baz=qux&foo=bar',
          queryObjects = [
            { foo: 'bar', baz: 'qux' },
            { baz: 'qux', foo: 'bar' }
          ];

      queryObjects.forEach((queryObject) => {
        expect(toQueryParams(queryObject)).to.equal(queryString);
      });
    });
  });

  describe('findDataInState', () => {
    let content = {
          [ 'foo' ]: {
            id: 'foo',
            data: {}
          },

          [ 'foo.image' ]: {
            id: 'foo.image',
            type: 'Image',
            data: {}
          },

          [ 'foo.bar' ]: {
            id: 'foo.bar',
            data: {}
          },

          [ 'foo.bar.image' ]: {
            id: 'foo.bar.image',
            type: 'Image',
            data: {}
          },

          [ 'foo.bar.baz' ]: {
            id: 'foo.bar.baz',
            data: {}
          }
        },
        state = { [ DATA_PREFIX ]: content };

    describe('general find', () => {
      it('should return all items', () => {
        let query = {};
        expect(findDataInState(query, state).items).to.deep.have.members(Object.values(content));
      });
    });

    describe('parent scoped find', () => {
      it('should return only those directly below the parent uid', () => {
        let query = { parent: 'foo' };
        expect(findDataInState(query, state).items).to.deep.have.members([
          content['foo.bar'],
          content['foo.image']
        ]);
      });
    });

    describe('ancestor scoped find', () => {
      it('should return only those below parent uid', () => {
        let query = { ancestor: 'foo' };
        expect(findDataInState(query, state).items).to.deep.have.members([
          content['foo.image'],
          content['foo.bar'],
          content['foo.bar.image'],
          content['foo.bar.baz']
        ]);
      });
    });

    describe('type scoped find', () => {
      it('should return only with given type', () => {
        let query = { type: 'Image' };
        expect(findDataInState(query, state).items).to.deep.have.members([
          content['foo.image'],
          content['foo.bar.image']
        ]);
      });
    });

    describe('combined scoped find', () => {
      it('should return only those below parent uid', () => {
        let query = { parent: 'foo', type: 'Image' };
        expect(findDataInState(query, state).items).to.deep.have.members([
          content['foo.image']
        ]);
      });
    });

    describe('content state not ready', () => {
      it('should return items = []', () => {
        expect(findDataInState({}, {})).to.deep.equal({ items: [] });
      });
    });
  });

  describe('matchesQuery', () => {
    it('should match parent queries', () => {
      let childContent = { id: 'foo.bar' },
          notChildContent = { id: 'bar.baz' },
          query = { parent: 'foo' };

      expect(matchesQuery(query, childContent)).to.be.true;
      expect(matchesQuery(query, notChildContent)).to.be.false;
    });

    it('should match ancestor queries', () => {
      let descendant = { id: 'foo.bar.baz' },
          notDescendant = { id: 'bar' },
          query = { ancestor: 'foo' };

      expect(matchesQuery(query, descendant)).to.be.true;
      expect(matchesQuery(query, notDescendant)).to.be.false;
    });

    it('should match type queries', () => {
      let image = { type: 'Image' },
          notImage = { type: 'Text' },
          query = { type: 'Image' };

      expect(matchesQuery(query, image)).to.be.true;
      expect(matchesQuery(query, notImage)).to.be.false;
    });

    it('should match combined queries', () => {
      let imageAndDescendant = { id: 'foo.bar.baz', type: 'Image' },
          justImage = { id: 'foo', type: 'Image' },
          query = { type: 'Image', ancestor: 'foo' };

      expect(matchesQuery(query, imageAndDescendant)).to.be.true;
      expect(matchesQuery(query, justImage)).to.be.false;
    });

    it('should match everything for empty query', () => {
      [{ id: 'foo' }, { id: 'foo.bar' }, { id: 'bar' }]
        .forEach(content => {
          expect(matchesQuery({}, content)).to.be.true;
        });
    });

    it('should return false on null / undefined content', () => {
      expect(matchesQuery({}, null)).to.be.false;
      expect(matchesQuery({})).to.be.false;
    });
  });

  describe('runDispatchAndExpect', () => {
    it('should reject with response if catches action', () => {
      let responseAction = { type: 'foo', response: 'nope' },
          dispatch = () => Promise.reject(responseAction);

      return runDispatchAndExpect(dispatch, {}, responseAction.type)
        .then(
          () => Promise.reject(new Error('Should have thrown')),
          (error) => expect(error).to.equal(responseAction.response)
        );
    });

    it('should reject with error if catches error', () => {
      let error = new Error('Failed'),
          dispatch = () => Promise.reject(error);

      return runDispatchAndExpect(dispatch, {}, 'foo')
        .then(
          () => Promise.reject(new Error('Should have thrown')),
          (rejectedWith) => expect(rejectedWith).to.equal(error)
        );
    });
  });

  describe('makeItemWith', () => {
    it('should combine id and data', () => {
      expect(makeItemWith('foo', { foo: 'bar' })).to.deep.equal({
        id: 'foo',
        foo: 'bar'
      });
    });

    it('should be able to handle null body values', () => {
      expect(makeItemWith('foo', null)).to.deep.equal(null);
    });
  });

  describe('pathToUid', () => {
    let test = (path, uid) => {
      expect(pathToUid(path)).to.equal(uid, `${path} -> ${uid}`);
    };

    it('should ignore trailing and leading slashes', () => {
      [ '/foo/bar', 'foo/bar/', '/foo/bar/', '//foo/bar' ]
        .forEach(path => test(path, 'foo.bar'));
    });

    it('should swap / for .', () => {
      test('foo/bar', 'foo.bar');
    });

    it('should return path if no slashes found, or falsey', () => {
      test('foo', 'foo');
      test(null, null);
    });
  });

  describe('uidToPath', () => {
    let test = (uid, path) => {
      expect(uidToPath(uid)).to.equal(path, `${uid} -> ${path}`);
    };

    it('should convert . to /', () => {
      test('foo.bar.baz', '/foo/bar/baz');
    });

    it('should passthrough falsey values', () => {
      test(null, null);
    });
  });

  describe('itemUidToPath', () => {
    let itemWithUid = makeItemWith('foo.bar.baz', { data: { foo: 'bar' } }),
        itemWithPath = Object.assign({ path: '/foo/bar/baz' }, itemWithUid);

    delete itemWithPath.id;

    it('should take a response item and set it\'s uid to the path equivalent', () => {
      expect(itemUidToPath(itemWithUid)).to.deep.equal(itemWithPath);
    });

    it('should passthrough falsey values', () => {
      [ null, '', false, undefined]
        .forEach(falsey => {
          expect(itemUidToPath(falsey)).to.deep.equal(falsey);
        });
    });
  });

  describe('validatePath', () => {
    it('should ensure there is a leading /', () => {
      expect(validatePath.bind(null, 'foo/bar')).to.throw();
    });

    it('should ensure there is is no repeated /', () => {
      expect(validatePath.bind(null, '/foo//bar')).to.throw();
    });

    it('should ensure path is a string', () => {
      expect(validatePath.bind(null, false)).to.throw();
    });

    it('should ensure path is not empty', () => {
      expect(validatePath.bind(null, '')).to.throw();
    });

    it('should pass valid paths', () => {
      [ '/', '/foo', '/foo/bar' ]
        .forEach(path => {
          expect(validatePath.bind(null, path), path).not.to.throw();
        });
    });
  });

  describe('clone', () => {
    it('should behave the same as JSON.stringify -> parse', () => {
      [
        false,
        true,
        [],
        {},
        null,
        1,
        {
          foo: [
            'bar',
            {
              bar: [1, '', { bar: 'baz' }]
            }
          ]
        },
        [{ foo: 'bar' }, null ]
      ].forEach(testCase => {
        expect(clone(testCase)).to.deep.equal(JSON.parse(JSON.stringify(testCase)));
      });
    });

    it('should also be able to handle undefined', () => {
      expect(clone(undefined)).to.equal(undefined);
    });
  });

  describe('jsonIsEqual', () => {
    it('should check both JSON-like objects are deeply equal', () => {
      let complex,
          shuffledComplex;

      complex = {
        a: 'b',
        b: 1,
        c: null,
        bar: 0.9,
        foo: [ 'a', null, { foo: 'bar' } ],
      };

      shuffledComplex = {
        c: null,
        a: 'b',
        b: 1,
        foo: [ 'a', null, { foo: 'bar' } ],
        bar: 0.9,
      };

      expect(jsonIsEqual(complex, shuffledComplex), 'said same objects were unequal').to.be.true;
      expect(jsonIsEqual(complex, null), 'said object and null were equal').to.be.false;
      expect(jsonIsEqual(complex, { foo: 'bar', baz: [ 0, 'b' ] }), 'said different objects were equal').to.be.false;
    });

    it('should handle arrays', () => {
      expect(jsonIsEqual([], []), 'said two empty arrays are unequal').to.be.true;
      expect(jsonIsEqual(['a'], ['a']), 'said two string arrays are unequal').to.be.true;

      expect(
        jsonIsEqual(
          [ { a: 'b' }, 'b', 1.4 ],
          [ { a: 'b' }, 'b', 1.4 ]
        ),
        'said two arrays with complex are unequal'
      ).to.be.true;

      expect(
        jsonIsEqual(
          [ { a: 'b' }, 'b', 1.4 ],
          [ { a: 'b' }, 1.4, 'b' ]
        ),
        'said two arrays with different order are equal'
      ).to.be.false;
    });

    it('should handle primitives', () => {
      expect(jsonIsEqual(null, 'a')).to.be.false;
      expect(jsonIsEqual(null, null)).to.be.true;

      expect(jsonIsEqual(0, 0)).to.be.true;
      expect(jsonIsEqual(true, true)).to.be.true;
      expect(jsonIsEqual(true, 1)).to.be.false;
      expect(jsonIsEqual(1.5, 2.5)).to.be.false;

      expect(jsonIsEqual('foo', 'bar')).to.be.false;
      expect(jsonIsEqual('', false)).to.be.false;
      expect(jsonIsEqual('foo', 'foo')).to.be.true;
    });

    it('should accept undefined values as extra bonus', () => {
      expect(jsonIsEqual(undefined, undefined)).to.be.true;
      expect(jsonIsEqual(undefined, null)).to.be.false;
    });
  });
});
