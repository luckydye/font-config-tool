export default class DataChangeEvent extends Event {
  key: string;

  value: string;

  constructor(key: string, value: string) {
    super('change');
    this.key = key;
    this.value = value;
  }
}
