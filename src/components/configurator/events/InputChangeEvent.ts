export default class InputChangeEvent extends Event {
  delta: number;

  constructor(delta: number) {
    super('change');
    this.delta = delta;
  }
}
