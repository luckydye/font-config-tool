import GoogleFonts from '../services/GoogleFonts';
import CustomFonts from './CustomFonts';

//@ts-ignore
import opentype from 'opentype.js';
//@ts-ignore
import VariableFont from 'variablefont.js';
// TODO: I had to modify the dependency in node_modules to export anything...

export interface Font {
  family: string,
  unsupportedAxes?: {
    tag: string,
    min: number,
    max: number,
    defaultValue: number
  }[],
  axes: {
    tag: string,
    min: number,
    max: number,
    defaultValue: number
  }[],
  files: { [key: string]: string },
  creators: Array<string>,
  linkUrl: string,
  source?: string,
}

let fonts: Array<Font> = [];
let metadata: Array<any> = [];

let isLoadingMetadata = false;
let metadataLoadedCallback: Function[] = [];

export default class Fonts {
  static async getFontList(): Promise<Array<Font>> {
    if (fonts.length > 0) return fonts;

    const list: Array<Font> = [];
    const googleFonts = (await GoogleFonts.fetch()).items;

    // eslint-disable-next-line no-restricted-syntax
    for (const font of CustomFonts) {
      list.push(font);
    }

    for (let i = 0; i < googleFonts.length; i += 1) {
      const font = googleFonts[i];

      // skip fonts that are already loaded in custom fonts
      if(list.find(f => f.family == font.family))
        continue;

      // eslint-disable-next-line no-await-in-loop
      const meta = await this.getMetaData(font.family).catch(err => {
        console.error(err);
      })

      if(meta) {
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
          unsupportedAxes: meta.unsupportedAxes,
          creators: meta.designers,
          files: font.files,
          linkUrl: `https://fonts.googleapis.com/css2?family=${font.family.replace(' ', '+')}${params}&display=swap`,
          source: "Google Fonts"
        });
      }
    }

    fonts = list;
    return list;
  }

  static async getMetaData(family: string) {
    const info = await this.metadata();

    const font = info.find((font) => font.family.toLocaleLowerCase() === family.toLocaleLowerCase());
    if(font) {
      return font;
    }
    throw new Error("Selected Font not found");
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
    if(isLoadingMetadata) {
      return new Promise((resolve) => {
        metadataLoadedCallback.push(() => {
          resolve(metadata);
        })
      })
    }
    isLoadingMetadata = true;
    return fetch('./font-registry.json').then((res) => res.json()).then((data) => {
      metadata = data.familyMetadataList;
      for(let callback of metadataLoadedCallback) {
        callback();
      }
      return metadata;
    });
  }

  static getInfo(fontSrc: string) {
    console.log(new VariableFont(fontSrc));
  }

  // Example: "/fonts/RobotoFlex[GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght].ttf"
  static async register(src: string): Promise<Font | undefined> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      opentype.load(src, function(err: Error, font: VariableFont) {
        if (err) {
            reject(undefined);
        } else {
          const vf = new VariableFont(font);
          const axes = vf.getAxes();

          const family = font.names.fullName.en;

          const styleBlob = new Blob([`
            @font-face {
              font-family: ${family};
              src: url(${src});
            }
          `], { type: "text/css" });
          const blobUrl = URL.createObjectURL(styleBlob);

          const fontObject = {
            family: family,
            creators: [ font.names.designer.en ],
            files: { regular: src },
            linkUrl: blobUrl,
            axes: axes.map((xs: any) => ({
              tag: xs.tag,
              min: xs.minValue,
              max: xs.maxValue,
              defaultValue: xs.defaultValue,
            }))
          };

          fonts.push(fontObject);
          console.log(fonts);

          resolve(fontObject);
        }
      });
    });
  }
}

// @ts-ignore
window.Fonts = Fonts;
