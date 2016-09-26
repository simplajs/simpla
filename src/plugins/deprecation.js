/**
 * NOTE: This is here purely for backwards compatibility, in future it should
 * 	be removed when possible
 * 	@return {undefined}
 */
export function supportDeprecatedInitializer(Simpla) {
  let tag = document.querySelector('script[simpla-api]'),
      project = tag && tag.getAttribute('simpla-api');

  if (project) {
    console.warn(`The [simpla-api] attribute setup method is deprecated. Please use Simpla('${project}') instead, see https://www.simpla.io/docs/start`);
    Simpla(project);
  }
}

/**
 * NOTE: Also for backwards compatibility. This below is a private API and can be
 * 	safely removed once all elements who depend on it are upgraded
 * 	@return {undefined}
 */
export function supportDeprecatedConfig(Simpla) {
  let projectObserver = (project) => {
        window.simpla.config.api = project;
      },
      authEndpointObserver = (authEndpoint) => {
        window.simpla.config.server = authEndpoint;
      };

  window.simpla = window.simpla || {};
  window.simpla.config = window.simpla.config || {};

  Simpla.observeState('options.project', projectObserver);
  Simpla.observeState('options.authEndpoint', authEndpointObserver);
}
