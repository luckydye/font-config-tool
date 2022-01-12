import { stringifyQuery } from '../app/utils';

const API_KEY = 'AIzaSyAt8NOh_ZOvpyeZ2rRABxRbOsegGEmikXA';
const apiEndpoint = 'https://www.googleapis.com/webfonts/v1/webfonts';

let fonts: object | undefined;
let fontsLoadedCallback: Function[] = [];
let isLoadingMetadata = false;

export default class GoogleFonts {
  static async fetch(options = {}): Promise<any> {

    if(isLoadingMetadata) {
      return new Promise((resolve) => {
        fontsLoadedCallback.push(() => {
          resolve(fonts);
        })
      })
    }
    isLoadingMetadata = true;

    const query = {
      key: API_KEY,
    };

    const q = stringifyQuery(Object.assign(options, query));

    return fetch(apiEndpoint + q, {}).then((res) => {
      if (res.ok) {
        fonts = res.json();
        return fonts;
      }
      throw new Error('Error fetching fonts');
    });
  }
}

declare global {
  interface Window { GoogleFonts: GoogleFonts; }
}
window.GoogleFonts = GoogleFonts;
