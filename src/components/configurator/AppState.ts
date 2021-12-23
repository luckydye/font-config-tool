import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators';

// This is a adapter element, that connects scoped dom elements
// to the internal application states using DOM events.

@customElement('app-state')
export default class AppState extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }
}
