import { BellTypes } from './types/TimerTypes'


const shortBells: HTMLAudioElement[] = [
  new Audio('/bells/bell-1.mp3'),
  new Audio('/bells/bell-2.mp3'),
  new Audio('/bells/bell-3.mp3'),
];
const longBells: HTMLAudioElement[] = [
  new Audio('/bells/bell-1-long.mp3'),
  new Audio('/bells/bell-2-long.mp3'),
  new Audio('/bells/bell-3-long.mp3'),
];

function reset(bell: HTMLAudioElement) {
  bell.pause();
  bell.currentTime = 0;
}

export function resetAllBells() {
  longBells.forEach(reset);
  shortBells.forEach(reset);
}

export function playBell(index: number, type: BellTypes = BellTypes.Long) {
  if (type == BellTypes.Short)
    resetAllBells(); // TODO: Is this necessary?

  selectBell(index, type).play()
}

export function pauseBell(index: number, type: BellTypes = BellTypes.Long) {
  selectBell(index, type).pause()
}

export function resetBell(index: number, type: BellTypes = BellTypes.Long) {
  const bell = selectBell(index, type);
  bell.pause()
  bell.currentTime = 0;
}

export function resumeBell(index: number, type: BellTypes = BellTypes.Long) {
  const longBell = selectBell(index, type)
  if (!longBell.ended && shortBells[index].currentTime != 0) {
    longBell.play()
  }
}

function selectBell(index: number, type: BellTypes) {
  return type === BellTypes.Short ? shortBells[index] : longBells[index];
}