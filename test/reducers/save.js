import saveReducer from '../../src/reducers/save';
import * as apiActions from '../../src/actions/api';
import * as dataActions from '../../src/actions/data';

const UID = 'some.uid';
const RESPONSE = { foo: 'bar' };
const CHANGED = { foo: 'bar', bar: 'baz' };

describe('state of save', () => {
  it('should handle updates to the Remote API', () => {
    let actions = [
          [ apiActions.getDataSuccessful(UID, RESPONSE), RESPONSE ],
          [ apiActions.setDataSuccessful(UID, RESPONSE), RESPONSE ],
          [ apiActions.removeDataSuccessful(UID), null ]
        ];

    actions.forEach(([ action, remoteState ]) => {
      expect(saveReducer({}, action)[UID].remote).to.deep.equal(remoteState);
    });
  });

  it('should handle updates to the inernal state', () => {
    let actions = [
          [ dataActions.setDataSuccessful(UID, RESPONSE), RESPONSE ],
          [ dataActions.removeDataSuccessful(UID), null ]
        ];

    actions.forEach(([ action, localState ]) => {
      expect(saveReducer({}, action)[UID].local).to.deep.equal(localState);
    });
  });

  it('should reflect changes on the changed prop', () => {
    let initial = {
          [ UID ]: {
            remote: RESPONSE,
            local: RESPONSE,
            changed: false
          }
        },
        changed = saveReducer(initial, dataActions.setDataSuccessful(UID, CHANGED)),
        original = saveReducer(initial, dataActions.setDataSuccessful(UID, RESPONSE));

    expect(changed[UID].changed).to.be.true;
    expect(original[UID].changed).to.be.false;
  });

  it(`shouldn't pass object references in`, () => {
    let data = { foo: 'bar' },
        state = saveReducer({}, dataActions.setDataSuccessful(UID, data));

    data.foo = 'baz';
    expect(state[UID].local.foo).to.equal('bar');
  });
});
