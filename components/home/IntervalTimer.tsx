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
    if (!state.intervals.includes(state.interval)) {
      dispatch({ type: 'addInterval', value: state.interval })
    }
  }

  function handleDelete(index: number): void {
    console.log('Delete item #', index)
    dispatch({ type: 'removeInterval', value: index })
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
        min={30}
        max={7150}
        step={5}
        value={state.interval}
        type="range"
        onChange={handleChange}
        className="accent-sky-950 dark:accent-sky-200 w-96 max-w-full mt-4"
        id="duration"
      />
      <button
        className="btn btn-primary !py-1 mt-4 cursor-pointer !text-base"
        onClick={handleAdd}
      >
        <span className="transform translate-y-px inline-block">
          Add Interval
        </span>
      </button>
      <div className="mt-2 w-full">
        {state.intervals.length ? (
          <ul className="w-36 max-w-full mx-auto flex flex-col gap-1">
            {state.intervals.map((interval, index) => {
              return (
                <li
                  key={interval}
                  className="text-lg flex justify-between items-center bg-gray-50 border-2 h-10 border-sky-800 rounded-lg px-2 dark:bg-gray-800 dark:border-sky-200"
                >
                  <span>{getTimeString(interval)}</span>
                  <button
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 h-7 w-7 flex items-center justify-center rounded-lg py-0.5"
                    aria-label="delete interval"
                    onClick={() => handleDelete(index)}
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
