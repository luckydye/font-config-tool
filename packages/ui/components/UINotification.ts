import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

enum UINtoeType {
  TEXT,
}

@customElement('ui-notification')
export class UINotificationElement extends LitElement {

  static get styles() {
    return css`
        :host {
          padding: 10px 20px;
          background: #e8e8e8;
          box-shadow: rgb(0 0 0 / 5%) 1px 2px 5px;
          border-radius: 4px;
          display: block;
          color: #333;
          font-size: 12px;
          opacity: 0.98;
          min-width: 150px;
          animation: 0.15s ease 0s 1 normal none running slide-in;
          user-select: none;
          cursor: pointer;
          margin-bottom: 10px;
          position: relative;
          overflow: hidden;
        }
        :host(:hover::after) {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: white;
          opacity: 0.025;
        }
        :host(:active::after) {
          background: black;
        }
        @keyframes slide-in {
          from { transform: translateY(100%); opacity: 0; }
        }
        @keyframes fade-out {
          to { opacity: 0; }
        }
    `;
  }

  content = "";

  constructor(content: string) {
    super();

    this.content = content;
  }

  render() {
    return html`
        <div>
          ${this.content}
        </div>
    `;
  }

}

export default class UINotification {

  text = "";
  time = 2000;
  type: number = UINtoeType.TEXT;
  onclick: any | undefined;

  constructor({
    text = "",
    time = 3000,
    type = UINtoeType.TEXT
  } = {}) {
    this.text = text;
    this.time = time;
    this.type = type;
  }

  onClick(callback: any) {
    this.onclick = callback;
  }

  show() {
    const time = this.time;

    const container = document.querySelector('notifications') || document.createElement('notifications');

    if (!container.parentNode) {
      document.body.appendChild(container);
    }

    const note = new UINotificationElement(this.text);

    function close() {
      note.style.setProperty("animation", "fade-out .25s ease");
      setTimeout(() => { note.remove(); }, 200);
    }

    const timer = setTimeout(() => close(), time);

    note.onclick = () => {
      clearTimeout(timer);
      this.onclick && this.onclick(this);
      close();
    }

    container.appendChild(note);

    return this;
  }
}

