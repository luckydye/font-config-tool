import {
  html, css, LitElement, CSSResultGroup,
} from 'lit';
import { customElement } from 'lit/decorators';
import InputChangeEvent from './events/InputChangeEvent';

function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

@customElement('fluid-input')
export default class FluidInput extends LitElement {
  static get styles(): CSSResultGroup | undefined {
    return css`
      :host {
        display: inline-block;
        height: 28px;
        width: 85px;

        --color-input-background: #1B1B1B;
        --color-input-hover-background: #202020;
        --color-input-active-background: #373737;
      }

      .input-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--color-input-background);
          border-radius: 4px;
          cursor: e-resize;
          position: relative;
          overflow: hidden;
      }

      .input-container:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: calc(100% * var(--value));
          pointer-events: none;
          background: white;
          opacity: 0.025;
      }

      .input-container[active]:before {
          opacity: 0.1;
      }

      .input-container:hover {
          background: var(--color-input-hover-background);
      }

      .input-container[active] {
          background: var(--color-input-active-background);
      }

      .value-container {
          white-space: nowrap;
          height: 100%;
      }

      .input-value {
          cursor: e-resize;
          height: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          margin: 0 -10px;
          width: auto;
          padding: 0;
          color: inherit;
          font-family: inherit;
          font-size: inherit;
          text-align: center;
      }

      .input-value:focus {
          cursor: text;
      }

      .value-suffix {
          opacity: 0.5;
          pointer-events: none;
          margin-left: 2px;
      }

      .input-value:focus {
          outline: none;
          cursor: text;
      }

      .arrow {
          padding: 0 6px;
          height: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          opacity: 0.75;
          position: absolute;
      }

      .left-arrow {
          left: 0;
      }
      .right-arrow {
          right: 0;
      }

      .arrow:hover {
          background: rgba(255, 255, 255, 0.05);
      }

      .arrow:active {
          background: rgba(255, 255, 255, 0.01);
      }

      .arrow svg {
          fill: none;
          stroke: var(--color-text, #eee);
          stroke-width: 1.25px;
          stroke-linecap: round;
      }
    `;
  }

  render() {
    return html`
      <div class="input-container">
          <span class="arrow left-arrow">
              <svg x="0px" y="0px" width="7.3px" height="11px" viewBox="0 0 7.3 12.5">
                  <polyline class="st0" points="6.3,1 1,6.3 6.3,11.5 "/>
              </svg>
          </span>
          <span class="value-container">
              <input class="input-value"></input>
              ${this.suffix ? html`
                  <span class="value-suffix">${this.suffix}</span>
              ` : ''}
          </span>
          <span class="arrow right-arrow">
              <svg x="0px" y="0px" width="7.3px" height="11px" viewBox="0 0 7.3 12.5">
                  <polyline class="st0" points="1,11.5 6.3,6.3 1,1 "/>
              </svg>
          </span>
      </div>
    `;
  }

  internalValue: number;

  internalMin: number;

  internalMax: number;

  internalSteps: number;

  input: HTMLElement | null;

  inputValue: HTMLInputElement | null;

  leftArrow: HTMLElement | null;

  rightArrow: HTMLElement | null;

  static get observedAttributes() {
    return ['value', 'min', 'max', 'steps'];
  }

  get value() { return this.internalValue; }

  set value(val) {
    this.internalValue = +val;
    this.update();
  }

  get min() { return this.internalMin; }

  set min(val) {
    this.internalMin = +val;
    this.update();
  }

  get max() { return this.internalMax; }

  set max(val) {
    this.internalMax = +val;
    this.update();
  }

  get steps() { return this.internalSteps; }

  set steps(val) {
    this.internalSteps = +val;
    this.update();
  }

  get suffix() { return this.getAttribute('suffix'); }

  get isRange() {
    return this.max || this.min;
  }

  constructor() {
    super();

    this.internalValue = 0.2;
    this.internalMin = 0;
    this.internalMax = 0;
    this.internalSteps = 0.1;

    this.attachShadow({ mode: 'open' });
    this.render();

    if (this.shadowRoot) {
      this.input = this.shadowRoot.querySelector('.input-container');
      this.inputValue = this.shadowRoot.querySelector('.input-value');

      this.leftArrow = this.shadowRoot.querySelector('.left-arrow');
      this.rightArrow = this.shadowRoot.querySelector('.right-arrow');
    }

    this.registerHandlers();
    this.update();
  }

  registerHandlers() {
    let startPos: number | null = null;
    let startMovePos: number | null = null;
    let startValue = this.value;
    let focused = false;

    const cancel = () => {
      startPos = null;
      startMovePos = null;
      if (this.input) {
        this.input.removeAttribute('active');
      }
    };

    if (this.inputValue) {
      this.inputValue.addEventListener('click', (e) => {
        if (this.inputValue) {
          this.inputValue.disabled = false;
          focused = true;

          this.inputValue.focus();
        }
      });
    }

    const up = (e) => {
      cancel();
    };
    const start = (e) => {
      if (e.x === undefined) {
        e.x = e.touches[0].clientX;
        e.y = e.touches[0].clientY;
      }

      if (!focused) {
        startPos = [e.x, e.y];
        startValue = this.value;
        this.input.setAttribute('active', '');
        e.preventDefault();
      }
    };
    const move = (e) => {
      if (e.x === undefined) {
        e.x = e.touches[0].clientX;
        e.y = e.touches[0].clientY;
      }

      if (startPos) {
        if (Math.abs(e.x - startPos[0]) > 10) {
          startMovePos = [e.x, e.y];
        }
      }
      if (startMovePos && startPos) {
        // apply shift key scaler
        let scale = e.shiftKey ? 0.0005 : 0.005;
        // scale to min max range
        if (this.max - this.min > 0) {
          scale *= (this.max - this.min) / 4;
        }

        // set value by absolute delta movement * scale
        let absolute = startValue + ((e.x - startPos[0]) * scale);
        // apply steps
        absolute -= (absolute % this.steps);

        this.setValue(absolute);
        e.preventDefault();
      }
    };

    const submit = () => {
      if (Number.isNaN(this.inputValue.value)) {
        try {
          const evalValue = math.evaluate(this.inputValue.value);
          this.setValue(evalValue);
        } catch (err) {
          console.log(err);
        }

        cancelInput();
      } else {
        this.setValue(parseFloat(this.inputValue.value));
        this.inputValue.disabled = true;
        focused = false;
      }
    };

    const cancelInput = () => {
      this.setValue(this.value);
      this.inputValue.disabled = true;
      focused = false;
    };

    const input = (e) => {
      if (e.key === 'Enter') {
        submit();
      } else if (e.key === 'Escape') {
        cancelInput();
      }
    };

    this.inputValue.addEventListener('blur', submit);
    this.inputValue.addEventListener('keydown', input);

    // mouse
    this.input.addEventListener('mousedown', start);
    window.addEventListener('mousemove', move);

    // touch
    this.input.addEventListener('touchstart', start);
    window.addEventListener('touchmove', move);

    // touch
    window.addEventListener('touchend', up);
    window.addEventListener('touchcancel', up);

    // mouse
    window.addEventListener('mouseup', up);
    window.addEventListener('mousecancel', up);
    window.addEventListener('mouseleave', up);

    this.leftArrow.addEventListener('click', (e) => {
      this.setValue(this.value - this.steps);
      e.preventDefault();
    });
    this.rightArrow.addEventListener('click', (e) => {
      this.setValue(this.value + this.steps);
      e.preventDefault();
    });

    // touch
    this.addEventListener('touchstart', (e) => {
      if (!startPos && !focused) {
        e.preventDefault();
      }
    });

    // mouse
    this.addEventListener('mousedown', (e) => {
      if (!startPos && !focused) {
        e.preventDefault();
      }
    });
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'value') {
      this.setValue(+newValue);
    }
    if (name === 'min') {
      this.min = +newValue;
    }
    if (name === 'max') {
      this.max = +newValue;
    }
    if (name === 'steps') {
      this.steps = +newValue;
    }
  }

  update() {
    if (this.isRange) {
      this.input.style.setProperty('--value', map(this.value, this.min, this.max, 0, 1));
    }

    const getPrecision = (n) => {
      const precParts = n.toString().split('.');
      const size = precParts[1] ? precParts[1].length : 0;

      // return 0 if precision is smaller then .000
      if (precParts[1] && precParts[1].substring(0, 3) === '000') {
        return 0;
      }

      return size;
    };

    const valuePrecision = getPrecision(this.value);
    const stepsPrecision = getPrecision(this.steps);

    const precision = valuePrecision > stepsPrecision ? stepsPrecision : valuePrecision;

    this.inputValue.value = this.value.toFixed(precision);
    this.inputValue.size = this.inputValue.value.length;
  }

  setValue(value: number) {
    const latValue = this.value;

    if (this.isRange) {
      this.value = Math.min(Math.max(value, this.min), this.max);
    } else {
      this.value = value;
    }

    this.dispatchEvent(new InputChangeEvent(this.value - latValue));
  }
}
