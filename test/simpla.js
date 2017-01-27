import Simpla from '../src/simpla';
import thunk from 'redux-thunk';
import configureMockStore from './__utils__/redux-mock-store';
import { AUTH_SERVER } from '../src/constants/options';
import { setOption } from '../src/actions/options';
import * as types from '../src/constants/actionTypes';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([ thunk ]);

const MOCK_DATA = {
  [ 'foo' ]: {
    data: 'foo'
  },
  [ 'foo.bar' ]: {
    data: {
      foo:'bar'
    }
  },
  [ 'foo.bar.baz' ]: {
    data: {
      foo: {
        bar: 'baz'
      }
    }
  }
}

describe('Simpla', () => {
  const project = 'project-id',
        dataEndpoint = `${AUTH_SERVER}/projects/${project}/content`;

  beforeEach(() => {
    Object.keys(MOCK_DATA).forEach(uid => {
      fetchMock
        .mock(`${dataEndpoint}/${uid}`, 'GET', MOCK_DATA[uid]);
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
      return Simpla.remove('foo')
        .then(() => Promise.all([
          Simpla.set('foo', MOCK_DATA['foo']),
          Simpla.set('foo.bar', MOCK_DATA['foo.bar']),
          Simpla.set('foo.baz', MOCK_DATA['foo.bar.baz'])
        ]));
    });

    it('should be able to get leaf node', () => {
      return Simpla.get('foo.bar')
        .then(data => {
          expect(data).to.deep.equal(MOCK_DATA['foo.bar']);
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
        Simpla.constructor.call(Simpla);
        Simpla.init(project);
        ({ unobserve } = Simpla.observe('foo.bar', spy));
      });

      afterEach(() => {
        unobserve && unobserve();
      });

      it('should be able to observe data', () => {
        return Simpla.set('foo.bar', MOCK_DATA['foo.bar'])
          .then(() => Simpla.get('foo.bar'))
          .then((data) => {
            expect(spy.lastCall.calledWith(data)).to.be.true;
          });
      });

      it('should be able to observe children additions / changes changes', () => {
        return Simpla.set('foo.bar.baz', MOCK_DATA['foo.bar.baz'])
          .then(() => Simpla.get('foo.bar'))
          .then((data) => {
            expect(spy.lastCall.calledWith(data)).to.be.true;
          })
          .then(() => Simpla.set('foo.bar.baz', MOCK_DATA['foo.bar.baz']))
          .then(() => Simpla.get('foo.bar'))
          .then((data) => {
            expect(spy.lastCall.calledWith(data)).to.be.true;
          });
      });
    });
  });
});
