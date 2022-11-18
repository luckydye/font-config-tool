import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

@customElement('r-p')
export default class SpoilerHint extends LitElement {
  static get styles() {
    return css`
        :host {
            font-weight: var(--weight);
            font-variation-settings: 'wght' var(--weight);   
        }
    `;
  }

  constructor() {
    super();

    window.addEventListener('resize', () => {
      this.updateFormat();
    });
  }

  updateFormat() {
    const minSize = 900;
    const maxSize = 1920;
    const width = window.innerWidth;
    const winSize = (width - minSize) / (maxSize - minSize);
    const minWeight = 300;
    const maxWeight = 500;

    const fontWeight = winSize * (minWeight - maxWeight) + maxWeight;
    this.style.setProperty('--weight', `${fontWeight}`);
  }

  render() {
    return html`
        <slot></slot>
    `;
  }
}
