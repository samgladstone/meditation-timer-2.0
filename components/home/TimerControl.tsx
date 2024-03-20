import React, { useEffect, useState } from 'react'
import { TimerType, TimerLengths } from './types/TimerTypes'
import { convertToTimeString } from './utils/timeUtils'
import IntervalsControl from './IntervalsControl'

type Props = {
  isRunning: boolean,
  selectedTimer: TimerType,
  onChange: (value: TimerLengths) => void
  timeRemaining: number
  value: TimerLengths
}

type Range = {
  max: number,
  min: number,
  step: number,
}

function TimerControl({ isRunning, onChange, selectedTimer, timeRemaining, value }: Props) {
  const [timerLength, setTimerLength] = useState(value.meditation);

  const [intervalLength, setIntervalLength] = useState(value.meditation / 2);

  const [range, setRange] = useState<Range>({ max: 7200, min: 30, step: 30 });
  const [label, setLabel] = useState('Meditation');

  useEffect(() => {
    if (selectedTimer === TimerType.Meditation) {
      setTimerLength(value.meditation);
      setRange({ max: 7200, min: 30, step: 30 });
      setLabel('Meditation');
    }

    if (selectedTimer === TimerType.Delay) {
      setTimerLength(value.delay);
      setRange({ max: 120, min: 0, step: 1 });
      setLabel('Delay');
    }

    if (selectedTimer === TimerType.Interval) {
      setTimerLength(intervalLength);
      setRange({ max: calcuateMaxInterval(), min: 10, step: 5 });
      setLabel('Interval');
    }
  }, [selectedTimer])

  const calcuateMaxInterval = () => value.meditation - 5;

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isRunning) return;

    const newVal = parseInt(e.target.value);
    setTimerLength(newVal);

    if (selectedTimer === TimerType.Meditation) {
      onChange({
        ...value,
        meditation: newVal
      });
      setIntervalLength(newVal / 2)
    }

    if (selectedTimer === TimerType.Delay)
      onChange({
        ...value,
        delay: newVal
      });


    if (selectedTimer === TimerType.Interval)
      setIntervalLength(newVal);
  }

  const addInterval = () => {
    if (!isRunning && !value.intervals.includes(timerLength))
      onChange({
        ...value,
        intervals: [...value.intervals, timerLength].sort((a, b) => a - b)
      });
  }

  const removeInterval = (index: number) => {
    if (!isRunning)
      onChange({
        ...value,
        intervals: value.intervals.filter((_, i) => i !== index)
      });
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[10rem]">
        <div className="text-8xl md:text-9xl">
          {convertToTimeString(timeRemaining > 0 ? timeRemaining : timerLength)}
        </div>
        <label htmlFor="timer-slider" className="sr-only">
          Set {label} length
        </label>
        <input
          id="timer-slider"
          min={range.min}
          max={range.max}
          step={range.step}
          value={timerLength}
          type="range"
          onChange={handleLengthChange}
          className={
            'accent-sky-950 dark:accent-sky-200 w-96 max-w-full mt-4 transition-opacity duration-1000' +
            (isRunning ? ' opacity-0' : '')
          }
          disabled={isRunning}
        />
        {selectedTimer === TimerType.Interval ?
          <IntervalsControl
            addInterval={addInterval}
            intervals={value.intervals}
            disabled={isRunning}
            removeInterval={removeInterval} />
          : ''}
      </div>
    </>
  )
}

export default TimerControl
