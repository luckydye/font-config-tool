import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators';

// This is a adapter element, that connects scoped dom elements
// to the internal application states using DOM events.

let documentState = {};

@customElement('app-state')
export default class AppState extends LitElement {
  constructor() {
    super();

    this.addEventListener('state', ((e: CustomEvent) => {
      documentState = Object.assign(documentState, e.detail);
    }) as EventListener);
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
