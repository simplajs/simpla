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

Simpla is a collection of new dynamic HTML elements that talk to an API, based on the emerging [Web Components](https://www.w3.org/wiki/WebComponents/) spec. Use them in your code, then edit their content permanently on your site any time. 

They look like this:


```html
<simpla-text sid="text"></simpla-text>
<simpla-img sid="img"></simpla-img>
```

<p align="center"><img src="https://www.simpla.io/assets/img/demo.gif" alt="Demo of Simpla"></p>

## Installation and setup
Sign up for a free account at [simpla.io](https://www.simpla.io) and create a project. Then include the Simpla library in your HTML document and call `Simpla()` with your Project's ID.

```html
<script src="https://app.simpla.io"></script>
<script>
  // TODO: Enter project ID
  Simpla('PROJECT-ID');
</script>
```

You can also install with Bower and link the library in locally.

```bash
$ bower install simpla --save
```

## Basic usage

Just drop Simpla's new HTML elements into your code wherever you want editable content.

- Use `<simpla-text>` for editable text

- Use `<simpla-img>` for editable images.

All Simpla elements must have a unique _Content ID_ (usually contained in the `sid` attribute) and both opening and closing HTML tags.

```html
<simpla-text sid="my-text"></simpla-text>
<simpla-img sid="my-img"></simpla-text> 
```

<br/>

<p align="center"><a href="https://www.simpla.io/docs"><strong>Read the full docs</strong></a></p>

<br/>

## Editing content

<p align="center"><img src="https://www.simpla.io/assets/img/hero.png" width="600" /></p>

Simpla doesn’t have any admin areas or forms. Content is contained inside the new HTML elements, so you can edit everything inline, and it stays strictly structured.

Open your page in a browser, add `#edit` to the end of the URL (eg: `https://mysite.com#edit`), and login to start editing your content. When you’re finished press save to publish your changes. Remove `#edit` from the URL to exit edit mode.

<br/>

<p align="center"><a href="https://www.simpla.io"><strong>Try the demo on simpla.io</strong></a></p>

<br/>

## License

MIT © 2016 Simpla International
