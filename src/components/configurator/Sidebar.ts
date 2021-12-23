import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

@customElement('side-bar')
export default class SideBar extends LitElement {
  static get styles() {
    return css`
        :host {
            display: block;
        }
    `;
  }

  render() {
    return html`
        
    `;
  }
}
