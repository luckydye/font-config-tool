import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators';
import State from '../app/State';

// This is a adapter element, that connects scoped dom elements
// to the internal application states using DOM events.

@customElement('app-state')
export default class AppState extends LitElement {
  get stateType() {
    return this.getAttribute('type') || 'global';
  }

  constructor() {
    super();

    const handleEvent = ((e: CustomEvent) => {
      const target = e.target as HTMLInputElement;
      const key = target.getAttribute('state-key');
      const name = target.getAttribute('state-name');

      if (name != null && key != null) {
        const state = State.getState(this.stateType)[key];
        state[name] = target.value;
        State.setState(this.stateType, {
          [key]: state,
        });
        e.cancelBubble = true;
      } else if (key != null) {
        State.setState(this.stateType, {
          [key]: target.value,
        });
        e.cancelBubble = true;
      }
    }) as EventListener;

    // handle any change event
    this.addEventListener('change', handleEvent);

    // handle any input event
    this.addEventListener('input', handleEvent);
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
