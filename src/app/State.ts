export default class State {
  state = {};

  setState(newState: any) {
    this.state = Object.assign(this.state, newState);
    console.log('Set state', this.state);
  }

  getState() {
    return this.state;
  }

  static on(callback: (e: CustomEvent) => void) {
    document.addEventListener('state', ((e: CustomEvent) => {
      callback(e);
    }) as EventListener, true);
  }
}
