import React, { Dispatch } from 'react'
import { TimerState, TimerAction } from './types/TimerTypes'
import { TrashIcon } from '@heroicons/react/24/outline'

type Props = {
  state: TimerState
  dispatch: Dispatch<TimerAction>
  getTimeString: (value: number) => string
}

function IntervalTimer({ state, dispatch, getTimeString }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch({ type: 'setInterval', value: parseInt(e.target.value) })
  }

  function handleAdd(): void {
    if (!state.intervals.includes(state.interval) && !state.isRunning) {
      dispatch({ type: 'addInterval', value: state.interval })
    }
  }

  function handleDelete(index: number): void {
    if (!state.isRunning) {
      dispatch({ type: 'removeInterval', value: index })
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[10rem] mb-2">
      <div className="text-8xl md:text-9xl">
        {getTimeString(state.interval)}
      </div>
      <label htmlFor="duration" className="sr-only">
        Set time
      </label>
      <input
        min={10}
        max={state.duration - 10}
        step={5}
        value={state.interval}
        type="range"
        onChange={handleChange}
        className={
          'accent-sky-950 dark:accent-sky-200 w-96 max-w-full mt-4 transition-opacity duration-1000' +
          (state.isRunning ? ' opacity-0' : '')
        }
        id="duration"
        disabled={state.isRunning}
      />
      <button
        className="btn btn-primary !py-1 mt-4 cursor-pointer !text-base disabled:opacity-75 disabled:pointer-events-none"
        onClick={handleAdd}
        disabled={state.isRunning}
      >
        <span className="transform translate-y-px inline-block">
          Add Interval
        </span>
      </button>
      <div className="mt-2 w-full">
        {state.intervals.length ? (
          <ul className="w-56 max-w-full mx-auto flex flex-wrap gap-2 justify-center">
            {state.intervals.map((interval, index) => {
              return (
                <li
                  key={interval}
                  className="w-50 text-lg flex gap-4 justify-between items-center bg-gray-50 border-2 h-10 border-sky-800 rounded-lg px-2 dark:bg-gray-800 dark:border-sky-200"
                >
                  <span>{getTimeString(interval)}</span>
                  <button
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 h-7 w-7 flex items-center justify-center rounded-lg py-0.5 disabled:opacity-75 disabled:pointer-events-none"
                    aria-label="delete interval"
                    onClick={() => handleDelete(index)}
                    disabled={state.isRunning}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-center text-sm">No interval bells added yet</p>
        )}
      </div>
    </div>
  )
}

export default IntervalTimer
