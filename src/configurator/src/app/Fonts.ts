import GoogleFonts from '../services/GoogleFonts';
import CustomFonts from './CustomFonts';

// Because typescript guid are fkn stupid and webpack sucks d

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

      let params = '';

      if (meta.axes.length > 0) {
        // 'Alegreya:ital,wght@0,400..900'
        const linkParams = [];
        const linkParamValues = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const axe of meta.axes) {
          linkParams.push(axe.tag);
          linkParamValues.push(`${axe.min}..${axe.max}`);
        }

        params = `:${linkParams.join(',')}@${linkParamValues.join(',')}`;
      }

      list.push({
        family: font.family,
        axes: meta.axes,
        creators: meta.designers,
        files: font.files,
        linkUrl: `https://fonts.googleapis.com/css2?family=${font.family.replace(' ', '+')}${params}&display=swap`,
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

  static getFont(family: string): Font | undefined {
    // eslint-disable-next-line no-restricted-syntax
    for (const font of fonts) {
      if (font.family === family) {
        return font;
      }
    }
    return undefined;
  }

  static async metadata(): Promise<Array<any>> {
    if (metadata.length > 0) return metadata;
    return fetch('/fonts/font-registry.json').then((res) => res.json()).then((data) => {
      metadata = data.familyMetadataList;
      return metadata;
    });
  }

  static getInfo(fontSrc: string) {
    const f = new Font(fontSrc);
    console.log(f);
  }
}
