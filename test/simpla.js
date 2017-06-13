import Simpla from '../src/simpla';
import thunk from 'redux-thunk';
import configureMockStore from './__utils__/redux-mock-store';
import { AUTH_SERVER } from '../src/constants/options';
import { PUBLIC_STATE_MAP } from '../src/constants/state';
import { setOption } from '../src/actions/options';
import * as types from '../src/constants/actionTypes';
import fetchMock from 'fetch-mock';
import { makeItemWith, itemUidToPath, pathToUid } from '../src/utils/helpers';

const PUBLIC_STATES = Object.keys(PUBLIC_STATE_MAP);
const mockStore = configureMockStore([ thunk ]);

const MOCK_DATA = {
  [ '/foo' ]: { data: randomData() },
  [ '/foo/bar' ]: { data: randomData() },
  [ '/foo/bar/baz' ]: { data: randomData() },
  [ '/foo/baz' ]: { data: randomData() },
  [ '/foo/image' ]: { type: 'Image', data: randomData() },
  [ '/foo/bar/image' ]: { type: 'Image', data: randomData() }
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

function randomData() {
  return {
    foo: 'bar' + Math.random().toString(36).substr(5)
  };
}

function findItemWithPath(path) {
  return ({ items }) => items.find(item => item.path === path);
}

describe('Simpla', () => {
  const project = 'project-id',
        dataEndpoint = `${AUTH_SERVER}/projects/${project}/content`;

  beforeEach(() => {
    // TODO: This should be moved to a proper mock of Simpla's server.
    Object.keys(MOCK_DATA).forEach(path => {
      fetchMock
        .mock(`${dataEndpoint}/${pathToUid(path)}`, 'GET', resultsForGet(path))
        .mock(`${dataEndpoint}/?parent=${pathToUid(path)}`, 'GET', resultsForFind(path))
        .mock((url) => url.indexOf(dataEndpoint) === 0, 'GET', (url) => {
          if (url === `${dataEndpoint}` || url === `${dataEndpoint}/` || url.indexOf('?') !== -1) {
            return { items: [] };
          }

          return { status: 204 };
        });
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
        setOption('dataEndpoint', dataEndpoint)
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
      config: {
        bar: 'baz',
      },
      _data: {
        qux: 'baz'
      }
    };

    beforeEach(() => {
      Simpla._store = mockStore(ROOT);
    })

    describe('getState', () => {
      it('should return root state if no argument given', () => {
        let response = Simpla.getState();

        Object.keys(response)
          .forEach(key => {
            expect(response[key]).to.deep.equal(ROOT[key]);
          });
      });

      it('should return a substate if given a path', () => {
        expect(Simpla.getState('config')).to.equal(ROOT.config);
      });

      it('should return undefined if state is not whitelisted', () => {
        let privateSubState = '_data';
        expect(Simpla.getState(privateSubState)).to.be.undefined;
      });

      it('should only return public substates', () => {
        let response = Simpla.getState();
        expect(PUBLIC_STATES).to.include.members(Object.keys(response))
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
      return Object.keys(MOCK_DATA).reduce(
        (ops, path) => ops.then(() => Simpla.set(path, MOCK_DATA[path])),
        Simpla.remove('/foo')
      );
    });

    describe('get', () => {
      it('should be able to get leaf node', () => {
        return Simpla.get('/foo/bar')
          .then(data => {
            expect(data).to.deep.equal(makeAndPathItem('foo.bar', MOCK_DATA['/foo/bar']));
          });
      });

      it('should return new data for get', () => {
        let original;
        return Simpla.set('/foo', { data: randomData() })
          .then(() => Simpla.get('/foo'))
          .then(item => {
            original = _.cloneDeep(item.data);
            item.data.bar = 'baz'
          })
          .then(() => Simpla.get('/foo'))
          .then(item => {
            expect(item.data).to.deep.equal(original);
          });
      });
    });

    describe('remove', () => {
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
    });

    describe('set', () => {
      it('should set patch data, not replace', () => {
        let firstSet = { type: 'Foo', data: { foo: 'bar' } },
            secondSet = { data: { bar: 'foo' } };

        return Simpla.set('/foo', firstSet)
          .then(() => Simpla.set('/foo', secondSet))
          .then(() => Simpla.get('/foo'))
          .then(response => {
            expect(response).to.deep.equal(Object.assign({ path: '/foo' }, firstSet, secondSet));
          });
      });

      it('shoud store data as a clone', () => {
        let data = randomData(),
            original = _.cloneDeep(data);

        return Simpla.set('/foo', { data })
          .then(() => {
            data.bar = 'baz';
          })
          .then(() => Simpla.get('/foo'))
          .then(item => {
            expect(item.data).to.deep.equal(original);
          });
      });

      it('should not return a reference', () => {
        let data = randomData(),
            original = _.cloneDeep(data);

        return Simpla.set('/foo', { data })
          .then(item => {
            item.data.baz = 'bar';
          })
          .then(() => Simpla.get('/foo'))
          .then((item) => {
            expect(item.data).to.deep.equal(original);
          })
      });
    });

    describe('find', () => {
      it('should return new data after a find', () => {
        let path = '/foo/bar',
            data = randomData(),
            original = _.cloneDeep(data),
            findItem = findItemWithPath(path);

        return Simpla.set(path, { data })
          .then(() => Simpla.find({ parent: '/foo' }))
          .then(findItem)
          .then((item) => item.data.foo = 'bar')
          .then(() => {
            return Promise.all([
              Simpla.find({ parent: '/foo' }).then(findItem),
              Simpla.get(path)
            ])
          })
          .then(([ fromFind, fromGet ]) => {
            expect(fromFind.data, 'affected find results').to.deep.equal(original);
            expect(fromGet.data, 'affected get results').to.deep.equal(original);
          });
      });

      it('should be able to filter by parent', () => {
        let children = [ '/foo/bar', '/foo/baz', '/foo/image' ],
            parent = '/foo';

        return Promise.all([
            Simpla.find({ parent }),
            ...children.map(path => Simpla.get(path))
          ])
          .then(([ results, ...expected ]) => {
            expect(results.items).to.deep.have.members(expected);
          });
      });

      it('should be able to filter by ancestor', () => {
        let ancestor = '/foo/',
            descendants = [ '/foo/bar/baz', '/foo/bar', '/foo/baz/' ];

        return Promise.all([
            Simpla.find({ ancestor }),
            ...descendants.map(path => Simpla.get(path))
          ])
          .then(([ results, ...expected ]) => {
            expect(results.items).to.deep.have.members(expected);
          });
      });

      it('should be able to filter by type', () => {
        let type = 'Image',
            matches = [ '/foo/image', '/foo/bar/image' ];

        return Promise.all([
            Simpla.find({ type }),
            ...matches.map(path => Simpla.get(path))
          ])
          .then(([ results, ...expected ]) => {
            expect(results.items).to.deep.have.members(expected);
          });
      });

      it('should be able to combine filters', () => {
        let type = 'Image',
            parent = '/foo',
            matches = [ '/foo/image' ];

        return Promise.all([
            Simpla.find({ type }),
            ...matches.map(path => Simpla.get(path))
          ])
          .then(([ results, ...expected ]) => {
            expect(results.items).to.deep.have.members(expected);
          });
      });
    });

    describe('observing', () => {
      let spy,
          observers = [];

      beforeEach(() => {
        spy = sinon.spy();
        Simpla.constructor.call(Simpla);
        Simpla.init(project);
        observers.push(Simpla.observe('/foo/bar', spy));
      });

      afterEach(() => {
        observers.forEach(observer => observer.unobserve());
        observers = [];
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

      it('should not return references to state', () => {
        let data = randomData(),
            original = _.cloneDeep(data),
            waitForObserver;

        waitForObserver = new Promise(resolve => {
          let observer = Simpla.observe('/foo', (item) => {
            item.data.foo = 'baz';
            resolve();
          });

          // For cleanup
          observers.push(observer);
        });

        return Simpla.set('/foo', { data })
          .then(waitForObserver)
          .then(() => Simpla.get('/foo'))
          .then(item => {
            expect(item.data).to.deep.equal(original);
          });
      });

      describe('observing queries', () => {
        let spy,
            observers = [];

        beforeEach(() => {
          spy = sinon.spy();
          Simpla.constructor.call(Simpla);
          Simpla.init(project);
          observers.push(Simpla.observeQuery({ parent: '/foo' }, spy));
        });

        afterEach(() => {
          observers.forEach(observer => observer.unobserve());
          observers = [];
          return Simpla.remove('/foo');
        });

        it('should run callback for parent query when children are set', () => {
          return Simpla.set('/foo/bar', MOCK_DATA['/foo/bar'])
            .then(() => {
              expect(spy.called, 'Observer should have been called').to.be.true;
            });
        });

        it('should not run callback for parent query when non-child is set', () => {
          return Simpla.set('/foo', MOCK_DATA['/foo'])
            .then(() => {
              expect(spy.called, 'Observer should not have been called').not.to.be.true;
            });
        });

        it('should run once after a find query', () => {
          return Simpla.find({ parent: '/foo' })
            .then(() => {
              expect(spy.callCount, 'Observer should have been called once').to.equal(1);
            });
        });

        it('should be called with equivalent of find method', () => {
          return Simpla.set('/foo/bar', MOCK_DATA['/foo/bar'])
            .then(() => {
              expect(spy.getCall(0).args[0]).to.deep.equal({
                items: [ makeAndPathItem('foo.bar', MOCK_DATA['/foo/bar']) ]
              })
            });
        });

        it('should not return a reference to the state', () => {
          let path = '/foo/bar',
              query = { parent: '/foo' },
              data = randomData(),
              original = _.cloneDeep(data),
              waitForObserver,
              findItem = findItemWithPath(path);

          waitForObserver = new Promise(resolve => {
            let observer = Simpla.observeQuery(query, (results) => {
              findItem(results).data.foo = 'bar';
              resolve();
            });

            observers.push(observer);
          });

          return Simpla.set(path, { data })
            .then(waitForObserver)
            .then(() => Simpla.find(query))
            .then(findItem)
            .then(item => {
              expect(item.data).to.deep.equal(original);
            });
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

    describe('buffer', () => {
      it('should contain the items stored in Simplas buffer', () => {
        let pathA = '/somepath',
            pathB = '/another/path';

        return Promise.resolve()
          .then(() => Simpla.get(pathA))
          .then(() => Simpla.get(pathB))
          .then(() => Simpla.set(pathB, { data: {} }))
          .then(() => {
            let buffer = Simpla.getState('buffer'),
                itemAtPathA = buffer[pathA],
                itemAtPathB = buffer[pathB];

            expect(itemAtPathA, `${pathA} is in the buffer`).to.not.be.null;
            expect(itemAtPathB, `${pathB} is in the buffer`).to.not.be.null;

            expect(itemAtPathA.modified, `${pathA} hasn't been changed`).to.be.false;
            expect(itemAtPathB.modified, `${pathB} has been changed`).to.be.true;
          });
      });

      it('should be able to observe the buffer', () => {
        let callback = sinon.spy();
        Simpla.observeState('buffer', callback);

        return Simpla.set('/some/path', { data: {} })
          .then(() => {
            expect(callback.called).to.be.true;
            expect(callback.lastCall.args[0]['/some/path'].modified).to.be.true;
          });
      });
    });
  });
});
