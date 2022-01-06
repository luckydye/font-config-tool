import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';

@customElement('link-button')
export default class LinkButton extends LitElement {
  @property({ type: String })
  target: string | undefined;

  @property({ type: String })
  href: string | undefined;

  @property({ type: String })
  displayIcon = 'arrow_right_alt';

  static get styles() {
    return css`
        :host {
            display: inline-block;
            color: black;
            --padding: 5px 10px;
            --background: var(--accent-color, #eee);
            --content: space-between;
            --icon-size: 20px;
            font-size: 14px;
            font-weight: 600;
        }
        .open-link[href] {
            transform-origin: 5px 0px;
            transition: transform 0.125s ease-out 0s;
            display: inline-flex;
            align-items: center;
            justify-content: var(--content, space-between);
            line-height: 100%;
            justify-self: flex-start;
            padding: var(--padding, 4px 10px);
            background: var(--background, #eee);
            color: inherit;
            border-radius: 3px;
            border: 1px solid transparent;
            text-decoration: none;
            width: 100%;
            box-sizing: border-box;
        }
        .open-link:hover {

        }
        .open-link:active {
            transition: transform 0.01s ease-out 0s;
            border-color: #CCC;
        }
        .material-icons {
            display: var(--display-icon, "inline-block");
            font-display: block;
            font-size: var(--icon-size);
        }
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.onClick);
  }

  onClick(e: Event) {
    // nothing
  }

  render() {
    return html`
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css" />

        <a target="${this.target}" rel="noreferrer" class="open-link" href="${this.href !== undefined ? this.href : 'javascript:(() => {})()'}">
            <slot></slot> <span class="material-icons">${this.displayIcon}</span>
        </a>
    `;
  }
}
