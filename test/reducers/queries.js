import {
  FIND_DATA,
  FIND_DATA_SUCCESSFUL,
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
      querying: false,
      cache: [],
      matches: []
    }, data)
  };
}

describe('queriesReducer', () => {
  it('should have an initial state', () => {
    expect(queriesReducer(undefined, {})).to.deep.equal({});
  });

  describe(`behaviour for ${FIND_DATA}`, () => {
    it('should initialise an empty state with querying true', () => {
      let query = { foo: 'bar' },
          reduced = queriesReducer({}, {
            type: FIND_DATA,
            query
          });

      expect(reduced).to.deep.equal(getInitStateFor(query, { querying: true }));
    });

    it('should set querying true if state already exists', () => {
      let query = { foo: 'bar' },
          reduced = queriesReducer(getInitStateFor(query), {
            type: FIND_DATA,
            query
          });

      expect(reduced[toQueryParams(query)].querying).to.be.true;
    });
  });

  describe(`behaviour for ${FIND_DATA_SUCCESSFUL} action`, () => {
    const query = { parent: 'foo' },
          action = { type: FIND_DATA_SUCCESSFUL, query };

    it('should move the cached values into matches', () => {
      let initial = getInitStateFor(query, {
            querying: true,
            matches: [ 'foo.bar', 'foo.baz' ],
            cache: [ 'foo.bar', 'foo.qux' ]
          }),
          reducedQueryState;

      reducedQueryState = queriesReducer(initial, action)[toQueryParams(query)];

      expect(reducedQueryState.matches, 'Added from cache').to.include('foo.qux');
      expect(reducedQueryState.matches, 'Didn\'t add duplicates').to.have.lengthOf(3);
      expect(reducedQueryState.cache, 'Cleared cache').to.be.empty;
    });

    it('should flag as no longer querying', () => {
      let initial = getInitStateFor(query, { querying: true }),
          reducedQueryState;

      reducedQueryState = queriesReducer(initial, action)[toQueryParams(query)];

      expect(reducedQueryState.querying).to.be.false;
    });

    it('should leave matches the same if moving from cache has no effect', () => {
      let matches = [ 'foo.bar', 'foo.baz' ],
          initial = getInitStateFor(query, {
            querying: true,
            matches,
            cache: [ 'foo.bar' ]
          }),
          reducedQueryState;

      reducedQueryState = queriesReducer(initial, action)[toQueryParams(query)];

      expect(reducedQueryState.matches, 'If result is same, should be same object').to.equal(matches);
    });
  });

  describe(`behaviour for ${FIND_DATA_FROM_API_SUCCESSFUL} action`, () => {
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
    it('should add filtered content as initial query state', () => {
      let query = { ancestor: 'foo' },
          matches = [ 'foo.bar', 'foo.baz', 'foo.bar.baz' ],
          content = [
            'foo.bar',
            'foo.bar.baz',
            'foo.baz',
            'bar',
            'foo'
          ].reduce((state, id) => Object.assign(state, { [ id ]: { id } }), {}),
          result = queriesReducer({}, { type: OBSERVE_QUERY, query, content }),
          expected = getInitStateFor(query, { matches });

      expect(result['?ancestor=foo'].matches).to.deep.have.members(expected['?ancestor=foo'].matches);
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

    it('should add matched result to cache if currently querying', () => {
      let query = { parent: 'foo' },
          queryString = toQueryParams(query),
          content = { id: 'foo.bar' },
          initial = getInitStateFor(query, { querying: true }),
          reduced;

      reduced = queriesReducer(initial, setDataSuccessful(content.id, content));

      expect(reduced[queryString].matches).to.be.empty;
      expect(reduced[queryString].cache).to.deep.equal([ content.id ]);
    });

    it('should not add duplicates', () => {
      let query = { parent: 'foo' },
          queryString = toQueryParams(query),
          content = { id: 'foo.bar' },
          initial = getInitStateFor(query, { matches: [ content.id ] }),
          reduced;

      reduced = queriesReducer(initial, setDataSuccessful(content.id, content));

      expect(reduced[queryString].matches).to.equal(initial[queryString].matches);
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
