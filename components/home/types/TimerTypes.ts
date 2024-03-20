export type ActiveTimer = {
  delayEnd: number,
  meditationEnd: number,
  lengths: TimerLengths
}

export enum BellTypes {
  Short,
  Long
}

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

export enum MessageType {
  Start,
  Stop,
  TimedEvent
}

export interface StartMessage {
  type: MessageType.Start
  timer: ActiveTimer
}

export interface StopMessage {
  type: MessageType.Stop
}

export interface TimedEventMessage {
  type: MessageType.TimedEvent
  event: TimerType
}