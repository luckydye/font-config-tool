import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators';
import State from '../../app/State';

// This is a adapter element, that connects scoped dom elements
// to the internal application states using DOM events.

@customElement('app-state')
export default class AppState extends LitElement {
  constructor() {
    super();

    this.addEventListener('state', ((e: CustomEvent) => {
      console.log('state event', e.detail);
      State.setState(e.detail);
    }) as EventListener);
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
