type StateObject = {
  [key: string]: any
}

let state: StateObject = {};

export default class State {
  static setState(newState: any) {
    state = Object.assign(state, newState);

    const ev = new Event('state:update');
    window.dispatchEvent(ev);

    localStorage.setItem('app-state', JSON.stringify(state));
  }

  static onState(callback: (s: StateObject) => void) {
    window.addEventListener('state:update', () => {
      callback(State.getState());
    });
  }

  static getState() {
    return state;
  }
}

declare global {
  interface Window { State: State; }
}
window.State = State;
