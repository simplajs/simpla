import Simpla from '../src/simpla';
import thunk from 'redux-thunk';
import rootReducer from '../src/reducers/';
import configureMockStore from './__utils__/redux-mock-store';
import { ELEMENTS, BASE_PATH, AUTH_SERVER } from '../src/constants/options';
import { setOption } from '../src/actions/options';
import * as types from '../src/constants/actionTypes';

const mockStore = configureMockStore([ thunk ]);

describe('Simpla', () => {
  it('should export a function', () => {
    expect(Simpla).to.be.a.function;
  });

  describe('initilization', () => {
    let mapElementsAndBaseToActions = (elements, base = '') => {
      return elements.map(element => {
        let href = `${base}${element}`,
            linkHref = (() => {
              let link = document.createElement('link');
              link.href = href;
              return link.href;
            })();

        return {
          type: types.IMPORT_ELEMENT,
          href: linkHref
        };
      });
    };

    const project = 'project-id',
          dataEndpoint = `${AUTH_SERVER}/projects/${project}/items`,
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
        ...standardActions,
        ...mapElementsAndBaseToActions(ELEMENTS, BASE_PATH)
      ]
    }, {
      caseName: 'elements is given falsey value',
      options: {
        project,
        elements: null
      },
      actions: [
        ...standardActions
      ]
    }, {
      caseName: 'elements prop is just an array',
      options: {
        project,
        elements: [
          'foo',
          'bar'
        ]
      },
      actions: [
        ...standardActions,
        ...mapElementsAndBaseToActions(['foo', 'bar'])
      ]
    }, {
      caseName: 'elements is both paths and base',
      options: {
        project,
        elements: {
          paths: [ 'b', 'b/c' ],
          base: 'a/'
        }
      },
      actions: [
        ...standardActions,
        ...mapElementsAndBaseToActions([ 'b', 'b/c' ], 'a/')
      ]
    }, {
      caseName: 'elements is just base',
      options: {
        project,
        elements: {
          base: 'a/'
        }
      },
      actions: [
        ...standardActions,
        ...mapElementsAndBaseToActions(ELEMENTS, 'a/')
      ]
    }, {
      caseName: 'disable using hash',
      options: {
        project,
        elements: null,
        hashTracking: false
      },
      actions: [
        setOption('project', project),
        setOption('authEndpoint', AUTH_SERVER),
        setOption('dataEndpoint', dataEndpoint),
        setOption('hashTracking', false)
      ]
    }];

    before(() => {
      if (document.head.appendChild.restore) {
        return;
      }

      sinon.stub(document.head, 'appendChild', (link) => {
        if (link.onload) {
          link.onload();
        }
      });
    });

    possibilities.forEach(({ options, actions, caseName }) => {
      it(`should dispatch the correct actions when ${caseName}`, () => {
        Simpla._store = mockStore({ _imports: {} });

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

  describe('content methods', () => {
    const foo = { data: { foo: '' } },
          fooBar = { data: { foo: 'bar' } },
          fooBarWithKids = Object.assign({}, fooBar, { children: [] }),
          fooBaz = { data: { foo: 'baz' } },
          fooBazWithKids = Object.assign({}, fooBaz, { children: [] }),
          fooWithKids = Object.assign({}, foo, {
            children: [ fooBarWithKids, fooBazWithKids ]
          });

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
          expect(data).to.deep.equal(fooBarWithKids);
        });
    });

    it('should be able to get the children', () => {
      return Simpla.get('foo')
        .then(response => {
          console.log(response);
          expect(response).to.deep.equal(fooWithKids);
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

    it('should be able to observe data', () => {
      let spy = sinon.spy();

      Simpla.observe('foo.bar', spy);

      return Simpla.set('foo.bar', { data: { foo: 'bloop' } })
        .then(() => {
          expect(spy.calledWith({ data: { foo: 'bloop' }, children: [] })).to.be.true;
        });
    });

    xit('should be able to observe children data changes', () => {

    });

    xit('should be able to observe additions / removals to children', () => {

    });
  });
});
