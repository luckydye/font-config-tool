import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

@customElement('ninja-input')
export default class NinjaInput extends LitElement {
  static get styles() {
    return css`
        :host {
            display: block;
        }
        .value[contenteditable="true"] {
          cursor: text;
        }
        .value {

        }
    `;
  }

  static get properties() {
    return {
      value: {
        type: String,
      },
    };
  }

  value = '';

  enableInput() {
    const value = this.shadowRoot?.querySelector('.value') as HTMLElement;
    value.contentEditable = 'true';
    value.focus();
  }

  commitInput() {
    const value = this.shadowRoot?.querySelector('.value') as HTMLElement;
    value.contentEditable = 'false';
    this.value = value.innerText;

    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.commitInput();
    }
  }

  render() {
    return html`
        <div class="value"
        @keydown="${(e: KeyboardEvent) => this.handleKeyDown(e)}"
        @dblclick="${() => this.enableInput()}"
        @blur="${() => this.commitInput()}">
            ${this.value}
        </div>
    `;
  }
}
