import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';
import FontSelector from './FontSelector';

@customElement('config-panel')
export default class ConfigPanel extends LitElement {
  static get styles() {
    return css`
        :host {
          display: block;
          width: 300px;
          box-shadow: rgb(0 0 0 / 5%) 1px 2px 12px;
          margin-bottom: 10px;
          border-radius: 4px;
          background: #EEEEEE;
        }

        .titlebar {
          padding: 8px 16px;
          text-align: left;
          cursor: pointer;
          user-select: none;
          display: flex;
          align-items: center;
        }

        .preview {
          font-weight: bold;
          font-size: 18px;
        }

        .title {
          margin-left: 10px;
          flex: 1;
          font-size: 14px;
        }

        .collapse-icon {
          transition: transform .15s ease;
        }

        :host([active]) .collapse-icon {
          transform: rotate(180deg);
        }

        .container {
          height: 100px;
          padding: 10px;
        }

        :host(:not([active])) .container {
          display: none;
        }

        link-button.feature {
          width: 100%;
          --background: var(--accent-color);
        }
    `;
  }

  openFontSelector() {
    const ele = new FontSelector();
    document.body.append(ele);
    ele.addEventListener('select', (e) => {
      console.log(e);
    });
  }

  render() {
    return html`
      <div class="titlebar">
        <span class="preview">Aa</span>
        <span class="title">Font Configuration 1</span>

        <span class="collapse-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="13.779" height="7.889" viewBox="0 0 13.779 7.889">
            <path d="M1844.64,390.485l5.475,5.475,5.475-5.475" transform="translate(1857.004 396.96) rotate(180)" fill="none"
              stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" opacity="0.5" /></svg>
        </span>
      </div>
      <div class="container">
        <link-button class="feature" displayIcon="list" @click="${() => this.openFontSelector()}">Font Family</link-button>
      </div>
    `;
  }
}
