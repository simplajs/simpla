<p align="center">
 <img src="https://www.simpla.io/assets/img/logo-wordmark.png" alt="Simpla logo" width="350" />
</p>

<p align="center">
  <img src="https://img.shields.io/bower/v/simpla.svg" alt="Bower version">

  <a href="https://travis-ci.org/simplaio/simpla" target="_blank"><img src="https://travis-ci.org/simplaio/simpla.svg?branch=master" alt="Build satus" /></a>

  <a href="https://gemnasium.com/github.com/simplaio/simpla" target="_blank"><img src="https://img.shields.io/gemnasium/simplaio/simpla.svg" alt="Bower dependencies"></a>

  <a href="http://slack.simpla.io" target="_blank"><img src="http://slack.simpla.io/badge.svg" alt="Slack group"></a>
</p> 

<br/>

Simpla is a collection of new, editable HTML elements. Use them in your code, then edit their content permanently on your site. They look like this:

```html
<simpla-text sid="text"></simpla-text>
<simpla-img sid="img"></simpla-img>
```

<p align="center"><img src="https://www.simpla.io/assets/img/demo.gif" alt="Demo of Simpla"></p>

## Installation

Sign up for a free account on [simpla.io](https://www.simpla.io) and create a project. Then link the Simpla library into the `<head>` of your document, either from our high-redundancy CDN:

```html
<head>
  ...
  <script src="https://app.simpla.io"></script>
</head>
```

Or locally with Bower:

```bash
$ bower install simpla --save
```

```html
<head>
  ...
  <script src="/bower_components/simpla/simpla.js"></script>
</head>
```

Once the Simpla Javascript library included, setup your project API:

```javascript
Simpla('PROJECT-API-KEY');
```

## Basic Usage

Just drop Simpla's new HTML elements into your code wherever you want editable content.

- Use `<simpla-text></simpla-text>` for editable text

- Use `<simpla-img></simpla-img>` for editable images.

All Simpla elements must have an `sid` (Simpla ID) attribute containing a unique ID, and both opening and closing HTML tags. For example:

```html
<simpla-text sid="my-text"></simpla-text>
<simpla-img sid="my-img"></simpla-text> 
```

<br/>

<p align="center"><a href="https://www.simpla.io/docs"><strong>Read the full docs</strong></a></p>

<br/>

## Editing content

<p align="center"><img src="https://www.simpla.io/assets/img/hero.png" width="600" /></p>

Enter edit mode and start editing content by appending `#edit` to the end of your page’s URL (eg: `https://mysite.com#edit`).

In edit mode you can click text to edit it and highlight text to format it. Click images to open editing controls, where you can zoom and crop, upload a new image, and change the title of the image. Once you’ve finished editing hit the save button to publish your changes. Remove `#edit` from the URL to exit edit mode.

<br/>

<p align="center"><a href="https://www.simpla.io"><strong>Try the demo on simpla.io</strong></a></p>

<br/>

## License

MIT © 2016 Simpla International