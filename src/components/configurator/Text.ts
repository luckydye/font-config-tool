import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators';
import CanvasOverlayElement from './CanvasOverlay';

@customElement('text-editor')
export default class Text extends LitElement {
  static get styles() {
    return css`
      :host {
        --default-document-width: 650px;

        display: block;
        padding-top: 20px;
        max-width: var(--document-width, var(--default-document-width));
        margin: auto;
        text-align: left;
      }

      [contenteditable] {
        outline: none;
      }

      * {
        position: relative;
        outline: none;
      }

      h1::before,
      h2::before,
      p::before {
        white-space: nowrap;
        opacity: 0.33;
        position: absolute;
        right: calc(100% + 40px);
        top: 50%;
        font-size: 12px;
        font-weight: normal;
        transform: translateY(-50%);
        pointer-events: none;
      }

      @media screen and (min-width: 1200px) {
        p::before {
          content: "Paragraph  –––––––––";
        }
        h1::before {
          content: "H1  –––––––––";
        }
        h2::before {
          content: "H2  –––––––––";
        }
      }

      h1[focus]::after,
      h2[focus]::after,
      p[focus]::after {
        content: "";
        position: absolute;
        top: -10px;
        left: -15px;
        width: calc(100% + 30px);
        height: calc(100% + 20px);
        border: 1px solid orange;
        border-radius: 4px;
        pointer-events: none;
        opacity: 0.5;
      }
    `;
  }

  observer: MutationObserver;

  observerConfig = {
    // attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  };

  lastActiveElement: Element | null = null;

  constructor() {
    super();

    window.addEventListener('click', () => {
      if (!this.contains(document.activeElement)) {
        this.clearFocus();
      }
    });

    // eine Instanz des Observers erzeugen
    this.observer = new MutationObserver(((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && (mutation.target as HTMLElement).id === 'text-container') {
          const node = mutation.addedNodes[0];
          if (node) {
            this.lastActiveElement = node as Element;
          }
          if (this.lastActiveElement === mutation.removedNodes[0]) {
            this.clearFocus();
          }
        }

        this.updateTextChildren();
      });
    }));
  }

  clearFocus() {
    this.lastActiveElement = null;
    this.showUIon(null);
    this.updateTextChildren();
  }

  updateTextChildren() {
    const root = this.shadowRoot;
    if (!root) return;

    const children = [
      ...root.querySelectorAll('p'),
      ...root.querySelectorAll('h1'),
    ];

    children.forEach((ele) => {
      ele.removeAttribute('focus');
    });

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      child.tabIndex = 0;

      if (child === this.lastActiveElement) {
        child.setAttribute('focus', '');
        this.showUIon(this.lastActiveElement as HTMLElement);
      }

      // focus handling
      child.onfocus = () => {
        this.lastActiveElement = root.activeElement;
        requestAnimationFrame(() => {
          this.updateTextChildren();
          this.showUIon(this.lastActiveElement as HTMLElement);
        });
      };
    }
  }

  uiNode: null | HTMLElement = null;

  showUIon(ele: HTMLElement | null) {
    if (ele != null) {
      if (!this.uiNode) {
        this.uiNode = new CanvasOverlayElement();
        this.appendChild(this.uiNode);
      }

      const pos = ele.getClientRects()[0];
      this.uiNode.style.setProperty('--x', pos.x.toString());
      this.uiNode.style.setProperty('--y', (pos.y + 10).toString());
      this.uiNode.style.setProperty('--h', pos.height.toString());
    }

    if (this.uiNode && ele == null) {
      this.uiNode.remove();
      this.uiNode = null;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    // zu überwachende Zielnode (target) auswählen
    const target = this.shadowRoot;

    if (target) {
      // eigentliche Observierung starten und Zielnode und Konfiguration übergeben
      this.observer.observe(target, this.observerConfig);

      this.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          /* @ts-ignore: getSelection exists tho */
          // const selection = target.getSelection();
        }
      });
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.observer.disconnect();
  }

  render() {
    return html`
      <div id="text-container" contenteditable="true" spellcheck="false" tabindex="-1">
        <h1>Lorem Ipsum</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
          eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
          et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
          est Lorem ipsum dolor sit amet.
        </p>
      </div>

      <slot></slot>
    `;
  }
}
