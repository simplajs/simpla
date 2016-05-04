export const SERVER = 'https://api.simpla.io';
export const ELEMENTS_SERVER = 'https://elements.simpla.io';
export const APP_SERVER = 'https://app.simpla.io';

export const ELEMENTS = [
  'simpla-img/simpla-img.html',
  'simpla-text/simpla-text.html',
  'simpla-block/simpla-block.html',
  'sm-admin/sm-admin.html'
];

export const OPTIONS = {
  api: {
    auth: SERVER
  },
  elements: {
    base: `${ELEMENTS_SERVER}/`,
    paths: ELEMENTS
  }
}
