import {
  LitElement, html, css,
} from 'lit';
import { customElement } from 'lit/decorators';
import DropdownButton from './DropdownButton';
import State from '../app/State';

@customElement('canvas-overlay-element')
export default class CanvasOverlayElement extends LitElement {
  typeDropDown: any;

  constructor() {
    super();

    this.state();
  }

  set value(val) {
    this.typeDropDown.value = val;
  }

  get value() {
    return this.typeDropDown.value;
  }

  state() {
    const ids = State.getStateByType('font-configs');
    const options = ids.map((key, i) => ({
      name: State.getState('font-configs')[key].title,
      value: key,
    }));

    this.typeDropDown = new DropdownButton(options);
    this.typeDropDown.addEventListener('change', () => {
      this.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  static get styles() {
    return css`
      :host {
          --x: NaN;
          --y: NaN;
          --h: 0;

          position: fixed;
          top: calc(var(--y) * 1px + var(--h) * 1px);
          left: calc(var(--x) * 1px);
          margin-top: 10px;
          pointer-events: all;
          padding: 5px;
          border-radius: 4px;
          background: rgb(215 215 215 / 75%);
          box-shadow: 1px 3px 8px rgb(0 0 0 / 10%);
          border: 1px solid rgb(215 215 215 / 75%);
          backdrop-filter: blur(4px);
          user-select: none;
          z-index: 100000;
          transform-origin: 10px -40px;
      }
      :host {
          opacity: 1;
          animation: show .15s ease;
          transition: opacity .075s ease-out,
                      transform .1s ease-out,
                      clip-path .1s ease-out,
                      left .15s ease,
                      top .15s ease;
      }
      @keyframes show {
        from {
          opacity: 0;
          clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
        }
        to {
          clip-path: polygon(0 -20px, 100% 0, 100% 100%, 0% 100%);
        }
      }
      @keyframes hide {
        from {
          clip-path: polygon(0 -20px, 100% 0, 100% 100%, 0% 100%);
        }
        to {
          clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
          opacity: 0;
        }
      }
      :host([invisible]) {
          animation: hide .075s ease-out;
          opacity: 0;
          transform: scale(0.95);
          pointer-events: none;
      }

      .container-corner {
          position: absolute;
          bottom: 100%;
          left: 10px;
          display: block;
          fill: rgb(215 215 215 / 75%);
      }
      .container {
          display: flex;
      }
      .container > *:not(:last-child) {
          margin-right: 5px;
      }
      svg {
          display: block;
      }
    `;
  }

  render() {
    return html`
        <div class="container-corner">
            <svg width="15.3px" height="8.1px" viewBox="0 0 15.3 8.1" xml:space="preserve">
                <path class="st0" d="M15.3,7.5L8.6,0.4c-0.5-0.6-1.4-0.6-1.9,0L0,7.5H15.3z"/>
            </svg>
        </div>
        <div class="container">
          ${this.typeDropDown}
        </div>
    `;
  }
}
