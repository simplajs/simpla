import Simpla from '../src/simpla';
import thunk from 'redux-thunk';
import configureMockStore from './__utils__/redux-mock-store';
import { AUTH_SERVER } from '../src/constants/options';
import { setOption } from '../src/actions/options';
import * as types from '../src/constants/actionTypes';
import fetchMock from 'fetch-mock';
import { makeItemWith, itemUidToPath, pathToUid } from '../src/utils/helpers';

const mockStore = configureMockStore([ thunk ]);

const MOCK_DATA = {
  [ '/foo' ]: {
    data: 'foo'
  },
  [ '/foo/bar' ]: {
    data: {
      foo:'bar'
    }
  },
  [ '/foo/bar/baz' ]: {
    data: {
      foo: {
        bar: 'baz'
      }
    }
  }
}

// TODO: This should be moved to a proper mock of Simpla's server
function resultsForGet(path) {
  return Object.assign({}, MOCK_DATA[path], { id: pathToUid(path) });
}

function resultsForFind(parent) {
  let items = Object.keys(MOCK_DATA)
    .filter(path => path !== parent && path.indexOf(parent) === 0)
    .map(path => resultsForGet(path));

  return {
    items
  };
}

function makeAndPathItem(uid, data) {
  return itemUidToPath(makeItemWith(uid, data));
}

describe('Simpla', () => {
  const project = 'project-id',
        dataEndpoint = `${AUTH_SERVER}/projects/${project}/content`;

  beforeEach(() => {
    // TODO: This should be moved to a proper mock of Simpla's server.
    Object.keys(MOCK_DATA).forEach(path => {
      fetchMock
        .mock(`${dataEndpoint}/${pathToUid(path)}`, 'GET', resultsForGet(path))
        .mock(`${dataEndpoint}/?parent=${pathToUid(path)}`, 'GET', resultsForFind(path));
    });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('initilization', () => {
    it('should set right options when pass initial project id', () => {
      Simpla._store = mockStore({});

      Simpla.init(project);

      // Tests for members as we don't care what order the initializations happen
      expect(Simpla._store.getActions()).to.deep.equal([
        setOption('project', project),
        setOption('authEndpoint', AUTH_SERVER),
        setOption('dataEndpoint', dataEndpoint),
        setOption('hashTracking', true)
      ]);
    });

    it('should return undefined after init', () => {
      let response = Simpla.init(project);
      expect(response).to.be.undefined;
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
        // Reset Simpla
        Simpla.constructor.call(Simpla);
        Simpla.init(project);
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
    beforeEach(() => {
      return Simpla.remove('/foo')
        .then(() => Promise.all([
          Simpla.set('/foo', MOCK_DATA['/foo']),
          Simpla.set('/foo/bar', MOCK_DATA['/foo/bar']),
          Simpla.set('/foo/baz', MOCK_DATA['/foo/bar/baz'])
        ]));
    });

    it('should be able to get leaf node', () => {
      return Simpla.get('/foo/bar')
        .then(data => {
          expect(data).to.deep.equal(makeAndPathItem('foo.bar', MOCK_DATA['/foo/bar']));
        });
    });

    it('should be able to remove data', () => {
      return Simpla.get('/foo/bar')
        .then(response => {
          expect(response).to.not.be.null;
        })
        .then(() => Simpla.remove('/foo/bar'))
        .then(() => Simpla.get('/foo/bar'))
        .then(response => {
          expect(response).to.be.null;
        });
    });

    describe('observing', () => {
      let spy,
          unobserve;

      beforeEach(() => {
        spy = sinon.spy();
        Simpla.constructor.call(Simpla);
        Simpla.init(project);
        ({ unobserve } = Simpla.observe('/foo/bar', spy));
      });

      afterEach(() => {
        unobserve && unobserve();
      });

      it('should be able to observe data', () => {
        return Simpla.set('/foo/bar', MOCK_DATA['/foo/bar'])
          .then(() => Simpla.get('/foo/bar'))
          .then((data) => {
            expect(spy.callCount, 'Called once').to.equal(1);
            expect(spy.lastCall.calledWith(data), 'Called with correct data').to.be.true;
          });
      });

      it('should not be able to observe children additions / changes', () => {
        // Without Promise.resolve() lines, it fails - this suggests that the observer
        //  has been added to the microtask queue...
        return Simpla.set('/foo/bar', MOCK_DATA['/foo/bar'])
          .then(() => Promise.resolve())
          .then(() => Simpla.set('/foo/bar/baz', MOCK_DATA['/foo/bar/baz']))
          .then(() => Promise.resolve())
          .then(() => {
            expect(spy.callCount, 'Did not get called after child added').to.equal(1)
          })
          .then(() => Simpla.set('/foo/bar/baz', MOCK_DATA['/foo/bar/baz']))
          .then(() => Promise.resolve())
          .then(() => {
            expect(spy.callCount, 'Did not get called after child changed').to.equal(1)
          });
      });
    });

    describe('paths', () => {
      const VALID_PATH = '/foo/bar',
            INVALID_PATH = 'foo/bar';

      beforeEach(() => {
        return Simpla.remove(VALID_PATH);
      });

      [{
        description: (path) => `Get ${path}`,
        fn: (path) => Simpla.get(path)
      }, {
        description: (path) => `Set ${path}`,
        fn: (path) => Simpla.set(path, MOCK_DATA[VALID_PATH])
      }, {
        description: (path) => `Remove ${path}`,
        fn: (path) => Simpla.remove(path)
      }, {
        description: (path) => `Find for parent ${path}`,
        fn: (path) => Simpla.find({ parent: path })
      }, {
        description: (path) => `Observe ${path}`,
        fn: (path) => Simpla.observe(path, () => {})
      }].forEach(({ fn, description }) => {
        let successDescription = description(VALID_PATH),
            failDescription = description(INVALID_PATH);

        it(`${successDescription} should succeed`, () => {
          return Promise.resolve()
            .then(() => fn(VALID_PATH))
            .then(
              () => {},
              (err) => Promise.reject(
                new Error(
                  `${successDescription} should have resolved, but it was rejected with ${err.message}`,
                )
              )
            );
        });

        it(`${failDescription} should fail`, () => {
          return Promise.resolve()
            .then(() => fn(INVALID_PATH))
            .then(
              () => Promise.reject(
                new Error(
                  `${failDescription}, should have rejected, but it resolved`
                )
              ),
              () => {}
            );
        });
      });
    });
  });
});
