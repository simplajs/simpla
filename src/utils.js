import { ELEMENTS_SERVER } from './constants';

/**
 * Hides <default-content> elements by injecting a style tag into the head
 * @return {undefined}
 */
export function hideDefaultContent() {
  let style = document.createElement('style');
  style.innerHTML = 'default-content { display: none; }';
  document.head.appendChild(style);
}

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

/**
 * NOTE: This is here purely for backwards compatibility, in future it should
 * 	be removed when possible
 * 	@return {undefined}
 */
export function supportDeprecatedInitializer(init) {
  let tag = document.querySelector('script[simpla-api]'),
      project = tag && tag.getAttribute('simpla-api');

  if (project) {
    console.warn(`The [simpla-api] attribute setup method is deprecated. Please use Simpla('${project}') instead, see https://www.simpla.io/docs/start`);
    init(project);
  }
}

/**
 * NOTE: Also for backwards compatibility. This below is a private API and can be
 * 	safely removed once all elements who depend on it are upgraded
 * 	@return {undefined}
 */
export function supportDeprecatedConfig(authEndpoint, project) {
  window.simpla = {
    config: {
      server: authEndpoint,
      api: project
    }
  };
}
