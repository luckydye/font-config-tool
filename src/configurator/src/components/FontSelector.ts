import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators';
import Fonts, { Font } from '../app/Fonts';
import State from '../app/State';

@customElement('font-selector')
export default class FontSelector extends LitElement {
  close() {
    this.remove();
  }

  fonts: Array<Font> = [];

  filter = State.getState().font_filter || '';

  constructor() {
    super();

    this.updateList();

    window.addEventListener('state:update', () => {
      this.filter = State.getState().font_filter || '';
      this.updateList();
    });
  }

  updateList() {
    Fonts.getFontList().then((fonts) => {
      this.fonts = fonts.filter((font) => font.family.toLocaleLowerCase()
        .match(this.filter.toLocaleLowerCase()));
      this.requestUpdate();
    });
  }

  createRenderRoot() {
    return this;
  }

  value: Font | undefined;

  select(font: Font) {
    this.value = font;
    this.dispatchEvent(new Event('selected'));
  }

  render() {
    return html`
      <div class="font-selector">
        <app-state>
          <div class="close-btn" @click="${() => this.close()}">X</div>

          <div class="container">
            <span class="title">Font</span>
            <div class="toolbar">
              <input value="${this.filter}" state-key="font_filter" placeholder="Search Font" autofocus/>
              <!-- <link-button displayIcon="file_upload">Import Font</link-button> -->
            </div>

            <div class="font-list">
              ${this.fonts.filter(font => {
                return font.axes.length > 0;
              }).map((font) => html`
                <div class="font" @click="${() => { this.select(font); }}">

                  <link rel="stylesheet" href="${font.linkUrl}"/>

                  <style>
                    .font-config-${font.family.replace(' ', '-')} {
                      font-family: ${font.family}, monospace;
                    }
                  </style>

                  <div style="font-family: '${font.family}'" class="font-config-${font.family.replace(' ', '-')}">
                    <span class="name">${font.family}</span>
                  </div>
                  ${font.axes.length > 0 ? html`
                    <span title="Variable Font" class="variable-indicator">✔️</span>
                  ` : ''}
                  <span class="axes">Axes: </span><span class="axes">${font.axes.map(x => x.tag).join(', ')}</span>
                  <br>
                  <span class="creators">by ${font.creators.join(', ')}</span>
                </div>
              `)}
            </div>
          </div>
        </app-state>
      </div>
    `;
  }
}
