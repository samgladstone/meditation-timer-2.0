export enum TimerType {
  Delay,
  Meditation,
  Interval,
}

export type TimerLengths = {
  delay: number
  meditation: number
  intervals: number[]
}

export type TimerSettings = {
  lengths: TimerLengths
  bell: number
}