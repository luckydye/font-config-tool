export default class InputChangeEvent extends Event {
  delta: number;

  constructor(delta: number) {
    super('change', { bubbles: true });
    this.delta = delta;
  }
}
