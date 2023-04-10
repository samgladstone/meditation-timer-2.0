import React, { Dispatch } from 'react'
import { TimerState, TimerAction } from './types/TimerTypes'

type Props = {
  state: TimerState
  dispatch: Dispatch<TimerAction>
  getTimeString: (value: number) => string
}

function IntervalTimer({ state, dispatch, getTimeString }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch({ type: 'setInterval', value: parseInt(e.target.value) })
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[10rem]">
      <div className="text-8xl md:text-9xl">
        {getTimeString(state.interval)}
      </div>
      <label htmlFor="duration" className="sr-only">
        Set time
      </label>
      <input
        min={30}
        max={7200}
        step={30}
        value={state.interval}
        type="range"
        onChange={handleChange}
        className="accent-sky-950 dark:accent-sky-200 w-96 max-w-full mt-4"
        id="duration"
      />
    </div>
  )
}

export default IntervalTimer
