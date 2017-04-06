/**
 * Configure Polymer with dom = shadow, unless Polymer is already defined
 * @return {undefined}
 */
export function configurePolymer() {
  window.Polymer = window.Polymer || { dom: 'shadow' };
}
