import DefaultState from './DefaultState';

type StateObject = {
  [key: string]: any
}

let state: StateObject = JSON.parse(JSON.stringify(DefaultState));

export default class State {
  static setState(stateId: string, newState: any) {
    // deep copy new state and save to global state
    state[stateId] = Object.assign(state[stateId] || {}, JSON.parse(JSON.stringify(newState)));

    const ev = new Event('state:update');
    window.dispatchEvent(ev);
    localStorage.setItem('app-state', JSON.stringify(state));
  }

  static deleteState(stateId: string, stateKey: string) {
    delete state[stateId][stateKey];

    const ev = new Event('state:update');
    window.dispatchEvent(ev);
    localStorage.setItem('app-state', JSON.stringify(state));
  }

  static onState(stateId = 'global', callback: (s: StateObject) => void) {
    window.addEventListener('state:update', () => {
      callback(State.getState(stateId));
    });
  }

  static getState(scope = 'global') {
    return state[scope] || {};
  }

  static getStateByType(type: string) {
    return Object.keys(state[type]);
  }

  static reset() {
    state = JSON.parse(JSON.stringify(DefaultState));
    const ev = new Event('state:update');
    window.dispatchEvent(ev);
    localStorage.setItem('app-state', JSON.stringify(state));
    console.log(state);
  }
}

declare global {
  interface Window { State: State; }
}
window.State = State;
