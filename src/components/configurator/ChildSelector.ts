import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

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
    for (let i = 0; i < this.children.length; i += 1) {
      const child = this.children[i];
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
