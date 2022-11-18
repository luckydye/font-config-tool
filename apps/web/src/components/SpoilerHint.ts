import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

@customElement('spoiler-hint')
export default class SpoilerHint extends LitElement {
  static get styles() {
    return css`
        :host {
            display: block;
        }
    `;
  }

  isShown = false;

  show() {
    this.isShown = true;
    this.requestUpdate();
  }

  render() {
    if (this.isShown) {
      return html`
          <slot></slot>
      `;
    }
    return html`
        <div>
          <link-button @click="${this.show.bind(this)}" displayIcon="">Show</link-button>
        </div>
      `;
  }
}
