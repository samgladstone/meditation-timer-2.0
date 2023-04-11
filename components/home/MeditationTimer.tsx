import React, { Fragment, Reducer, useReducer, useRef } from 'react'
import { Tab } from '@headlessui/react'
import { TimerAction, TimerState } from './types/TimerTypes'
import MainTimer from './MainTimer'
import IntervalTimer from './IntervalTimer'
import DelayTimer from './DelayTimer'
import BellButtons from './BellButtons'
import ControlButtons from './ControlButtons'
import { Bells } from './Bells'

type Props = {}

function MeditationTimer({}: Props) {
  const mainInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const mainTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const delayInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  const initialState = {
    duration: 900,
    timeRemaining: 900,
    delay: 10,
    delayTimeRemaining: 10,
    interval: 450,
    intervals: [],
    bell: 0,
    isRunning: false,
    paused: false,
    selectedTab: 1
  }

  function reducer(state: TimerState, action: TimerAction) {
    switch (action.type) {
      case 'setDuration':
        return {
          ...state,
          duration: action.value,
          timeRemaining: action.value,
          interval: Math.floor(action.value / 2)
        }
      case 'setTimeRemaining':
        return { ...state, timeRemaining: action.value }
      case 'setDelay':
        return {
          ...state,
          delay: action.value,
          delayTimeRemaining: action.value
        }
      case 'setDelayTimeRemaining':
        return {
          ...state,
          delayTimeRemaining: action.value
        }
      case 'setInterval':
        return {
          ...state,
          interval: action.value
        }
      case 'addInterval':
        return { ...state, intervals: [...state.intervals, action.value] }
      case 'removeInterval':
        return {
          ...state,
          intervals: [
            ...state.intervals.filter((_, index) => index !== action.value)
          ]
        }
      case 'setBell':
        return { ...state, bell: action.value }
      case 'setIsRunning':
        return { ...state, isRunning: action.value }
      case 'setPaused':
        return { ...state, paused: action.value }
      case 'setSelectedTab':
        return { ...state, selectedTab: action.value }
    }
  }

  const [state, dispatch] = useReducer<Reducer<TimerState, TimerAction>>(
    reducer,
    initialState
  )

  function getTimeString(value: number): string {
    let hours: number | string = Math.floor(value / 60 / 60)
    let minutes: number | string = Math.floor(value / 60 - hours * 60)
    let seconds: number | string = value - Math.floor(value / 60) * 60

    hours = '0' + hours

    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    return hours !== '00'
      ? hours + ':' + minutes + ':' + seconds
      : minutes + ':' + seconds
  }

  function playShortBell(index: number) {
    Bells.forEach((_, i) => {
      Bells[i].pause()
      Bells[i].currentTime = 0
    })
    Bells[index].play()
  }

  function playBell() {
    Bells[state.bell + 3].play()
  }

  function start(): void {
    Bells.forEach((_, i) => {
      Bells[i].play()
      Bells[i].pause()
      Bells[i].currentTime = 0
    })
    dispatch({ type: 'setIsRunning', value: true })
  }

  function pause(): void {
    dispatch({ type: 'setPaused', value: true })
    Bells[state.bell + 3].pause()
  }

  function resume(): void {
    dispatch({ type: 'setPaused', value: false })
    if (!Bells[state.bell + 3].ended && Bells[state.bell].currentTime != 0) {
      Bells[state.bell + 3].play()
    }
  }

  function stop(): void {
    dispatch({ type: 'setTimeRemaining', value: state.duration })
    dispatch({ type: 'setDelayTimeRemaining', value: state.delay })
    dispatch({ type: 'setIsRunning', value: false })

    Bells[state.bell + 3].pause()
    Bells[state.bell + 3].currentTime = 0
  }

  return (
    <>
      <Tab.Group
        selectedIndex={state.selectedTab}
        onChange={(i: number): void =>
          dispatch({ type: 'setSelectedTab', value: i })
        }
        manual
      >
        <Tab.Panels>
          <Tab.Panel unmount={false}>
            <DelayTimer
              state={state}
              dispatch={dispatch}
              getTimeString={getTimeString}
              delayInterval={delayInterval}
            />
          </Tab.Panel>
          <Tab.Panel unmount={false}>
            <MainTimer
              state={state}
              dispatch={dispatch}
              getTimeString={getTimeString}
              mainInterval={mainInterval}
              mainTimeout={mainTimeout}
              playBell={playBell}
              playShortBell={playShortBell}
              stop={stop}
            />
          </Tab.Panel>
          <Tab.Panel unmount={false}>
            <IntervalTimer
              state={state}
              dispatch={dispatch}
              getTimeString={getTimeString}
            />
          </Tab.Panel>
        </Tab.Panels>
        <Tab.List className="flex gap-x-6 gap-y-4 flex-wrap justify-center mt-8">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  'btn btn-primary flex flex-col items-center leading-tight justify-center' +
                  (selected ? ' active' : '')
                }
              >
                <span className="font-semibold">Delay</span>
                <span className="-mt-2">
                  {getTimeString(state.delayTimeRemaining)}
                </span>
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  'btn btn-primary flex flex-col items-center leading-tight justify-center' +
                  (selected ? ' active' : '')
                }
              >
                <span className="font-semibold">Meditation</span>
                <span className="-mt-2">
                  {getTimeString(state.timeRemaining)}
                </span>
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  'btn btn-primary flex flex-col items-center leading-tight justify-center' +
                  (selected ? ' active' : '')
                }
              >
                <span className="font-semibold">Interval</span>
                <span className="text-lg -mt-2">
                  {state.intervals.length} bell
                  {state.intervals.length !== 1 ? 's' : ''}
                </span>
              </button>
            )}
          </Tab>
        </Tab.List>
      </Tab.Group>
      <div className="mt-8">
        <BellButtons
          state={state}
          dispatch={dispatch}
          playShortBell={playShortBell}
        />
      </div>
      <div className="mt-12 flex justify-center">
        <ControlButtons
          state={state}
          start={start}
          pause={pause}
          resume={resume}
          stop={stop}
        />
      </div>
    </>
  )
}

export default MeditationTimer
