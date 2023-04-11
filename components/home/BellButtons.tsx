import React, { Dispatch } from 'react'
import { TimerState, TimerAction } from './types/TimerTypes'

type Props = {
  state: TimerState
  dispatch: Dispatch<TimerAction>
  playShortBell: (index: number) => void
}

function BellButtons({ state, dispatch, playShortBell }: Props) {
  function handleClick(index: number): void {
    dispatch({ type: 'setBell', value: index })
    playShortBell(index)
  }

  return (
    <>
      <div className="flex gap-x-6 gap-y-4 flex-wrap justify-center">
        <button
          className={
            'btn btn-primary flex flex-col items-center leading-tight justify-center' +
            (state.bell === 0 ? ' active' : '')
          }
          onClick={e => handleClick(0)}
        >
          Bell 1
        </button>
        <button
          className={
            'btn btn-primary flex flex-col items-center leading-tight justify-center' +
            (state.bell === 1 ? ' active' : '')
          }
          onClick={e => handleClick(1)}
        >
          Bell 2
        </button>
        <button
          className={
            'btn btn-primary flex flex-col items-center leading-tight justify-center' +
            (state.bell === 2 ? ' active' : '')
          }
          onClick={e => handleClick(2)}
        >
          Bell 3
        </button>
      </div>
    </>
  )
}

export default BellButtons
