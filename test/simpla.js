import Simpla from '../src/simpla';
import thunk from 'redux-thunk';
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
            setOption('_useHashTracking', true)
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
        _useHashTracking: false
      },
      actions: [
        setOption('project', project),
        setOption('authEndpoint', AUTH_SERVER),
        setOption('dataEndpoint', dataEndpoint),
        setOption('_useHashTracking', false)
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

  describe('toggleEditing', () => {
    it('should turn editing on when given true as param', () => {
      Simpla._store = mockStore({});
      Simpla.toggleEditing(true);
      expect(Simpla._store.getActions()).to.deep.have.members([{
        type: types.EDIT_ACTIVE
      }]);
    });

    describe('stopEditing', () => {
      Simpla._store = mockStore({});
      Simpla.toggleEditing(false);
      expect(Simpla._store.getActions()).to.deep.have.members([{
        type: types.EDIT_INACTIVE
      }]);
    });
  });
});
