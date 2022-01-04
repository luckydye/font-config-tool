import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';
import State from '../../app/State';

@customElement('side-panel')
export default class SidePanel extends LitElement {
  static get styles() {
    return css`

    `;
  }

  constructor() {
    super();

    State.onState('font-configs', () => {
      this.requestUpdate();
    });
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
      </app-state>
    `;
  }
}
