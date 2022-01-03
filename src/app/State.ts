type StateObject = {
  [key: string]: any
}

const state: StateObject = {};

export default class State {
  static setState(stateId: string, newState: any) {
    // deep copy new state and save to global state
    state[stateId] = Object.assign(state[stateId] || {}, JSON.parse(JSON.stringify(newState)));

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
    return Object.keys(state).filter((key) => state[key].type === type).map((key) => state[key]);
  }
}

declare global {
  interface Window { State: State; }
}
window.State = State;
