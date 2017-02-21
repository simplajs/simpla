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
 * Configure Polymer with dom = shadow, unless Polymer is already defined
 * @return {undefined}
 */
export function configurePolymer() {
  window.Polymer = window.Polymer || { dom: 'shadow' };
}
