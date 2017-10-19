import { equal, assign } from './utils.js';

export default class Store {
  constructor() {
    this._observers = { '*': [] };
    this._data = {};
  }

  observe(key, callback) {
    let unobserve = () => {
      this._observers[key] = this._observers[key].filter(fn => fn !== callback);
    };

    this._observers[key] = (this._observers[key] || []).concat(callback);

    return { unobserve };
  }

  set(key, value) {
    let triggerChange = !equal(this._data[key], value);

    this._data[key] = value;

    if (triggerChange) {
      let observers = this._observers[key],
        catchAlls = this._observers['*'];

      if (observers) {
        for (let i = 0, k = observers.length; i < k; i++) {
          observers[i](value, key);
        }
      }

      for (let i = 0, k = catchAlls.length; i < k; i++) {
        catchAlls[i](value, key);
      }
    }
  }

  get(key) {
    return this._data[key];
  }

  has(key) {
    return key in this._data;
  }

  entries() {
    let entries = [];

    for (let i in this._data) {
      entries.push([i, this.get(i)]);
    }

    return entries;
  }

  toObject() {
    return assign({}, this._data);
  }
}