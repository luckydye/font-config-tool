import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';
import FontSelector from './FontSelector';
import State from '../app/State';
import './FluidInput';
import './NinjaInput';

const AxesTranslations: { [key: string]: string } = {
  wdth: 'wdth (Width)',
  wght: 'wght (Weight)',
  slnt: 'slnt (Slant)',
  opsz: 'opsz (Optical Size)',
  YTUC: 'YTUC (y transparent uppercase)',
  YTLC: 'YTLC (y transparent lowercase)',
  YTFI: 'YTFI (y transparent figures)',
  YTDE: 'YTDE (y transparent descender)',
  YTAS: 'YTAS (y transparent ascender)',
  YOPQ: 'YOPQ (y opaque)',
  XTRA: 'XTRA (x transparent)',
  XOPQ: 'XOPQ (x opaque)',
  GRAD: 'GRAD (Grade)',
  ital: 'ital (Italic)',
  CNTR: 'CNTR (Contrast)'
};

@customElement('config-panel')
export default class ConfigPanel extends LitElement {
  static get styles() {
    return css`
        :host {
          display: block;
          width: 250px;
          box-shadow: rgb(0 0 0 / 5%) 1px 2px 12px;
          margin-bottom: 10px;
          border-radius: 4px;
          background: rgb(225 225 225 / 76%);
          backdrop-filter: blur(8px);
          font-family: sans-serif;
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

        .label {
          opacity: 0.5;
          font-size: 12px;
          margin: 8px 0 2px 0;
        }

        .delete-btn {
          --padding: 2px;
          --background: transparent;
          --icon-size: 16px;
          opacity: 0.5;
        }
        .delete-btn:hover {
          opacity: 0.75;
          color: #661616;
        }

        .collapse-icon {
          margin-left: 10px;
          display: flex;
        }

        .collapse-icon svg {
          transition: transform .15s ease;
          transform-origin: 50% 50%;
        }
        :host([active]) .collapse-icon svg {
          transform: rotate(180deg);
        }

        .container {
          padding: 10px;
          text-align: left;
          max-height: 400px;
          overflow: auto;
        }

        :host(:not([active])) .container {
          display: none;
        }

        link-button.feature {
          width: 100%;
          --background: var(--accent-color);
        }

        fluid-input {
          width: 100%;
          font-size: 12px;
        }

        .selector {
          background: #e2e2e2;
          display: inline-flex;
          border-radius: 4px;
          margin-top: 5px;
        }
        .selector link-button {
          --background: #d1d1d1;
          --padding: 2px;
          --content: center;
        }
        .selector link-button:not(:last-child) {
          margin-right: 3px;
        }

        .selector link-button[active] {
          --background: var(--accent-color);
        }

        .grid {
          gap: 10px;
          display: grid;
          grid-auto-flow: column;
        }
    `;
  }

  font: any | undefined;

  value = State.getState('font-configs')[this.stateId];

  get stateId(): string {
    return this.getAttribute('state-key') || '';
  }

  constructor() {
    super();

    window.addEventListener('state:update', () => {
      this.value = State.getState('font-configs')[this.stateId];
      if (this.value) {
        this.font = this.value.font;
        this.requestUpdate();
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  openFontSelector() {
    const ele = new FontSelector();
    document.body.append(ele);
    ele.addEventListener('selected', () => {
      ele.close();
      this.font = ele.value;
      this.value.font = this.font;
      this.dispatchEvent(new Event('change', { bubbles: true }));
      this.requestUpdate();
    });
  }

  deleteConfig() {
    State.deleteState('font-configs', this.stateId);
  }

  render() {
    // TODO: I could just add the state key to the <app-state> in list renderings,
    //        I just have to give each item an app-state
    return html`
      <app-state type="font-configs">
        <div class="titlebar">
          <span class="preview font-config-${this.stateId}">Aa</span>
          <ninja-input state-key="${this.stateId}" state-name="title"
                      class="title" value="${this.value.title}"></ninja-input>

          <link-button class="delete-btn" displayIcon="delete"
            @click="${() => this.deleteConfig()}"></link-button>

          <span class="collapse-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="11.269" height="6.634" viewBox="0 0 11.269 6.634"><path d="M1844.64,390.485l4.22,4.22,4.22-4.22" transform="translate(-1843.226 -389.07)" fill="none" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" opacity="0.5"/></svg>
          </span>
        </div>
        <div class="container">
          <link-button class="feature" displayIcon="list" @click="${() => this.openFontSelector()}">${this.font?.family || 'Undefined'}</link-button>

          <div class="grid">
            <div>
              <div class="label">Alignment</div>
              <child-selector class="selector"
                state-key="${this.stateId}" state-name="format-align">
                <link-button displayIcon="format_align_left"></link-button>
                <link-button displayIcon="format_align_center"></link-button>
                <link-button displayIcon="format_align_right"></link-button>
                <link-button displayIcon="format_align_justify"></link-button>
              </child-selector>
            </div>
            <div>
              <div class="label">Transform</div>
              <child-selector class="selector"
                state-key="${this.stateId}" state-name="format-transform">
                <link-button displayIcon="close" title="None"></link-button>
                <link-button displayIcon="text_fields" title="Capitalize"></link-button>
                <link-button displayIcon="title" title="Uppercase"></link-button>
              </child-selector>
            </div>
          </div>

          <div>
            <div class="label">Decoration</div>
            <child-selector class="selector"
              state-key="${this.stateId}" state-name="format-decoration">
              <link-button displayIcon="close" title="None"></link-button>
              <link-button displayIcon="format_underlined" title="Underline"></link-button>
              <link-button displayIcon="format_strikethrough" title="Line Through"></link-button>
            </child-selector>
          </div>

          <div class="label">Size</div>
          <fluid-input value="${this.value['font-size'] || 16}" min="${9}" max="${120}" steps="${(200 - 9) / 200}"
            state-key="${this.stateId}" state-name="font-size" suffix="px"></fluid-input>
          <br>

          <div class="grid">
            <div>
              <div class="label">Line Height</div>
              <fluid-input value="${1}" min="${0}" max="${4}" steps="${0.1}" suffix="em"
                state-key="${this.stateId}" state-name="line-height"></fluid-input>
            </div>

            <div>
              <div class="label">Letter Spacing</div>
              <fluid-input value="${0}" min="${0}" max="${1}" steps="${0.01}" suffix="em"
                state-key="${this.stateId}" state-name="letter-spacing"></fluid-input>
            </div>
          </div>

          <div class="label">Italic</div>
          <fluid-input value="${0}" min="${0}" max="${1}" steps="${1}"
            state-key="${this.stateId}" state-name="font-italic"></fluid-input>
          <br>

          <br>

          ${this.font?.axes.length > 0 ? html`
            <div class="label">Available Axes</div>

            ${this.font?.axes.map((ax: { tag: string, min: number, max: number, defaultValue: number }) => html`
              <div class="label">${AxesTranslations[ax.tag] || ax.tag}</div>
              <fluid-input value="${this.value[`axes-${ax.tag}`] || ax.defaultValue}" min="${ax.min}" max="${ax.max}" steps="${(ax.max - ax.min) / 200}"
                state-key="${this.stateId}" state-name="axes-${ax.tag}"></fluid-input>
              <br>
            `)}
          ` : html`
            <div class="label">Not a variable font</div>
          `}
        </div>
      </app-state>
    `;
  }
}
