import React, { Dispatch, MutableRefObject, useRef, useEffect } from 'react'
import { TimerState, TimerAction } from './types/TimerTypes'
import { timeEnd } from 'console'

type Props = {
  state: TimerState
  dispatch: Dispatch<TimerAction>
  getTimeString: (value: number) => string
  delayInterval: MutableRefObject<ReturnType<typeof setInterval> | null>
}

function DelayTimer({ state, dispatch, getTimeString, delayInterval }: Props) {
  const timeRemainingRef = useRef<number>(state.delayTimeRemaining)
  timeRemainingRef.current = state.delayTimeRemaining

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (!state.isRunning) {
      dispatch({ type: 'setDelay', value: parseInt(e.target.value) })
    }
  }

  useEffect(() => {
    if (state.isRunning) {
      beginCountdown()
    } else {
      clearDelayInterval()
    }
  }, [state.isRunning])

  useEffect(() => {
    if (state.paused) {
      clearDelayInterval()
    }
    if (!state.paused && state.isRunning) {
      beginCountdown()
    }
  }, [state.paused])

  useEffect(() => {
    return clearDelayInterval
  }, [])

  function beginCountdown() {
    if (timeRemainingRef.current > 0) {
      dispatch({ type: 'setSelectedTab', value: 0 })
      delayInterval.current = setInterval(() => {
        if (timeRemainingRef.current > 0) {
          dispatch({
            type: 'setDelayTimeRemaining',
            value: timeRemainingRef.current - 1
          })
        } else {
          clearDelayInterval()
        }
      }, 1000)
    }
  }

  function clearDelayInterval() {
    if (delayInterval.current) {
      clearInterval(delayInterval.current)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[10rem]">
      <div className="text-8xl md:text-9xl">
        {getTimeString(state.delayTimeRemaining)}
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
        onChange={handleChange}
        className={
          'accent-sky-950 dark:accent-sky-200 w-96 max-w-full mt-4 transition-opacity duration-1000' +
          (state.isRunning ? ' opacity-0' : '')
        }
        id="delay"
        disabled={state.isRunning}
      />
    </div>
  )
}

export default DelayTimer
