<p align="center">
  <a href="https://www.simplajs.org">
    <img src="https://www.simplajs.org/assets/public/logo.png" alt="Simpla" width="300">
  </a>
</p>

<p align="center">
  <a href="https://travis-ci.org/simplajs/simpla"><img src="https://travis-ci.org/simplajs/simpla.svg?branch=master" alt="Test status"></a>
  <img src="http://img.badgesize.io/https://unpkg.com/simpla?compression=gzip&label=size%20(gzip)" alt="Size (gzip)">
  <a href="https://www.npmjs.com/package/simpla"><img src="https://img.shields.io/npm/v/simpla.svg" alt="NPM version"></a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome">
</p>

Simpla is a modular content system for frontend developers, built on Web Components.

At a glance, it lets you:

- Build with standard HTML & JS
- Edit content (safely) inline
- Use Github as your backend
- Work in any stack or framework
- Push everything as JSON data to a static CDN
- Define content models in the DOM
- Assemble your own lightweight CMS

It looks like this:

```html
<!-- Block of editable richtext -->
<simpla-text path="/text"></simpla-text>

<!-- An editable image -->
<img is="simpla-img" path="/img">

<!-- Dynamic collection -->
<simpla-collection path="/gallery" as="photo">
  <template>
    <img is="simpla-img" path="/gallery/[photo]/img">
    <simpla-text path="/gallery/[photo]/caption"></simpla-text>
  </template>
</simpla-collection>

<!-- And many more components -->
```

<p align="center">
  <img src="https://www.simplajs.org/assets/public/demo.gif" width="600" alt="Demo of Simpla">
</p>

## Installation

Simpla is available on NPM and Unpkg as `simpla`.

```sh
npm i simpla
```

Import the core library and an OAuth adapter, and call `Simpla.init`

```js
// Import Simpla and OAuth adapter
import Simpla from 'simpla';
import SimplaNetlify from 'simpla/adapters/netlify';

// Init Simpla
Simpla.init({

  // Github repo to store content in
  repo: 'username/repo',

  // Adapter to authenticate users with Github
  auth: new SimplaNetlify({ site: 'mysite' }),

  // Public URL of your content (optional)
  source: 'https://mysite.netlify.com'

});

// Add Simpla to window global for components to access
window.Simpla = Simpla;
```

Simpla and its adapters export UMD modules, so you can also link to them with `<script>` tags and use the globals directly.

Simpla uses [web components](https://www.webcomponents.org) to manage content, the library itself is just a tiny (~4kb) core to an expansive ecosystem. Install and add components to your page with Bower and HTML imports (NPM/JS support coming soon). You can find components in the [elements catalogue](https://www.webcomponents.org/collection/simplajs/simpla-elements).

```sh
$ bower i simpla-text simpla-img simpla-admin --save
```

```html
<link rel="import" href="/bower_components/simpla-text/simpla-text.html">
<link rel="import" href="/bower_components/simpla-img/simpla-img.html">
<link rel="import" href="/bower_components/simpla-admin/simpla-admin.html" async>
```

You should also include a web components polyfill for full cross-browser support (see the [browsers Simpla supports](https://docs.simplajs.org/guides/browser-support.html)).

```html
<script src="https://unpkg.com/webcomponents.js@^0.7.24/webcomponents-lite.min.js" async></script>
```

**[See full documentation & API references](https://docs.simplajs.org)**

## Contributing

There are lots of ways you can help push the Simpla project forward:

- **Reporting bugs.** If you find a bug please report it! Open an issue against this repository for problems with the core library. For problems with elements, open an issue against the element's repository.

- **Submitting Pull Requests.** We ❤️ PRs! Your PR should address an existing issue or have been discussed previously to ensure it gets merged.

- **Publishing new components** Simpla is a community driven project, and the best way you can contribute is to build your own content components. The ecosystem is built on Web Components, but there's no reason you couldn't use Simpla in a component environment of your choice (React, etc).

Read the [Contributing guidelines](/CONTRIBUTING.md) for more information.

***

[MIT](/LICENSE) © 2017
