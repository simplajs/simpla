import fetch from 'unfetch';
import { deepMapIn } from "./utils";

const UPLOAD_REGEX = /\[upload\s(.+?)\]/g;

export default class HttpSource {
  constructor({ data, uploads, cacheBusting }) {
    this.contentUrl = data;
    this.uploadsUrl = uploads;
    this.cacheBusting = cacheBusting;
  }

  /**
     * Get file at given path
     * @param {string} path 
     */
  get(path) {
    const replaceShortcodes = value => {
      if (typeof value === "string") {
        return value.replace(UPLOAD_REGEX, `${this.uploadsUrl}/$1`);
      }

      return value;
    };

    let url = `${this.contentUrl}${path}.json`;

    if (this.cacheBusting) {
      url += `?time=${Date.now()}`;
    }

    return fetch(url)
      .then(response => (response.status === 404 ? null : response.json()))
      .then(data => deepMapIn(data, replaceShortcodes));
  }
}
