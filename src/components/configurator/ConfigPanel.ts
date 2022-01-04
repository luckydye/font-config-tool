import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';
import FontSelector from './FontSelector';
import State from '../../app/State';
import './FluidInput';

const AxesTranslations: { [key: string]: string } = {
  wdth: 'Width',
  wght: 'Weight',
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
          background: rgb(161 161 161 / 19%);
          backdrop-filter: blur(5px);
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
          font-size: 12px;
          margin: 8px 0 2px 0;
        }

        .collapse-icon {
          transition: transform .15s ease;
        }

        :host([active]) .collapse-icon {
          transform: rotate(180deg);
        }

        .container {
          padding: 10px;
          text-align: left;
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

  render() {
    return html`
      <div class="titlebar">
        <span class="preview font-config-${this.stateId}">Aa</span>
        <span class="title">${this.value.title}</span>

        <span class="collapse-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="13.779" height="7.889" viewBox="0 0 13.779 7.889">
            <path d="M1844.64,390.485l5.475,5.475,5.475-5.475" transform="translate(1857.004 396.96) rotate(180)" fill="none"
              stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" opacity="0.5" /></svg>
        </span>
      </div>
      <div class="container">
        <link-button class="feature" displayIcon="list" @click="${() => this.openFontSelector()}">${this.font?.family || 'Undefined'}</link-button>

        <app-state type="font-configs">
          <br>

          ${this.font.axes.length > 0 ? html`
            <div class="label">Available Axes</div>

            ${this.font.axes.map((ax: { tag: string, min: number, max: number, defaultValue: number }) => html`
              <div class="label">${AxesTranslations[ax.tag] || ax.tag}</div>
              <fluid-input value="${ax.defaultValue}" min="${ax.min}" max="${ax.max}" steps="${(ax.max - ax.min) / 200}"
                state-key="${this.stateId}" state-name="axes-${ax.tag}"></fluid-input>
              <br>
            `)}
          ` : html`
            <div class="label">Not a variable font</div>
          `}
        </app-state>
      </div>
    `;
  }
}
