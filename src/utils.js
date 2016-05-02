import { ELEMENTS_SERVER } from './constants';

/**
 * Ready web components in the browser. If webcomponents are natively supported
 * 	it will do nothing, otherwise it will load in the webcomponents polyfills
 * @return {Promise}  Promise which resolves once web components is definitely ready
 */
export function readyWebComponents() {
  // Conditionally load WCjs
  const webComponentsSupported =
      'registerElement' in document &&
      'import' in document.createElement('link') &&
      'content' in document.createElement('template');

  if (webComponentsSupported) {
    return Promise.resolve();
  }

  /**
   * Load in web components polyfill
   * @return {Promise} Promise which resolves once finished
   */
  return new Promise(resolve => {
    let script = document.createElement('script');
    script.async = true;
    script.src = `${ELEMENTS_SERVER}/webcomponentsjs/webcomponents-lite.min.js`;
    script.onload = resolve;
    document.head.appendChild(script);
  });
};

/**
 * Configure Polymer with dom = shadow, unless Polymer is already defined
 * @return {undefined}
 */
export function configurePolymer() {
  window.Polymer = window.Polymer || { dom: 'shadow' };
}
