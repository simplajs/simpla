<p align="center">
 <img src="https://storage.googleapis.com/simpla-assets/img/logo-wordmark-sml.png" alt="Simpla logo" width="350" />
</p>

<p align="center">
  <img src="https://img.shields.io/bower/v/simpla.svg" alt="Bower version">

  <a href="https://travis-ci.org/simplaio/simpla" target="_blank"><img src="https://travis-ci.org/simplaio/simpla.svg?branch=master" alt="Build satus" /></a>

  <a href="https://gemnasium.com/github.com/simplaio/simpla" target="_blank"><img src="https://img.shields.io/gemnasium/simplaio/simpla.svg" alt="Bower dependencies"></a>

  <a href="https://david-dm.org/simplaio/simpla#info=devDependencies" target="_blank"><img src="https://img.shields.io/david/dev/simplaio/simpla.svg?theme=shields.io" alt="Bower dependencies"></a>

  <a href="http://slack.simpla.io" target="_blank"><img src="http://slack.simpla.io/badge.svg" alt="Slack group"></a>
</p> 

<br/>

Simpla lets you build dynamic content in plain HTML. It's a collection of new HTML elements powered by a RESTful API. You use them to create, structure, and manipulate content in your code. No CMS needed. 

They're built on top of the emerging [Web Components](https://www.w3.org/wiki/WebComponents/) spec. They look like this:

```html
<simpla-text sid="text"></simpla-text>
<simpla-img sid="img"></simpla-img>
```

<p align="center"><img src="https://storage.googleapis.com/simpla-assets/img/editing-demo.gif" alt="Demo of Simpla"></p>

<br/>
<p align="center"><a href="https://www.simpla.io/docs"><strong>Read the full docs on simpla.io</strong></a></p>

<br/>

## Installation and setup
The easiest way to get started with Simpla is by using the [simpla.io](https://simpla.io) platform. Create a free project, then include this library and call `Simpla()` with your project ID

```html  
<script src="https://app.simpla.io"></script>
<script>
  // TODO: Enter project ID
  Simpla('PROJECT-ID');
</script>
```

You can also install Simpla locally with Bower

```bash
$ bower install simpla --save
```

### Setting options
Simpla is configurable via the `Simpla()` initializer

```js
Simpla({
  project: 'PROJECT-ID',
  api: 'https://api.simpla.io',
  ...
});
```

[Read more about available options](https://www.simpla.io/docs/#options)

## Usage

Drop Simpla's new HTML elements into your code wherever you want editable content.

- Use `<simpla-text>` for editable text

- Use `<simpla-img>` for editable images.

Every element must have a unique Content ID (usually contained in the `sid` attribute) and both opening and closing HTML tags.

```html
<simpla-text sid="my-text"></simpla-text>
<simpla-img sid="my-img"></simpla-text> 
```

### Structuring data
Simpla structures data on the fly. This means with you can create powerful dynamic content, without a CMS. Build blogs, localize content, personalize user journeys, all with just HTML and Javascript.

Use `<simpla-block>` to create namespaces for content

```html
<simpla-block sid="block">

  <!-- This 'text' is scoped to 'block' -->
  <simpla-text sid="text"></simpla-text>

</simpla-block>
```

Dynamically set the `sid` of elements to fetch different content. For example, build a simple fontend blog

```html
<simpla-block gid="blog">

  <!-- Post ID set by js -->
  <simpla-block id="post" sid="">
    <simpla-text sid="content"></simpla-text>
  </simpla-block>

</simpla-block>

<script>
  // Get post slug from URL
  var slug = window.location.pathname.split('blog/').pop();

  // Set post ID to slug
  document.querySelector('#post').sid = slug;
</script>
```

<br/>

<p align="center"><a href="https://www.simpla.io/docs"><strong>Read more about using Simpla</strong></a></p>

<br/>

## Editing content

<p align="center"><img src="https://storage.googleapis.com/simpla-assets/img/hero-img.png" width="600" /></p>

Simpla doesn’t have any admin areas or forms. Content editors can work inline without breaking things, and there's a JSON API for developers.

Just add `#edit` to the end of your URL (eg: `https://mysite.com#edit`) and login to start editing your content. When you’ve finished press save to publish your changes. Remove `#edit` from the URL to exit edit mode.

<br/>

<p align="center"><a href="https://www.simpla.io"><strong>Try the demo on simpla.io</strong></a></p>

<br/>

--

MIT © 2016 Simpla International
