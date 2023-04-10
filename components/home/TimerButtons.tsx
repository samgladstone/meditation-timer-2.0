import React, { Dispatch } from 'react'
import { TimerAction, TimerState } from './types/TimerTypes'

type Props = {
  state: TimerState
  dispatch: Dispatch<TimerAction>
}

function TimerButtons({ state, dispatch }: Props) {
  return <div className="flex gap-8 flex-wrap justify-center mt-8"></div>
}

export default TimerButtons
