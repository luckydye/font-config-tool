import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
// import Three from 'three';

const availableAttributes = [
  { name: "wght", range: [100, 800] },
  { name: "wdth", range: [25, 151] },
  { name: "opsz", range: [8, 144] },
  { name: "slnt", range: [-10, 0] },
  { name: "GRAD", range: [-200, 150] },
  { name: "XTRA", range: [323, 603] },
  { name: "XOPQ", range: [50, 175] },
  { name: "YOPQ", range: [25, 135] },
  { name: "YTLC", range: [416, 570] },
  { name: "YTUC", range: [528, 760] },
  { name: "YTAS", range: [649, 854] },
  { name: "YTDE", range: [-305, -98] },
  { name: "YTFI", range: [560, 788] }
];

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
        canvas {
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

    const text1 = {
      content: "Variable Fonts",
      uniforms: [...availableAttributes],
      x: this.canvas.width / 2,
      y: this.canvas.height / 2 + 100,
      size: 120,
    };
    
    const text2 = {
      content: "Variable Fonts",
      uniforms: [...availableAttributes],
      x: this.canvas.width / 2,
      y: this.canvas.height / 2 - 100,
      size: 120,
    };

    this.renderableObjects.push(text1);
    this.renderableObjects.push(text2);

    this.requestUpdate();
  }

  animationLoop() {
    this.initCanvas();

    let lastTick: number = 0;

    const frame = (ms: number = 0) => {
      requestAnimationFrame(frame);
      if (window.scrollY > 500) return;

      const deltaTick = ms - lastTick;

      // limit to 30fps
      if(deltaTick > 1000 / 60) {

        if(this.ctxt) {
          if(this.canvas) {
            this.ctxt.globalAlpha = 1;
            this.ctxt.fillStyle = "#eee";
            this.ctxt.fillRect(0, 0, this.canvas.width, this.canvas.height);
          }

          this.ctxt.globalAlpha = 0.1;

          for (const text of this.renderableObjects) {

            const attributes: string[] = [];
            
            let i = 0;
            for (const attrib of text.uniforms) {
              const x = text.x;
              const timeScaler = 800;
              const t = (1 + Math.sin((Date.now() / timeScaler) + (x * 0.5) + (i * 10))) / 2;
              
              attributes.push(`'${attrib.name}' ${Math.floor(attrib.range[0] + t * (attrib.range[1] - attrib.range[0]))}`);
              i++;
            }

            // @ts-ignore
            this.canvas.style.fontVariationSettings = attributes.join(", ");

            this.ctxt.textBaseline = "middle";
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
