import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('link-button')
export default class LinkButton extends LitElement {

  @property({ type: String })
  target: string | undefined;

  @property({ type: String })
  href: string | undefined;

  @property({ type: String })
  displayIcon: string;

  static get styles() {
    return css`
        :host {
            display: inline-block;
            color: black;
            --padding: 5px 10px;
            --background: var(--accent-color, #eee);
            font-size: 14px;
            font-weight: 600;
        }
        .open-link[href] {
            transform-origin: 5px 0px;
            transition: transform 0.125s ease-out 0s;
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;
            line-height: 100%;
            justify-self: flex-start;
            padding: var(--padding, 4px 10px);
            background: var(--background, #eee);
            color: inherit;
            border-radius: 3px;
            text-decoration: none;
        }
        .open-link:hover {
            transform: translate(1px, 0);
        }
        .open-link:active {
            transition: transform 0.01s ease-out 0s;
            transform: translate(1px, 0.5px);
        }
        .material-icons {
            margin: 0 5px;
            display: var(--display-icon, "inline-block");
            font-display: block;
            font-size: 20px;
            margin-right: -2px;
            margin-left: 15x;
        }
    `;
  }

  constructor() {
    super();

    this.displayIcon = 'arrow_right_alt';
  }

  render() {
    return html`
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css" />
        
        <a target="${this.target}" rel="noreferrer" class="open-link" href="${this.href !== undefined ? this.href : 'javascript:()'}">
            <slot></slot> <span class="material-icons">${this.displayIcon}</span>
        </a>
    `;
  }
}
