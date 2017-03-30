import {
  FIND_DATA_FROM_API_SUCCESSFUL,
  OBSERVE_QUERY,
  SET_DATA_SUCCESSFUL,
  REMOVE_DATA_SUCCESSFUL
} from '../../src/constants/actionTypes';
import { setDataSuccessful, removeDataSuccessful } from '../../src/actions/data';
import queriesReducer from '../../src/reducers/queries';
import { toQueryParams } from '../../src/utils/helpers';

function getInitStateFor(query, data = {}) {
  return {
    [ toQueryParams(query) ]: Object.assign({
      query,
      queriedRemote: false,
      matches: []
    }, data)
  };
}

describe('queriesReducer', () => {
  it('should have an initial state', () => {
    expect(queriesReducer(undefined, {})).to.deep.equal({});
  });

  describe(`behaviour for ${FIND_DATA_FROM_API_SUCCESSFUL} action`, () => {
    it('should initialise an empty state with queriedRemote = true if nothing there', () => {
      let query = { foo: 'bar' };
      expect(queriesReducer({}, {
        type: FIND_DATA_FROM_API_SUCCESSFUL,
        query
      })).to.deep.equal(getInitStateFor(query, { queriedRemote: true }));
    });

    it('should update the queriedRemote flag if query state already there', () => {
      let query = { foo: 'bar' },
          queryParams = toQueryParams(query),
          initial = getInitStateFor(query, { matches: [ 'foo.bar' ] }),
          initialQueryState = initial[queryParams],
          reduced = queriesReducer(initial, {
            type: FIND_DATA_FROM_API_SUCCESSFUL,
            query
          }),
          reducedQueryState = reduced[queryParams];

      expect(reducedQueryState.queriedRemote, 'Set queriedRemote flag to true').to.be.true;
      expect(reducedQueryState.matches, 'Left other props the same').to.equal(initialQueryState.matches);
      expect(reducedQueryState.query, 'Left other props the same').to.equal(initialQueryState.query);
    });
  });

  describe(`behaviour for ${OBSERVE_QUERY} action`, () => {
    it('should add a blank query state if not already there', () => {
      let query = { foo: 'bar' };
      expect(queriesReducer({}, {
        type: OBSERVE_QUERY,
        query
      })).to.deep.equal(getInitStateFor(query));
    });

    it('should not do anything if query already in state', () => {
      let query = { foo: 'bar' },
          initial = getInitStateFor(query);

      expect(queriesReducer(initial, {
        type: OBSERVE_QUERY,
        query
      })).to.equal(initial);
    });
  });

  describe(`behaviour for ${SET_DATA_SUCCESSFUL} action`, () => {
    it('should store content iff it matches the given query', () => {
      let matchingQuery = { parent: 'foo' },
          notMatchingQuery = { parent: 'bar' },
          content = { id: 'foo.bar' },
          initial,
          reduced;

      initial = Object.assign({}, getInitStateFor(matchingQuery), getInitStateFor(notMatchingQuery));
      reduced = queriesReducer(initial, setDataSuccessful(content.id, content));

      expect(
        reduced[toQueryParams(matchingQuery)].matches,
        'stored content of matching query'
      ).to.deep.equal([ content.id ]);

      expect(
        reduced[toQueryParams(notMatchingQuery)].matches,
        'left untouched content'
      ).to.deep.equal([]);
    });

    it('should remove it from matches if in and no longer matches', () => {
      let query = { parent: 'foo' },
          queryString = toQueryParams(query),
          content = { id: 'bar.foo' },
          initial = getInitStateFor(query, { matches: [ content.id ] }),
          reduced;

      reduced = queriesReducer(initial, setDataSuccessful(content.id, content));

      expect(reduced[queryString].matches).to.not.include(content.id);
    });
  });

  describe(`behaviour for ${REMOVE_DATA_SUCCESSFUL} action`, () => {
    it('should remove the item from matches if was in there', () => {
      let query = { parent: 'foo' },
          queryString = toQueryParams(query),
          content = { id: 'foo.bar' },
          initial = getInitStateFor(query, { matches: [ content.id ] }),
          reduced;

      reduced = queriesReducer(initial, removeDataSuccessful(content.id));

      expect(reduced[queryString].matches).to.not.include(content.id);
    });
  });
});
