import { verboseReducer } from '../../src/reducers/buffer';
import * as apiActions from '../../src/actions/api';
import * as dataActions from '../../src/actions/data';

const PATH = '/some/path';
const RESPONSE = { path: PATH, data: { foo: 'bar' } };
const CHANGED = { path: PATH, data: { foo: 'bar', baz: 'qux' } };
const FIND_RESPONSE = { items: [ RESPONSE ] };

describe('state of buffer', () => {
  it('should populate remote data from a `find` call', () => {
    let findSuccessful = apiActions.findDataSuccessful({}, FIND_RESPONSE);
    expect(verboseReducer({}, findSuccessful)[PATH].remote).to.deep.equal(RESPONSE);
  });

  it('should handle updates to the Remote API', () => {
    let actions = [
      [ apiActions.getDataSuccessful(PATH, RESPONSE), RESPONSE ],
      [ apiActions.setDataSuccessful(PATH, null, RESPONSE), RESPONSE ],
      [ apiActions.removeDataSuccessful(PATH, RESPONSE), null ]
    ];

    actions.forEach(([ action, remoteState ]) => {
      expect(verboseReducer({}, action)[PATH].remote).to.deep.equal(remoteState);
    });
  });

  it('should handle updates to the internal state', () => {
    let actions = [
      [ dataActions.setDataSuccessful(PATH, RESPONSE), RESPONSE ],
      [ dataActions.removeDataSuccessful(PATH), null ]
    ];

    actions.forEach(([ action, localState ]) => {
      expect(verboseReducer({}, action)[PATH].local).to.deep.equal(localState);
    });
  });

  it('should not track local state when persist flag is false', () => {
    let persist = false,
        actions = [
          dataActions.setDataSuccessful(PATH, RESPONSE, { persist }),
          dataActions.removeDataSuccessful(PATH, { persist })
        ];

    actions.forEach((action) => {
      expect(verboseReducer({}, action)[PATH]).to.not.exist;
    });
  });

  it('should remove items with persist: false already in save state if item flagged for deletion', () => {
    let state = verboseReducer({ [ PATH ]: {} }, dataActions.removeDataSuccessful(PATH, { persist: false }));

    expect(state[PATH]).to.not.exist;
  });

  it('should reflect changes on the changed prop', () => {
    let initial = {
          [ PATH ]: {
            remote: RESPONSE,
            local: RESPONSE,
            changed: false
          }
        },
        changed = verboseReducer(initial, dataActions.setDataSuccessful(PATH, CHANGED)),
        original = verboseReducer(initial, dataActions.setDataSuccessful(PATH, RESPONSE));

    expect(changed[PATH].changed).to.be.true;
    expect(original[PATH].changed).to.be.false;
  });

  it('shouldn\'t pass object references in', () => {
    let data = { foo: 'bar' },
        state = verboseReducer({}, dataActions.setDataSuccessful(PATH, data));

    data.foo = 'baz';
    expect(state[PATH].local.foo).to.equal('bar');
  });
});
