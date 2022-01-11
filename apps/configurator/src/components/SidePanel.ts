import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';
import State from '../app/State';
import { uid4 } from '../app/utils';

@customElement('side-panel')
export default class SidePanel extends LitElement {
  constructor() {
    super();

    State.onState('font-configs', () => {
      this.requestUpdate();
    });
  }

  static get styles() {
    return css`
      link-button {
        width: 100%;
        opacity: 0.5;
        --background: #eee;
        --content: center;
        transition: opacity .15s ease-out;
      }
      link-button:hover {
        opacity: 1;
      }
    `;
  }

  addConfig() {
    State.setState('font-configs', {
      [uid4()]: {
        title: 'Paragraph',
        font: null,
      },
    });
    this.requestUpdate();
  }

  render() {
    const configs = State.getStateByType('font-configs');
    return html`
      <app-state type="font-configs">
        <child-selector>
          ${configs.map((key: string) => html`
            <config-panel state-key="${key}"></config-panel>
          `)}
        </child-selector>

        <div class="add-config-btn">
          <link-button displayicon="add" @click="${() => this.addConfig()}"></link-button>
        </div>
      </app-state>
    `;
  }
}
