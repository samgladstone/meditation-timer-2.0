import React, { useState, useEffect, useRef } from 'react'
import { TimerState } from './types/TimerTypes'
import { FiSave } from 'react-icons/fi'

type Props = {
  state: TimerState
}
function SaveSettingsButton({ state }: Props) {
  const [message, setMessage] = useState(
    shouldDisableButton() ? 'Settings Saved' : 'Save Settings'
  )
  const messageTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (messageTimeout.current) {
        clearTimeout(messageTimeout.current)
      }
    }
  }, [])

  useEffect(() => {
    if (shouldDisableButton()) {
      setMessage('Settings Saved')
    } else {
      setMessage('Save Settings')
    }
  }, [state])

  function arraysAreSame(arr1: Array<number>, arr2: Array<number>): boolean {
    return (
      arr1.length == arr2.length &&
      arr1.every((element, index) => element === arr2[index])
    )
  }

  function shouldDisableButton(): boolean {
    try {
      const settings = JSON.parse(localStorage.getItem('settings') || '{}')

      if (Object.keys(settings).length) {
        if (
          settings.duration === state.duration &&
          settings.delay === state.delay &&
          arraysAreSame(settings.intervals, state.intervals) &&
          settings.bell === state.bell
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    } catch {
      return false
    }
  }

  function saveSettings(): void {
    if (messageTimeout.current) {
      clearTimeout(messageTimeout.current)
    }
    const settings = {
      duration: state.duration,
      timeRemaining: state.duration,
      delay: state.delay,
      delayTimeRemaining: state.delay,
      interval: Math.floor(state.duration / 2),
      intervals: [...state.intervals],
      bell: state.bell
    }

    try {
      localStorage.setItem('settings', JSON.stringify(settings))
      setMessage('Settings Saved')
    } catch {
      setMessage('Unable to Save')
      messageTimeout.current = setTimeout(
        () => setMessage('Save Settings'),
        2000
      )
    }
  }
  return (
    <div className="absolute right-4 top-4">
      <button
        className="btn btn-primary flex items-center gap-2 !text-sm md:!text-base disabled:opacity-75 disabled:pointer-events-none"
        onClick={saveSettings}
        disabled={shouldDisableButton()}
      >
        <span className="hidden md:block">
          <FiSave />
        </span>
        {message}
      </button>
    </div>
  )
}

export default SaveSettingsButton
