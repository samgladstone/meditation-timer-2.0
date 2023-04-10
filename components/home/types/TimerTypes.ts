export type Duration = {
  type: 'setDuration'
  value: number
}

export type Delay = {
  type: 'setDelay'
  value: number
}

export type SetInterval = {
  type: 'setInterval'
  value: number
}

export type AddInterval = {
  type: 'addInterval'
  value: number
}

export type RemoveInterval = {
  type: 'removeInterval'
  value: number
}

export type TimerAction =
  | Duration
  | Delay
  | SetInterval
  | AddInterval
  | RemoveInterval

export type TimerState = {
  duration: number
  delay: number
  interval: number
  intervals: Array<number>
}
