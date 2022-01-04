import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators';
import CanvasOverlayElement from './CanvasOverlay';
import State from '../../app/State';

@customElement('text-editor')
export default class Text extends LitElement {
  createRenderRoot() {
    return this;
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
          const node = mutation.addedNodes[0] as HTMLElement;
          if (node) {
            node.setAttribute('key', Math.floor(Math.random() * 10000000).toString());
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
    const children = [
      ...this.querySelectorAll('p'),
      ...this.querySelectorAll('h1'),
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
        this.lastActiveElement = document.activeElement;
        requestAnimationFrame(() => {
          this.updateTextChildren();
          this.showUIon(this.lastActiveElement as HTMLElement);
        });
      };
    }
  }

  uiNode: null | HTMLElement = null;

  showUIon(ele: HTMLElement | null) {
    const handleChange = () => {
      if (this.uiNode) {
        const { value } = this.uiNode as CanvasOverlayElement;

        if (this.lastActiveElement) {
          this.lastActiveElement.className = `font-config-${value}`;

          this.requestUpdate();
          const key = this.lastActiveElement.getAttribute('key');
          if (key) {
            State.setState('content', {
              [key]: {
                config: value,
              },
            });
          }
        }
      }
    };

    if (ele != null) {
      if (!this.uiNode) {
        this.uiNode = new CanvasOverlayElement();
        this.uiNode.addEventListener('change', handleChange);
        this.appendChild(this.uiNode);
      }

      const pos = ele.getClientRects()[0];
      this.uiNode.style.setProperty('--x', pos.x.toString());
      this.uiNode.style.setProperty('--y', (pos.y + 10).toString());
      this.uiNode.style.setProperty('--h', pos.height.toString());

      const key = ele.getAttribute('key');
      if (key) {
        const state = State.getState('content')[key];
        (this.uiNode as CanvasOverlayElement).value = state.config;
      }
    }

    if (this.uiNode && ele == null) {
      this.uiNode.removeEventListener('change', handleChange);
      this.uiNode.remove();
      this.uiNode = null;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    // zu überwachende Zielnode (target) auswählen

    // eigentliche Observierung starten und Zielnode und Konfiguration übergeben
    this.observer.observe(this, this.observerConfig);

    this.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        /* @ts-ignore: getSelection exists tho */
        // const selection = target.getSelection();
      }
    });

    // styles rendering

    const styles = document.createElement('style');
    if (this) {
      this.append(styles);
    }

    function renderConfigs(state: any) {
      styles.innerHTML = '';
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(state)) {
        if (key) {
          const config = State.getState('font-configs')[key];
          styles.innerHTML += `
            /*@FontFace*/

            @import "${config.font?.linkUrl}";

            .font-config-${key} {
              font-family: ${config.font?.family};
            }
          `;
        }
      }
    }

    State.onState('font-configs', () => {
      renderConfigs(State.getState('font-configs'));
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.observer.disconnect();
  }

  render() {
    const configs = State.getState('content');
    return html`
      <div class="text">
        <div id="text-container" contenteditable="true" spellcheck="false" tabindex="-1">
          <h1 key="923hf9239-f13f31f13f-dah97f3h2" class="font-config-${configs['923hf9239-f13f31f13f-dah97f3h2'].config}">Lorem Ipsum</h1>
          <p key="8934jfg43-f3h7239fhj-d217hhjim" class="font-config-${configs['8934jfg43-f3h7239fhj-d217hhjim'].config}">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
            justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
            ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
            et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
            est Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    `;
  }
}
