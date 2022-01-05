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

  connectedCallback() {
    super.connectedCallback();
    this.updateChildren();
  }

  activeChild = 0;

  value = this.activeChild;

  updateChildren() {
    for (let i = 0; i < this.children.length; i += 1) {
      const child = this.children[i];
      child.removeAttribute('active');

      if (i === this.activeChild) {
        child.setAttribute('active', '');
      }
    }
  }

  clickCallback(e: MouseEvent) {
    for (let i = 0; i < this.children.length; i += 1) {
      const child = this.children[i];
      if (e.target === child) {
        this.value = i;

        if (this.activeChild !== i) {
          this.dispatchEvent(new Event('change', { bubbles: true }));
        }
        this.activeChild = i;
      }
    }

    this.updateChildren();
  }

  render() {
    return html`
        <slot @click="${(e: MouseEvent) => this.clickCallback(e)}"></slot>
    `;
  }
}
