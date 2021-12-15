import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

// just bad, at least in chrome

const TEXT_CONTENT_POOL = [
  "Weight",
  "Optical Size",
  "Thickness",
  "Variation",
  "Sans",
  "Variable",
  "Fonts",
  "Animation",
  "Text",
  "Size",
  "Width",
  "Weight",
  "Italic",
  "Style",
  "Width",
  "Style",
  "Animation",
  "Thickness",
  "Slant",
];

const availableAttributes = [
  { name: "wght", range: [100, 800] },
  { name: "wdth", range: [25, 151] },
  // { name: "opsz", range: [8, 144] },
  { name: "slnt", range: [-10, 0] },
  { name: "GRAD", range: [-200, 150] },
  { name: "XTRA", range: [323, 603] },
  { name: "XOPQ", range: [50, 175] },
  { name: "YOPQ", range: [25, 135] },
  { name: "YTLC", range: [416, 570] },
  { name: "YTUC", range: [528, 760] },
  { name: "YTAS", range: [649, 854] },
  // { name: "YTDE", range: [-305, -98] },
  // { name: "YTFI", range: [560, 788] }
];

function someTextContent() {
  return TEXT_CONTENT_POOL[Math.floor(Math.random() * TEXT_CONTENT_POOL.length)];
}

function someAttribute() {
  return availableAttributes[Math.floor(Math.random() * availableAttributes.length)];
}

function rand(min: number = 0, max: number = 1) {
  return min + Math.random() * (max - min);
}

@customElement('header-background')
export default class HeaderBackground extends LitElement {

  static get styles() {
    return css`
        :host {
            display: block;
            transform: translateZ(0) translateY(calc(var(--scrollY) * 0.2));
        }
        svg, canvas {
          width: 1400px;
          left: 50%;
          position: absolute;
          top: 0;
          transform: translate(-50%, 0);
        }
    `;
  }

  ctxt: CanvasRenderingContext2D | null = null;
  canvas: HTMLCanvasElement | null = null;

  renderableObjects: any[] = [];

  firstUpdated() {
    this.animationLoop();
  }

  initCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1400;
    this.canvas.height = 560;
    this.ctxt = this.canvas.getContext("2d");

    const gridStep = 200;

    for(let x = 20; x < this.canvas.width; x += gridStep) {
      for(let y = 40; y < this.canvas.height; y += gridStep) {
        
        if(Math.random() > 0.5) {
          
          const text = {
            content: someTextContent(),
            uniforms: [someAttribute(), someAttribute()],
            x: x + rand(-50, 50),
            y: y + rand(-50, 50),
            size: rand(20, 40),
          };
          this.renderableObjects.push(text);
        }
      }
    }

    this.requestUpdate();
  }

  clear() {
    const ctxt = this.ctxt;
    if(ctxt) {
      ctxt.clearRect(0, 0, ctxt.canvas.width, ctxt.canvas.height);
    }
  }

  animationLoop() {
    this.initCanvas();

    let lastTick: number = 0;

    const frame = (ms: number = 0) => {
      requestAnimationFrame(frame);
      if (window.scrollY > 500) return;

      const deltaTick = ms - lastTick;

      // limit to 30fps
      if(deltaTick > 1000 / 30) {
        this.clear();

        if(this.ctxt) {
          this.ctxt.globalAlpha = 0.1;

          for (const text of this.renderableObjects) {

            const attributes: string[] = [];
            
            for (const attrib of text.uniforms) {
              const x = text.x;
              const timeScaler = 800;
              const t = (1 + Math.sin((Date.now() / timeScaler) + (x * 0.5))) / 2;
              
              attributes.push(`'${attrib.name}' ${Math.floor(attrib.range[0] + t * (attrib.range[1] - attrib.range[0]))}`);
            }

            // @ts-ignore
            this.canvas.style.fontVariationSettings = attributes.join(", ");
  
            this.ctxt.textAlign = "center";
            this.ctxt.fillStyle = "#000";
            this.ctxt.font = `${text.size}px RobotoFlex`;
            this.ctxt.fillText(text.content, text.x, text.y);
          }
        }
        

        lastTick = ms;
      }
    }

    frame();
  }

  render() {
    return html`
        ${this.canvas}
    `;
  }
}
