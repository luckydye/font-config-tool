import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

@customElement('font-selector')
export default class FontSelector extends LitElement {
  static get styles() {
    return css`
        :host {
            display: absolute;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-shadow: rgba(0, 0, 0, 0.05) 1px 2px 12px;
            background: #eee;
            border-radius: 4px;

            min-width: 200px;
            min-height: 100px;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: grey;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
    `;
  }

  close() {
    this.remove();
  }

  render() {
    return html`
      <div class="close-btn" @click="${() => this.close()}">X</div>
    `;
  }
}
