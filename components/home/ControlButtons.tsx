import React, { Dispatch } from 'react'
import { TimerState, TimerAction } from './types/TimerTypes'

type Props = {
  state: TimerState
  start: () => void
  pause: () => void
  resume: () => void
  stop: () => void
}

function ControlButtons({ state, start, pause, resume, stop }: Props) {
  return (
    <div className="flex gap-3">
      {!state.isRunning && (
        <button
          className={
            'btn btn-primary flex flex-col items-center leading-tight justify-center !text-2xl w-36'
          }
          onClick={() => start()}
        >
          Start
        </button>
      )}
      {state.isRunning && (
        <>
          {state.paused && (
            <button
              className={
                'btn btn-primary flex flex-col items-center leading-tight justify-center !text-2xl w-36'
              }
              onClick={() => resume()}
            >
              Resume
            </button>
          )}
          {!state.paused && (
            <button
              className={
                'btn btn-primary flex flex-col items-center leading-tight justify-center !text-2xl w-36'
              }
              onClick={() => pause()}
            >
              Pause
            </button>
          )}
          <button
            className={
              'btn btn-primary flex flex-col items-center leading-tight justify-center !text-2xl w-36'
            }
            onClick={() => stop()}
          >
            Stop
          </button>
        </>
      )}
    </div>
  )
}

export default ControlButtons
