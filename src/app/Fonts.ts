import GoogleFonts from '../services/GoogleFonts';

interface FontFiles {
  regular: string
}

export interface Font {
  family: string,
  axes: Array<any>,
  creators: Array<string>,
  files: FontFiles,
  linkUrl: string,
}

let fonts: Array<Font> = [];
let metadata: Array<any> = [];

export default class Fonts {
  static async getFontList(): Promise<Array<Font>> {
    if (fonts.length > 0) return fonts;

    const list: Array<Font> = [];
    const googleFonts = (await GoogleFonts.fetch()).items;

    for (let i = 0; i < googleFonts.length; i += 1) {
      const font = googleFonts[i];
      // eslint-disable-next-line no-await-in-loop
      const meta = await this.getMetaData(font.family);

      list.push({
        family: font.family,
        axes: meta.axes,
        creators: meta.designers,
        files: font.files,
        linkUrl: `https://fonts.googleapis.com/css2?family=${font.family}&display=optional`,
      });
    }

    fonts = list;
    return list;
  }

  static async getMetaData(family: string) {
    const info = await this.metadata();
    return info.find((font) => font.family === family);
  }

  static async metadata(): Promise<Array<any>> {
    if (metadata.length > 0) return metadata;
    return fetch('/font-registry.json').then((res) => res.json()).then((data) => {
      metadata = data.familyMetadataList;
      return metadata;
    });
  }
}
