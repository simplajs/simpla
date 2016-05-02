import { OPTIONS, SERVER } from './constants';
import { Simpla as SimplaCore } from 'simpla-core';

/**
 * Simpla class to boot the Simpla app.
 */
export default class Simpla extends SimplaCore {
  constructor(options, ...args) {

    if (typeof options === 'string') {
      options = { project: options };
    }

    // Add defaults
    options = Object.assign({}, OPTIONS, options);
    super(options, ...args);

    // Set project on options
    this.options.api.data = `${SERVER}/projects/${options.project}`;
  }

  /**
   * Load the given elements
   * @param  {Array}       hrefs hrefs for elements to load
   * @param  {String?}     base  Base path to prepend to elements, defaults to ''
   * @return {undefined}
   */
  static loadElements(hrefs = [], base = '') {
    hrefs
      .map(href => base + href)
      .forEach(href => {
        let link = document.createElement('link');
        link.href = href;
        link.rel = 'import';
        document.head.appendChild(link);
      });
  }
}
