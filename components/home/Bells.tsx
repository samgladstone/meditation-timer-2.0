
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

function resetBell(bell: HTMLAudioElement) {
  bell.pause();
  bell.currentTime = 0;
}

export function resetAllBells() {
  longBells.forEach(resetBell);
  shortBells.forEach(resetBell);
}

export function playShortBell(index: number) {
  resetAllBells();
  shortBells[index].play()
}

export function playLongBell(index: number) {
  longBells[index].play()
}

export function pauseLongBell(index: number) {
  longBells[index].pause()
}

export function resetLongBell(index: number) {
  const bell = longBells[index];
  bell.pause()
  bell.currentTime = 0;
}

export function resumeLongBell(index: number) {
  const longBell = longBells[index];
  if (!longBell.ended && shortBells[index].currentTime != 0) {
    longBell.play()
  }
}