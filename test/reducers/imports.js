import importsReducer from '../../src/reducers/imports';
import * as types from '../../src/constants/actionTypes';

describe('importsReducer', () => {
  let href = 'foo',
      makeExpectation = (status) => ({ [ href ]: { status } });

  [{
    type: 'IMPORT_ELEMENT',
    status: 'loading'
  }, {
    type: 'IMPORT_ELEMENT_SUCCESSFUL',
    status: 'loaded'
  }, {
    type: 'IMPORT_ELEMENT_FAILED',
    status: 'failed'
  }].forEach(({ type, status }) => {
    describe(`handling ${type}`, () => {
      it(`should set that href status to ${status}`, () => {
        expect(importsReducer({}, { type: types[type], href })).to.deep.equal(makeExpectation(status));
      });
    });
  });
});
