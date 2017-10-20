<p align="center">
  <a href="https://www.simpla.io">
    <img src="https://cdn.simpla.io/img/logo/logo-wordmark.png" alt="Simpla" width="300">
  </a> 
</p>

<p align="center">
  <a href="https://travis-ci.org/simplaio/simpla"><img src="https://travis-ci.org/simplaio/simpla.svg?branch=master" alt="Test status"></a>
  <img src="http://img.badgesize.io/https://unpkg.com/simpla?compression=gzip&label=size%20(gzip)" alt="Size (gzip)">
  <a href="https://www.npmjs.com/package/simpla"><img src="https://img.shields.io/npm/v/simpla.svg" alt="NPM version"></a>
  <a href="https://slack.simpla.io"><img src="http://slack.simpla.io/badge.svg" alt="Slack"></a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome"> 
</p>

Simpla is an open, modular, frontend content framework built on Web Components. 

Create dynamic content with HTML and edit it inline. Ditch the server and use Github as your backend. Push everything to static a CDN. Integrate into any stack instantly. Assemble your own lightweight CMS.

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
```

<p align="center">
  <img src="https://cdn.simpla.io/img/laptop-demo.gif" width="600" alt="Demo of Simpla">
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
  /**
   * Github Repo
   * Repository where content will be stored (in a '_content' folder)
   */
  repo: 'username/repo',

  /**
   * Auth adapter
   * Used to authenticate users with Github from your site
   */
  auth: new SimplaNetlify({ site: 'mysite' }),

  /**
   * Public content source (optional)
   * Public URL of your content, defaults to fetching directly from GitHub
   * Push your content to a CDN like Netlify in production
   */
  source: window.location.origin
});

// Add Simpla to window global, for components to use
window.Simpla = Simpla;
```

Simpla and its adapters export UMD modules, so you can also link to them with `<script>` tags and use the globals directly.

Simpla uses [web components](https://www.webcomponents.org) to manage content, the library itself is just a tiny (~5kb) core to an expansive ecosystem. Install and add elements to your page with Bower and HTML imports (NPM/ES module support coming soon). You can find elements in the [elements catalogue](https://www.simpla.io/elements). 

```sh
$ bower i simpla-text simpla-img simpla-admin --save
```

```html
<link rel="import" href="/bower_components/simpla-text/simpla-text.html">
<link rel="import" href="/bower_components/simpla-img/simpla-img.html">
<link rel="import" href="/bower_components/simpla-admin/simpla-admin.html" async>
```

You should also include a web components polyfill for full cross-browser support (see the [browsers Simpla supports](https://www.simpla.io/docs/guides/browser-support)).

```html
<script src="https://unpkg.com/webcomponents.js@^0.7.24/webcomponents-lite.min.js" async></script>
```

**[See full documentation & API references](https://www.simpla.io/docs)**

## Questions

To find out more about Simpla visit the project [website](https://www.simpla.io), and for questions join the community on [Slack](https://slack.simpla.io)

## Contributing

There are lots of ways you can help push the Simpla project forward:

- **Reporting bugs.** If you find a bug please report it! Open an issue against this repository for problems with the core library. For problems with elements, open an issue against the element's repository.

- **Submitting Pull Requests.** We happily accept PRs against both this repository and any of the elements. Your PR should address an existing issue or have been discussed previously to ensure it gets merged.

- **Submitting new components** Simpla is an open ecosystem, and the best way you can contribute to the project is to build your own content components and [publish them to the catalogue](https://github.com/simplaio/simpla-elements/#publishing-your-element). The ecosystem is currently built around Web Components, but there's no reason you couldn't use Simpla in a component environment of your choice (React, etc).

Read the [Contributing guidelines](/CONTRIBUTING.md) for more information.

***

MIT © 2017 [Sean King](https://twitter.com/seaneking) & [Bede Overend](https://twitter.com/bedeoverend)
