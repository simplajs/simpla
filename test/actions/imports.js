import * as importActions from '../../src/actions/imports';
import * as types from '../../src/constants/actionTypes';
import thunk from 'redux-thunk';
import configureMockStore from '../__utils__/redux-mock-store';

const mockStore = configureMockStore([ thunk ]);

describe('importing elements', () => {
  describe('importElement', () => {
    let dummyLink = {};

    [{
      method: 'onerror',
      type: 'IMPORT_ELEMENT_FAILED',
      message: 'errored'
    }, {
      method: 'onload',
      type: 'IMPORT_ELEMENT_SUCCESSFUL',
      message: 'loaded'
    }].forEach(({ method, type, message }) => {

      it(`fires ${type} when ${message}`, () => {
        const store = mockStore({ _imports: {} }),
              href = 'foo';

        sinon.stub(document, 'createElement')
          .withArgs('link')
          .returns(dummyLink);

        sinon.stub(document.head, 'appendChild', () => {
          expect(dummyLink.href).to.equal(href);
          dummyLink[method]();
        });

        let expectedActions = [{
          type: types.IMPORT_ELEMENT,
          href
        }, {
          type: types[type],
          href
        }];

        return store.dispatch(importActions.importElement(href))
          .then(() => {
            document.createElement.restore();
            document.head.appendChild.restore();
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

    });
  });
});
