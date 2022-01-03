import { stringifyQuery } from '../app/utils';

const API_KEY = 'AIzaSyAt8NOh_ZOvpyeZ2rRABxRbOsegGEmikXA';
const apiEndpoint = 'https://www.googleapis.com/webfonts/v1/webfonts';

console.log(apiEndpoint);

export default class GoogleFonts {
  static fetch(options = {}) {
    const query = {
      key: API_KEY,
    };

    const q = stringifyQuery(Object.assign(options, query));

    return fetch(apiEndpoint + q, {}).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Error fetching fonts');
    });
  }
}

declare global {
  interface Window { GoogleFonts: GoogleFonts; }
}
window.GoogleFonts = GoogleFonts;
