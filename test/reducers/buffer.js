import { verboseReducer } from '../../src/reducers/buffer';
import * as apiActions from '../../src/actions/api';
import * as dataActions from '../../src/actions/data';

const UID = 'some.uid';
const RESPONSE = { id: UID, data: { foo: 'bar' } };
const CHANGED = { id: UID, data: { foo: 'bar', baz: 'qux' } };
const FIND_RESPONSE = { items: [ RESPONSE ] };

describe('state of buffer', () => {
  it('should populate remote data from a `find` call', () => {
    let findSuccessful = apiActions.findDataSuccessful({}, FIND_RESPONSE);
    expect(verboseReducer({}, findSuccessful)[UID].remote).to.deep.equal(RESPONSE);
  });

  it('should handle updates to the Remote API', () => {
    let actions = [
      [ apiActions.getDataSuccessful(UID, RESPONSE), RESPONSE ],
      [ apiActions.setDataSuccessful(UID, null, RESPONSE), RESPONSE ],
      [ apiActions.removeDataSuccessful(UID, RESPONSE), null ]
    ];

    actions.forEach(([ action, remoteState ]) => {
      expect(verboseReducer({}, action)[UID].remote).to.deep.equal(remoteState);
    });
  });

  it('should handle updates to the internal state', () => {
    let actions = [
      [ dataActions.setDataSuccessful(UID, RESPONSE), RESPONSE ],
      [ dataActions.removeDataSuccessful(UID), null ]
    ];

    actions.forEach(([ action, localState ]) => {
      expect(verboseReducer({}, action)[UID].local).to.deep.equal(localState);
    });
  });

  it('should not track local state when persist flag is false', () => {
    let persist = false,
        actions = [
          dataActions.setDataSuccessful(UID, RESPONSE, { persist }),
          dataActions.removeDataSuccessful(UID, { persist })
        ];

    actions.forEach((action) => {
      expect(verboseReducer({}, action)[UID]).to.not.exist;
    });
  });

  it('should remove items with persist: false already in save state if item flagged for deletion', () => {
    let state = verboseReducer({ [ UID ]: {} }, dataActions.removeDataSuccessful(UID, { persist: false }));

    expect(state[UID]).to.not.exist;
  });

  it('should reflect changes on the changed prop', () => {
    let initial = {
          [ UID ]: {
            remote: RESPONSE,
            local: RESPONSE,
            changed: false
          }
        },
        changed = verboseReducer(initial, dataActions.setDataSuccessful(UID, CHANGED)),
        original = verboseReducer(initial, dataActions.setDataSuccessful(UID, RESPONSE));

    expect(changed[UID].changed).to.be.true;
    expect(original[UID].changed).to.be.false;
  });

  it('shouldn\'t pass object references in', () => {
    let data = { foo: 'bar' },
        state = verboseReducer({}, dataActions.setDataSuccessful(UID, data));

    data.foo = 'baz';
    expect(state[UID].local.foo).to.equal('bar');
  });
});
