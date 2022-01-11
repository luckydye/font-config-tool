import { LitElement, html, css, PropertyDeclarations } from 'lit';
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

  static get properties() {
    return {
      activechild: {
        type: Number
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateChildren();
  }

  activechild = 0;

  value = this.activechild;

  updated(): void {
    this.updateChildren();
  }

  updateChildren() {
    for (let i = 0; i < this.children.length; i += 1) {
      const child = this.children[i];
      child.removeAttribute('active');

      if (i === this.activechild) {
        child.setAttribute('active', '');
      }
    }
  }

  clickCallback(e: MouseEvent) {
    for (let i = 0; i < this.children.length; i += 1) {
      const child = this.children[i];
      if (e.target === child) {
        this.value = i;

        if (this.activechild !== i) {
          this.dispatchEvent(new Event('change', { bubbles: true }));
        }
        this.activechild = i;
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
