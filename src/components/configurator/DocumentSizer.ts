import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';
import State from '../../app/State';

@customElement('document-sizer')
export default class DocumentSizer extends LitElement {
  static get styles() {
    return css`
        :host {
            display: block;

            --document-width: 650px;
        }
        .container {
            width: var(--document-width);
            margin: auto;
            display: flex;
            position: relative;
        }
        .handle {
            padding: 0 5px;
            cursor: pointer;
        }
        .handle:active {
            background: #eee;
            border-radius: 4px;
        }
        .handle-left {
            cursor: w-resize;
            transform: translateX(-50%);
        }
        .handle-right {
            cursor: e-resize;
            transform: translateX(50%);
        }
        .line {
            width: 100%;
            position: relative;
        }
        .line::after {
            content: "";
            display: block;
            width: 100%;
            height: 1px;
            background: black;
            opacity: 0.125;
            top: 50%;
            position: absolute;
            left: 0;
        }

        .handle * {
          pointer-events: none;
        }

        .scale {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          padding: 0px 10px;
          background: white;
          z-index: 10;
          font-size: 12px;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.25);
          user-select: none;
          font-family: monospace;
        }
    `;
  }

  resizing = 0;

  documentWidth = 650;

  stepSize = 10;

  connectedCallback(): void {
    super.connectedCallback();

    if (this.shadowRoot) {
      let startWidth = 0;
      let startEvent: null | PointerEvent = null;

      this.shadowRoot.addEventListener('pointerdown', (e) => {
        const target = e.target as HTMLElement;
        if (target) {
          if (target.classList.contains('handle-left')) {
            this.resizing = -1;
            startEvent = e as PointerEvent;
            startWidth = this.documentWidth;
          }
          if (target.classList.contains('handle-right')) {
            this.resizing = 1;
            startEvent = e as PointerEvent;
            startWidth = this.documentWidth;
          }
        }
      });

      window.addEventListener('pointermove', (e) => {
        if (this.resizing !== 0) {
          if (startEvent) {
            const dir = this.resizing;
            const deltaMove = (e.clientX - startEvent.clientX) * 2 * dir;
            this.setWidth(Math.floor((startWidth + deltaMove) / this.stepSize) * this.stepSize);
          }
        }
      });

      window.addEventListener('pointerup', (e) => {
        if (this.resizing !== 0) {
          this.commitWidth();
        }
        this.resizing = 0;
      });
      window.addEventListener('pointercancel', (e) => {
        if (this.resizing !== 0) {
          this.commitWidth();
        }
        this.resizing = 0;
      });
    }

    State.on((e) => {
      this.setWidth(e.detail.document_width);
    });
  }

  commitWidth() {
    const ev = new CustomEvent('setstate', {
      bubbles: true,
      detail: {
        document_width: this.documentWidth,
      },
    });
    this.dispatchEvent(ev);
  }

  setWidth(value: number) {
    this.documentWidth = Math.min(Math.max(100, value), 1200);
    this.style.setProperty('--document-width', `${this.documentWidth}px`);
    document.body.style.setProperty('--document-width', `${this.documentWidth}px`);
    this.requestUpdate();
  }

  render() {
    return html`
        <div class="container">
            <div class="handle handle-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                    <rect width="10" height="3" fill="#333" opacity="0.5"/>
                    <path d="M5,0l5,6H0Z" transform="translate(10 10) rotate(180)" fill="#333" opacity="0.5"/>
                </svg>
            </div>
            <div class="scale">${this.documentWidth}px</div>
            <div class="line"></div>
            <div class="handle handle-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                    <rect width="10" height="3" fill="#333" opacity="0.5"/>
                    <path d="M5,0l5,6H0Z" transform="translate(10 10) rotate(180)" fill="#333" opacity="0.5"/>
                </svg>
            </div>
        </div>
    `;
  }
}
