import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators';
import State from '../../app/State';

// This is a adapter element, that connects scoped dom elements
// to the internal application states using DOM events.

@customElement('app-state')
export default class AppState extends LitElement {
  state = new State();

  constructor() {
    super();

    this.addEventListener('setstate', ((e: CustomEvent) => {
      this.state.setState(e.detail);

      const ev = new CustomEvent('state', {
        detail: this.state.getState(),
      });
      this.dispatchEvent(ev);
    }) as EventListener);
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
