import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('child-selector')
export default class ChildSelector extends LitElement {

  static get styles() {
    return css`
        :host {
            display: block;
        }
    `;
  }

  activeChild = 0;

  clickCallback(e: MouseEvent) {
    for (const child of this.children) {
      child.removeAttribute('active');

      if (e.target === child) {
        child.setAttribute('active', '');
      }
    }
  }

  render() {
    return html`
        <slot @click="${(e: MouseEvent) => this.clickCallback(e)}"></slot>
    `;
  }
}
