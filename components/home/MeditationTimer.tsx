import React, { Fragment, Reducer, useReducer, useRef } from 'react'
import { Tab } from '@headlessui/react'
import { TimerAction, TimerState } from './types/TimerTypes'
import IntervalTimer from './IntervalTimer'
import BellButtons from './BellButtons'
import ControlButtons from './ControlButtons'
import { Bells } from './Bells'

type Props = {}

function MeditationTimer({}: Props) {
  const mainTimer = useRef(null)
  const delayTimer = useRef(null)
  const intervalTimer = useRef(null)

  const initialState = {
    duration: 900,
    delay: 10,
    interval: 300,
    intervals: [],
    bell: 0,
    isRunning: false,
    paused: false
  }

  function reducer(state: TimerState, action: TimerAction) {
    switch (action.type) {
      case 'setDuration':
        return { ...state, duration: action.value }
      case 'setDelay':
        return { ...state, delay: action.value }
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
    }
  }

  const [state, dispatch] = useReducer<Reducer<TimerState, TimerAction>>(
    reducer,
    initialState
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch({ type: 'setDuration', value: parseInt(e.target.value) })
  }

  function handleDelayChange(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch({ type: 'setDelay', value: parseInt(e.target.value) })
  }

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

  function playBell(index: number) {
    Bells[index + 3].play()
  }

  function start(): void {
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
    dispatch({ type: 'setIsRunning', value: false })
    Bells[state.bell + 3].pause()
    Bells[state.bell + 3].currentTime = 0
  }

  return (
    <>
      <Tab.Group defaultIndex={1} manual>
        <Tab.Panels>
          <Tab.Panel>
            <div className="flex flex-col justify-center items-center min-h-[10rem]">
              <div className="text-8xl md:text-9xl">
                {getTimeString(state.delay)}
              </div>
              <label htmlFor="delay" className="sr-only">
                Set delay
              </label>
              <input
                min={0}
                max={120}
                step={1}
                value={state.delay}
                type="range"
                onChange={handleDelayChange}
                className="accent-sky-950 dark:accent-sky-200 w-96 max-w-full mt-4"
                id="delay"
              />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="flex flex-col justify-center items-center min-h-[10rem]">
              <div className="text-8xl md:text-9xl">
                {getTimeString(state.duration)}
              </div>
              <label htmlFor="duration" className="sr-only">
                Set time
              </label>
              <input
                min={30}
                max={7200}
                step={30}
                value={state.duration}
                type="range"
                onChange={handleChange}
                className="accent-sky-950 dark:accent-sky-200 w-96 max-w-full mt-4"
                id="duration"
              />
            </div>
          </Tab.Panel>
          <Tab.Panel>
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
                <span className="-mt-2">{getTimeString(state.delay)}</span>
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
                <span className="-mt-2">{getTimeString(state.duration)}</span>
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
