import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators';
import State from '../../app/State';

// This is a adapter element, that connects scoped dom elements
// to the internal application states using DOM events.

@customElement('app-state')
export default class AppState extends LitElement {
  constructor() {
    super();

    // handle custom state events with data
    this.addEventListener('state', ((e: CustomEvent) => {
      console.log('state event', e.detail);
      State.setState(e.detail);
    }) as EventListener);

    // handle any change event
    this.addEventListener('change', ((e: CustomEvent) => {
      const target = e.target as HTMLInputElement;
      const key = target.getAttribute('state-key');

      if (key != null) {
        State.setState({
          [key]: target.value,
        });
      }
    }) as EventListener);
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
