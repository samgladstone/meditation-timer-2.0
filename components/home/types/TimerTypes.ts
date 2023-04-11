export type Duration = {
  type: 'setDuration'
  value: number
}

export type Delay = {
  type: 'setDelay'
  value: number
}

export type SetTimeRemaining = {
  type: 'setTimeRemaining'
  value: number
}

export type SetDelayTimeRemaining = {
  type: 'setDelayTimeRemaining'
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

export type SetBell = {
  type: 'setBell'
  value: number
}

export type SetIsRunning = {
  type: 'setIsRunning'
  value: boolean
}

export type SetPaused = {
  type: 'setPaused'
  value: boolean
}

export type SetSelectedTab = {
  type: 'setSelectedTab'
  value: number
}

export type TimerAction =
  | Duration
  | SetTimeRemaining
  | Delay
  | SetInterval
  | AddInterval
  | RemoveInterval
  | SetBell
  | SetIsRunning
  | SetPaused
  | SetSelectedTab
  | SetDelayTimeRemaining

export type TimerState = {
  duration: number
  timeRemaining: number
  delay: number
  delayTimeRemaining: number
  interval: number
  intervals: Array<number>
  bell: number
  isRunning: boolean
  paused: boolean
  selectedTab: number
}
