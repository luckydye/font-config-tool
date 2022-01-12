import LinkButton from "ui/components/Button";
import { Action } from "../app/Action";
import { customElement, property } from 'lit/decorators';

@customElement('action-button')
export default class ActionButton extends LinkButton {

  @property({ type: String })
  action: string | undefined;

  onClick(e: Event): void {
    if(this.action) {
      Action.execute(this.action, [], e);
    }
  }

}
