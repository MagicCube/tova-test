import { proxy, useSnapshot } from 'valtio';

import * as config from '~/config';
import { type Item } from '~/types';
import { random } from '~/utils/random';

export type State = {
  data: Item[];
  status: 'ready' | 'win' | 'lose' | 'corrected';
  interferenceData: Item[];
};

const state = proxy<State>({
  status: 'ready',
  data: [],
  interferenceData: [],
});

export function useStore() {
  return useSnapshot(state) as State;
}

function setup() {
  next();
}
setup();

export function next() {
  state.status = 'ready';
  state.data = generateData();
  state.interferenceData = generateData();
}

export function select(value: number) {
  if (state.data.length === value) {
    if (state.status === 'lose') {
      state.status = 'corrected';
    } else {
      state.status = 'win';
    }
    setTimeout(next, 1600);
  } else {
    state.status = 'lose';
  }
}

function generateData() {
  const data: Item[] = [];
  const count = random(config.maxCount, 1);
  for (let i = 0; i < count; i++) {
    let item: Item;
    do {
      item = [random(config.columns - 1), random(config.rows - 1)];
    } while (data.some(([x, y]) => x === item[0] && y === item[1]));
    data.push(item);
  }
  return data;
}
