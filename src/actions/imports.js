import { IMPORT_ELEMENT, IMPORT_ELEMENT_SUCCESSFUL, IMPORT_ELEMENT_FAILED } from '../constants/actionTypes';

export function syncImportElement(href) {
  return {
    type: IMPORT_ELEMENT,
    href
  };
}

export function importElementFailed(href, error) {
  return {
    type: IMPORT_ELEMENT_FAILED,
    href
  };
}

export function importElementSuccess(href) {
  return {
    type: IMPORT_ELEMENT_SUCCESSFUL,
    href
  };
}

export function importElement(href) {
  return (dispatch, getState) => {
    let { _imports: imports } = getState(),
        link;

    link = document.createElement('link');
    link.href = href;
    link.rel = 'import';
    link.async = true;

    if (imports[link.href] && imports[link.href].status !== 'failed') {
      return;
    }

    dispatch(syncImportElement(link.href));

    return new Promise((resolve, reject) => {
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    }).then(
      () => dispatch(importElementSuccess(link.href)),
      () => dispatch(importElementFailed(link.href))
    );
  }
}
