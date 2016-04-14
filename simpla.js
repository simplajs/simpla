(function () {
  'use strict';

  var API_ATTR = 'simpla-api';
  var ELEMENTS = ['simpla-img', 'simpla-text', 'simpla-block', 'sm-admin'];

  function hideDefaultContent() {
    var style = document.createElement('style');
    style.innerHTML = 'default-content { display: none; }';
    document.head.appendChild(style);
  }

  function getServerPath(url) {
    var _ref = function () {
      var a = document.createElement('a');
      a.href = url;
      return a;
    }();

    var protocol = _ref.protocol;
    var host = _ref.host;
    var pathname = _ref.pathname;


    var path = function () {
      var bits = pathname.split('/');
      // Try go two levels up
      bits.splice(-2);
      return bits.join('/');
    }();

    return protocol + '//' + host + path;
  }

  (function () {
    var script = document.querySelector('script[' + API_ATTR + ']'),
        api = script.getAttribute(API_ATTR),
        basename = getServerPath(script.src);

    // Setup configuration of Simpla
    if (window.simpla) {
      console.warn('Simpla already loaded');
      return;
    }

    // Hide default content as quickly as we can
    hideDefaultContent();

    window.simpla = window.simpla || {
      config: {}
    };
    window.simpla.config.api = api;

    // Functions to get a components full url and then load it in via a link
    var getComponent = function getComponent(component) {
      return basename + '/' + component;
    },
        includeElement = function includeElement(element) {
      var el = document.createElement('link');
      el.rel = 'import';
      el.href = getComponent(element);

      document.head.appendChild(el);
    };

    // Get web components
    (function () {
      var wc = document.createElement('script');
      wc.src = getComponent('webcomponentsjs/webcomponents-lite.min.js');
      document.head.appendChild(wc);
    })();

    // Setup Polymer to use shadow dom if possible
    window.Polymer = window.Polymer || {};
    window.Polymer.dom = 'shadow';

    // Include all the elements we need
    ELEMENTS.map(function (element) {
      return element + '/' + element + '.html';
    }).forEach(includeElement);
  })();

}());