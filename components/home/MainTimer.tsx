import React, { Dispatch, useEffect, MutableRefObject, useRef } from 'react'
import { TimerState, TimerAction } from './types/TimerTypes'

type Props = {
  state: TimerState
  dispatch: Dispatch<TimerAction>
  getTimeString: (value: number) => string
  mainInterval: MutableRefObject<ReturnType<typeof setInterval> | null>
  mainTimeout: MutableRefObject<ReturnType<typeof setTimeout> | null>
  playBell: () => void
  playShortBell: (index: number) => void
  stop: () => void
}

function MainTimer({
  state,
  dispatch,
  getTimeString,
  mainInterval,
  mainTimeout,
  playBell,
  playShortBell,
  stop
}: Props) {
  const timeRemainingRef = useRef<number>(state.timeRemaining)
  const delayTimeRemaining = useRef<number>(state.delayTimeRemaining)
  const tabRef = useRef<number | null>(null)
  tabRef.current = state.selectedTab

  timeRemainingRef.current = state.timeRemaining
  delayTimeRemaining.current = state.delayTimeRemaining

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch({ type: 'setDuration', value: parseInt(e.target.value) })
  }

  useEffect(() => {
    if (state.isRunning) {
      start()
    } else {
      clearTimeoutAndInterval()
    }
  }, [state.isRunning])

  useEffect(() => {
    if (state.paused) {
      clearTimeoutAndInterval()
    }
    if (!state.paused && state.isRunning) {
      start()
    }
  }, [state.paused])

  function clearTimeoutAndInterval() {
    if (mainTimeout.current) {
      clearTimeout(mainTimeout.current)
    }
    if (mainInterval.current) {
      clearInterval(mainInterval.current)
    }
  }

  useEffect(() => {
    return clearTimeoutAndInterval
  }, [])

  function start() {
    mainTimeout.current = setTimeout(() => {
      beginCountdown()
      if (tabRef.current !== 1) {
        dispatch({ type: 'setSelectedTab', value: 1 })
      }
      playBell()
    }, state.delayTimeRemaining * 1000)
  }

  function beginCountdown() {
    mainInterval.current = setInterval(() => {
      if (timeRemainingRef.current > 0) {
        let timeElapsed = state.duration - timeRemainingRef.current
        if (state.intervals.includes(timeElapsed)) {
          playShortBell(state.bell)
        }
        dispatch({
          type: 'setTimeRemaining',
          value: timeRemainingRef.current - 1
        })
      } else {
        stop()
        playBell()
        clearTimeoutAndInterval()
      }
    }, 1000)
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[10rem]">
      <div className={'text-8xl md:text-9xl'}>
        {getTimeString(state.timeRemaining)}
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
        className={
          'accent-sky-950 dark:accent-sky-200 w-96 max-w-full mt-4 transition-opacity duration-1000' +
          (state.isRunning ? ' opacity-0' : '')
        }
        disabled={state.isRunning}
        id="duration"
      />
    </div>
  )
}

export default MainTimer
