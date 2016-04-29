export const SERVER = 'https://api.simpla.io';
export const ELEMENTS_SERVER = 'https://elements.simpla.io';
export const APP_SERVER = 'https://app.simpla.io';

export const ELEMENTS = [
  'simpla-img',
  'simpla-text',
  'simpla-block',
  'sm-admin'
].map(element => `${ELEMENTS_SERVER}/${element}/${element}.html`);

export const OPTIONS = {
  base: '',
  api: {
    auth: SERVER
  },
  elements: ELEMENTS
}
