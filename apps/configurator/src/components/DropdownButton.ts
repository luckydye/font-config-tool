import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

interface Option {
  name: string,
  value: any
}

@customElement('dropdown-button')
export default class DropdownButton extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        outline: none;
        color: white;
        font-family: sans-serif;
        font-size: 12px;
        text-transform: capitalize;
      }

      .btn {
        width: auto;
        line-height: 15px;
        cursor: pointer;
        padding: 6px 12px;
        min-width: 40px;
        border-radius: 4px;
        box-sizing: content-box;
        background: rgba(15, 15, 15, 0.5);
        overflow: hidden;
      }

      .btn:focus {
        background: rgba(52, 52, 52, 0.75);
      }

      .btn:hover {
        background: rgba(52, 52, 52, 0.75);
      }

      :host([active]) {
        z-index: 1000;
      }

      :host([active]) .options {
        visibility: visible;
        animation: show .1s ease-out;
        transition: visibility 0s 0s ease;
      }

      .options {
        visibility: hidden;
        position: absolute;
        top: 100%;
        margin-top: 2px;
        left: 0;
        background: rgba(25, 25, 25, 1);
        border-radius: 4px;
        overflow: hidden;
        min-width: 100%;
        animation: hide .1s ease-out both;
        transition: visibility 0s .1s ease;
        text-align: left;
      }

      .options span {
        padding: 5px 10px;
        display: block;
        cursor: pointer;
        width: max-content;
        min-width: 100%;
      }

      .options span:hover {
        background: rgba(100, 100, 100, 0.75);
      }

      .options span:active {
        filter: brightness(0.9);
      }

      .value {
        position: relative;
        padding-right: 15px;
      }

      .value::after {
        content: url("data:image/svg+xml,%3C!-- Generator: Adobe Illustrator 22.0.1, SVG Export Plug-In --%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:a='http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/' x='0px' y='0px' width='7px' height='5.8px' viewBox='0 0 7 5.8' style='enable-background:new 0 0 7 5.8;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFFFFF;%7D%0A%3C/style%3E%3Cdefs%3E%3C/defs%3E%3Cpolygon class='st0' points='0,0 3.5,5.8 7,0 '/%3E%3C/svg%3E%0A");
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      :host([active]) .value::after {
        transform: translateY(-50%) rotate(180deg);
      }

      @keyframes show {
          from {
              clip-path: polygon(100% 0, 0 0, 0 0, 100% 0);
          }
          to {
              clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%);
          }
      }
      @keyframes hide {
          from {
              clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%);
          }
          to {
              clip-path: polygon(100% 0, 0 0, 0 0, 100% 0);
          }
      }
    `;
  }

  static get properties() {
    return {
      value: {
        type: String,
      },
    };
  }

  currentOption: undefined | Option = undefined;

  get value(): undefined | string {
    return this.currentOption?.value;
  }

  set value(val) {
    // eslint-disable-next-line no-restricted-syntax
    for (const optn of this.options) {
      if (optn.value === val) {
        this.currentOption = optn;
        this.requestUpdate();
        break;
      }
    }
  }

  options: Array<Option> = [];

  onSelect(opt: Option): void {
    this.value = opt.value;
    this.dispatchEvent(new Event('change', { bubbles: true }));
    this.requestUpdate();
    this.close();
  }

  constructor(optns: Array<Option> | undefined) {
    super();

    if (optns) {
      this.options = optns;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.tabIndex = 0;

    this.addEventListener('blur', () => {
      this.close();
    });

    // use html markup as options
    if (this.options && this.options.length < 1) {
      const childOptions: Array<Option> = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const child of this.children) {
        const name = child.getAttribute('name');
        if (name != null) {
          childOptions.push({
            name,
            value: child.getAttribute('value'),
          });
        }
      }
      this.options = childOptions;
    }
  }

  getTitle(val: string): string | undefined {
    // eslint-disable-next-line no-restricted-syntax
    for (const optn of this.options) {
      if (optn.value === val) {
        return optn.name;
      }
    }
    return undefined;
  }

  render() {
    const options = this.options || [];

    const els = options[0] ? options[0]?.name : 'none';

    return html`
      <div class="btn" @click="${this.toggle}">
        <div class="value">
          ${this.value ? this.getTitle(this.value) : els}
        </div>
      </div>
      <div class="options">
        ${options.map((opt) => html`<span @click=${() => this.onSelect(opt)}>${opt.name}</span>`)}
      </div>
    `;
  }

  close() {
    this.removeAttribute('active');
  }

  open() {
    this.setAttribute('active', '');
  }

  toggle() {
    if (this.hasAttribute('active')) {
      this.close();
    } else {
      this.open();
    }
  }
}
