import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

@customElement('sample-sldier')
export default class SampleSlider extends LitElement {
  lastActiveChild = 0;

  activeChild = 0;

  updateSlide() {
    // set new slides position ---- assuming all slides have the same width
    const childWidth = this.children[0].clientWidth;
    this.style.setProperty('--pos', `${this.activeChild * childWidth}px`);
    this.style.setProperty('--prev-pos', `${this.lastActiveChild * childWidth}px`);

    // initiate transition animation
    if (this.lastActiveChild !== this.activeChild) {
      this.setAttribute('transitioning', '');

      if (this.lastActiveChild > this.activeChild) {
        this.style.setProperty('--dir', '1');
      } else {
        this.style.setProperty('--dir', '-1');
      }
    }

    // give active child active attribute
    for (let i = 0; i < this.children.length; i += 1) {
      const child = this.children[i];
      child.removeAttribute('active');
      if (this.children[this.activeChild] === child) {
        child.setAttribute('active', '');
      }
    }

    const slides = this.shadowRoot?.querySelector('.slides') as HTMLElement;

    // reset transition animation
    if(slides) {
      slides.onanimationend = () => {
        this.removeAttribute('transitioning');
        slides.onanimationend = null;
      }
    }

    // update template
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateSlide();
  }

  next() {
    this.setSlide(this.activeChild + 1);
  }

  prev() {
    this.setSlide(this.activeChild - 1);
  }

  setSlide(index: number) {
    this.lastActiveChild = this.activeChild;
    this.activeChild = Math.max(Math.min(index, this.children.length - 1), 0);
    this.updateSlide();

    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  static get styles() {
    return css`
        :host {
            display: block;
        }
        .container {
          position: relative;
        }
        .slides {
          display: flex;
          transition: transform 3s cubic-bezier(0.67, 0.05, 0.18, 0.97) 0s;
          transform: translateX(calc(var(--pos) * -1));
        }

        :host([transitioning]) .slides {
          animation: slide 0.5s cubic-bezier(0.67, 0.05, 0.18, 0.97);
        }

        @keyframes slide {
          0% {
            transform: translateX(calc(var(--prev-pos) * -1));
          }
          90% {
            transform: translateX(calc(var(--pos) * -1));
          }
          100% {
            transform: translateX(calc(var(--pos) * -1));
          }
        }

        .arrow {
          z-index: 1000;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          padding: 15px 8px;
          border-radius: 4px;
          background: #eee;
          user-select: none;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .arrow:hover {
          transform: translateY(-50%) scale(1.05);
          box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.05);
        }
        .arrow:active {
          transition: transform .02s ease, box-shadow .02s ease;
          transform: translateY(-50%) scale(1);
          background: #DDD;
        }
        .arrow-left {
          right: 90%;
        }
        .arrow-right {
          left: 90%;
        }
        .arrow svg {
          display: block;
        }
        .arrow[disabled] {
          opacity: 0.5;
          pointer-events: none;
        }
    `;
  }

  render() {
    return html`
      <div class="container">
        <div class="arrow arrow-left" @click="${this.prev}" ?disabled="${this.activeChild <= 0}">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.713 34.356">
            <path id="Pfad_1" data-name="Pfad 1" d="M-403.662,284.6l15.41-15.41,15.41,15.41" transform="translate(-265.653 -371.074) rotate(-90)" fill="none" stroke="#707070" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
          </svg>
        </div>

        <div class="slides">
          <slot></slot>
        </div>

        <div class="arrow arrow-right" @click="${this.next}" ?disabled="${this.activeChild >= this.children.length - 1}">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 21.446 37.891">
            <path id="Pfad_2" data-name="Pfad 2" d="M-403.662,284.6l15.41-15.41,15.41,15.41" transform="translate(288.134 407.197) rotate(90)" fill="none" stroke="#707070" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
          </svg>
        </div>
      </div>
    `;
  }
}
