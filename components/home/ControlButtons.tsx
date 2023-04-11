import React, { Dispatch } from 'react'
import { TimerState, TimerAction } from './types/TimerTypes'

type Props = {
  state: TimerState
}

function ControlButtons({ state, start, pause, resume, stop }: Props) {
  return (
    <div className="flex gap-3">
      {!state.isRunning && (
        <button
          className={
            'btn btn-primary flex flex-col items-center leading-tight justify-center !text-2xl w-36'
          }
          onClick={e => start()}
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
              onClick={e => resume()}
            >
              Resume
            </button>
          )}
          {!state.paused && (
            <button
              className={
                'btn btn-primary flex flex-col items-center leading-tight justify-center !text-2xl w-36'
              }
              onClick={e => pause()}
            >
              Pause
            </button>
          )}
          <button
            className={
              'btn btn-primary flex flex-col items-center leading-tight justify-center !text-2xl w-36'
            }
            onClick={e => stop()}
          >
            Stop
          </button>
        </>
      )}
    </div>
  )
}

export default ControlButtons
