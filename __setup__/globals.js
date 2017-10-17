import fetch from 'jest-fetch-mock';
import npmPackage from '../package.json';

const RealDate = global.Date;
global.Date = class Date extends RealDate {
  constructor(...args) {
    if (args.length > 0 || !Date._time) {
      return super(...args); //eslint-disable-line constructor-super
    }

    return super(Date._time); //eslint-disable-line constructor-super
  }

  static mock(time) {
    Date._time = new RealDate(time);
  }

  static resetMock() {
    Date._time = null;
  }

  static now() {
    return Date._time ? Date._time.getTime() : super.now();
  }
};

global.VERSION = npmPackage.version;
global.fetch = fetch;

