import emitterMiddleware, { emitter } from '../../src/middleware/emitter';
import * as types from '../../src/constants/actionTypes';
import configureMockStore from '../__utils__/redux-mock-store';

const mockStore = configureMockStore([ emitterMiddleware ]);

describe('emitterMiddleware', () => {
  it('should transform and emit actions as events', (done) => {
    let type = 'foo',
        actionData = { bar: 'foo' },
        action = Object.assign({}, { type }, actionData),
        store = mockStore({});

    emitter.on(type, (data) => {
      expect(data).to.deep.equal(actionData);
      done();
    });

    store.dispatch(action);
  });
});
