import React, { Fragment, Reducer, useReducer } from 'react'
import { Tab } from '@headlessui/react'
import { TimerAction, TimerState } from './types/TimerTypes'
import IntervalTimer from './IntervalTimer'

type Props = {}

function MeditationTimer({}: Props) {
  const initialState = {
    duration: 900,
    delay: 10,
    interval: 300,
    intervals: []
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
          intervals: [...state.intervals.splice(action.value, 1)]
        }
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
    console.log('hi', value)

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
            <div className="flex flex-col justify-center items-center">
              <IntervalTimer
                state={state}
                dispatch={dispatch}
                getTimeString={getTimeString}
              />
            </div>
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
                <span className="-mt-1">{getTimeString(state.delay)}</span>
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
                <span className="-mt-1">{getTimeString(state.duration)}</span>
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
                <span className="text-base -mt-0.5">None set</span>
              </button>
            )}
          </Tab>
        </Tab.List>
      </Tab.Group>
    </>
  )
}

export default MeditationTimer
