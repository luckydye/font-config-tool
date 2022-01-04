import GoogleFonts from '../services/GoogleFonts';
import CustomFonts from './CustomFonts';

export interface Font {
  family: string,
  axes: {
    tag: string,
    min: number,
    max: number,
    defaultValue: number
  }[],
  files: { [key: string]: string },
  creators: Array<string>,
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
      });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const font of CustomFonts) {
      list.push(font);
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
