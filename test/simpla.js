import Simpla from '../src/simpla';
import thunk from 'redux-thunk';
import configureMockStore from './__utils__/redux-mock-store';
import { AUTH_SERVER } from '../src/constants/options';
import { setOption } from '../src/actions/options';
import * as types from '../src/constants/actionTypes';

const mockStore = configureMockStore([ thunk ]);

describe('Simpla', () => {
  it('should export a function', () => {
    expect(Simpla).to.be.a.function;
  });

  describe('initilization', () => {
    const project = 'project-id',
          dataEndpoint = `${AUTH_SERVER}/projects/${project}/content`,
          standardActions = [
            setOption('project', project),
            setOption('authEndpoint', AUTH_SERVER),
            setOption('dataEndpoint', dataEndpoint),
            setOption('hashTracking', true)
          ]

    let possibilities = [{
      caseName: 'only project key is given',
      options: project,
      actions: [
        ...standardActions
      ]
    }, {
      caseName: 'disable using hash',
      options: {
        project,
        hashTracking: false
      },
      actions: [
        setOption('project', project),
        setOption('authEndpoint', AUTH_SERVER),
        setOption('dataEndpoint', dataEndpoint),
        setOption('hashTracking', false)
      ]
    }, {
      caseName: 'set custom endpoints',
      options: {
        project,
        hashTracking: false,
        _dataEndpoint: 'foo-data',
        _authEndpoint: 'foo-auth'
      },
      actions: [
        setOption('project', project),
        setOption('authEndpoint', 'foo-auth'),
        setOption('dataEndpoint', 'foo-data'),
        setOption('hashTracking', false)
      ]
    }];

    possibilities.forEach(({ options, actions, caseName }) => {
      it(`should dispatch the correct actions when ${caseName}`, () => {
        Simpla._store = mockStore({});

        Simpla(options);

        // Tests for members as we don't care what order the initializations happen
        expect(Simpla._store.getActions()).to.deep.includes.members(actions);
      });
    });

    it('should return itself after init', () => {
      let response = Simpla('');
      expect(response).to.equal(Simpla);
    });
  });

  describe('editable', () => {
    it('should turn editable on when given true as param', () => {
      Simpla._store = mockStore({});
      Simpla.editable(true);
      expect(Simpla._store.getActions()).to.deep.have.members([{
        type: types.EDIT_ACTIVE
      }]);
    });

    describe('stopEditable', () => {
      Simpla._store = mockStore({});
      Simpla.editable(false);
      expect(Simpla._store.getActions()).to.deep.have.members([{
        type: types.EDIT_INACTIVE
      }]);
    });
  });

  describe('state methods', () => {
    const ROOT = {
      foo: {
        bar: 'baz',
      },
      bar: {
        qux: 'baz'
      }
    };

    beforeEach(() => {
      Simpla._store = mockStore(ROOT);
    })

    describe('getState', () => {
      it('should return root state if no argument given', () => {
        expect(Simpla.getState()).to.equal(ROOT);
      });

      it('should return a substate if given a path', () => {
        expect(Simpla.getState('foo')).to.equal(ROOT.foo);
      });

      it('should return undefined if path leads to undefined', () => {
        expect(Simpla.getState('foo.bing')).to.be.undefined;
      });
    });

    describe('observeState', () => {
      let spy,
          unobserve;

      beforeEach(() => {
        spy = sinon.spy();
        delete Simpla._store;
        Simpla.editable(false);
      });

      afterEach(() => {
        unobserve && unobserve();
      });

      it('should be able to observe root tree', () => {
        ({ unobserve } = Simpla.observeState(spy));
        Simpla.editable(true);
        expect(spy.called).to.be.true;
      });

      it('should observe changes to substate if given a path', () => {
        ({ unobserve } = Simpla.observeState('editable', spy));
        Simpla.editable(true);
        expect(spy.called).to.be.true;
        expect(spy.calledWith(true)).to.be.true;
      });
    });
  });

  describe('content methods', () => {
    const foo = { data: { foo: '' } },
          fooBar = { data: { foo: 'bar' } },
          fooBaz = { data: { foo: 'baz' } };

    beforeEach(() => {
      return Simpla.remove('foo')
        .then(() => Promise.all([
          Simpla.set('foo', foo),
          Simpla.set('foo.bar', fooBar),
          Simpla.set('foo.baz', fooBaz)
        ]));
    });

    it('should be able to get leaf node', () => {
      return Simpla.get('foo.bar')
        .then(data => {
          expect(data).to.deep.equal(fooBar);
        });
    });

    it('should be able to remove data', () => {
      return Simpla.get('foo.bar')
        .then(response => {
          expect(response).to.not.be.null;
        })
        .then(() => Simpla.remove('foo.bar'))
        .then(() => Simpla.get('foo.bar'))
        .then(response => {
          expect(response).to.be.null;
        });
    });

    describe('observing', () => {
      let spy,
          unobserve;

      beforeEach(() => {
        spy = sinon.spy();
        delete Simpla._store;
        ({ unobserve } = Simpla.observe('foo.bar', spy));
      });

      afterEach(() => {
        unobserve && unobserve();
      });

      it('should be able to observe data', () => {
        return Simpla.set('foo.bar', { data: { foo: 'bloop' } })
          .then(() => Simpla.get('foo.bar'))
          .then((data) => {
            expect(spy.lastCall.calledWith(data)).to.be.true;
          });
      });

      it('should be able to observe children additions / changes changes', () => {
        return Simpla.set('foo.bar.baz', { data: { foo: 'barbaz' } })
          .then(() => Simpla.get('foo.bar'))
          .then((data) => {
            expect(spy.lastCall.calledWith(data)).to.be.true;
          })
          .then(() => Simpla.set('foo.bar.baz', { data: { foo: 'barbing' } }))
          .then(() => Simpla.get('foo.bar'))
          .then((data) => {
            expect(spy.lastCall.calledWith(data)).to.be.true;
          });
      });

      /**
       * This is currently disabled as with the new data structure, it may not
       *  make much sense to have Simpla.get('.') and as such isn't yet implemented
       * What should Simpla.get('.') even return?
       */
      xit('should be able to observe the root by not passing anything', () => {
        let rootSpy = sinon.spy(),
            rootUnobserve;

        rootUnobserve = Simpla.observe(spy);

        return Simpla.set('foo', { data: { foo: 'foo!!'} })
          .then(() => Simpla.get('.'))
          .then(data => {
            expect(rootSpy.lastCall.calledWith(data)).to.be.true;
          });
      });
    });
  });
});
