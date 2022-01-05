import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

// Fine in Firefox, but bad in all other

@customElement('header-background')
export default class HeaderBackground extends LitElement {

  static get styles() {
    return css`
        :host {
            display: block;
            transform: translateZ(0) translateY(calc(var(--scrollY) * 0.2));
        }
        svg, svg {
          width: 1920px;
          left: 50%;
          position: absolute;
          top: 0;
          transform: translate(-50%, 0);
        }
    `;
  }

  svg: SVGImageElement | null = null;
  ctxt: CanvasRenderingContext2D | null = null;
  canvas: HTMLCanvasElement | null = null;

  firstUpdated() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1920;
    this.canvas.height = 560;

    this.ctxt = this.canvas.getContext("2d");

    fetch('/header_graphic.svg').then(res => res.text()).then(txt => {
      const ele = document.createElement("div");
      ele.innerHTML = txt;
      this.svg = ele.children[0] as SVGImageElement;
      this.requestUpdate();
      this.animationLoop();
    })
  }

  animationLoop() {
    const svg = this.svg;

    const attributes = [
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
    ]

    const getRandomAttrib = () => {
      return attributes[Math.floor(Math.random() * attributes.length)];
    }

    const frame = () => {
      setTimeout(frame, 1000 / 30);

      if (window.scrollY > 500) return;

      const texts = svg?.querySelectorAll('text');
      for (const text of (texts || [])) {

        if (!text.hasAttribute("vars")) {
          text.setAttribute('vars', [getRandomAttrib().name, getRandomAttrib().name].join(","));
          text.style.textAnchor = "middle";
          requestAnimationFrame(() => {
            text.setAttribute('xpos', text.getBBox().x.toString());
          })
        }
        const ats = text.getAttribute('vars');

        if (ats) {
          for (const attr of ats.split(",")) {
            const attrib = attributes.find(atr => atr.name === attr);

            const x = +(text.getAttribute("xpos") || 0);
            const timeScaler = 800;
            const t = (1 + Math.sin((Date.now() / timeScaler) + (x * 0.5))) / 2;
            
            // @ts-ignore
            text.style.fontVariationSettings = `'${attrib.name}' ${Math.floor(attrib.range[0] + t * (attrib.range[1] - attrib.range[0]))}`;
          }
        }
      }
    }

    frame();
  }

  render() {
    return html`
        ${this.svg}
    `;
  }
}
