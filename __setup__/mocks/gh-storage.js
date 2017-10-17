jest.mock('../../src/gh-storage', () => {
  class Transaction {
    constructor(parent) {
      this._mockState = {};
      this._parent = parent;
    }
    
    set(path, value) {
      this._mockState[path] = value;
    }
    
    remove(path) {
      this.set(path, null);
    }

    commit() {
      this._parent._mockState.transactions.push(Object.freeze(this._mockState));
    }
  }

  return jest.fn(function() {
    Object.assign(this, {
      _mockState: { transactions: [] },

      startTransaction() {
        return Promise.resolve(
          new Transaction(this)
        );
      }
    });

    return this;
  });
});