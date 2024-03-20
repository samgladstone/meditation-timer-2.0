import React, { useRef, useState } from 'react'
import { TimerLengths, TimerType } from './types/TimerTypes'
import BellButtons from './BellButtons'
import ControlButton from './ControlButton'
import { resetLongBell, playShortBell, playLongBell, pauseLongBell, resetAllBells, resumeLongBell } from './Bells'
import SaveSettingsButton from './SaveSettingsButton'
import { convertToTimeString, getSecondsNow } from './utils/timeUtils'
import TimerControl from './TimerControl'
import { loadInitialState } from './utils/settingsSaver'
import TimerButton from './TimerButton'

let initialSettings = loadInitialState();

type ActiveTimer = {
  delayEnd: number,
  meditationEnd: number,
  lengths: TimerLengths
}

type Props = {}

function MeditationTimer({ }: Props) {
  const [activeTimer, setActiveTimer] = useState<ActiveTimer | undefined>(undefined);
  const [activeTimerType, setActiveTimerType] = useState<TimerType>(TimerType.Delay);
  const [selectedTimer, setSelectedTimer] = useState(TimerType.Meditation);
  const [timeRemaining, setTimeRemaining] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedBell, setSelectedBell] = useState(initialSettings ? initialSettings.bell : 0);
  const [timerLengths, setTimerLengths] = useState<TimerLengths>(initialSettings ? initialSettings.lengths : {
    delay: 10,
    meditation: 900,
    intervals: []
  });

  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleBellChange = (newVal: number) => {
    setSelectedBell(newVal);
    playShortBell(newVal);
  }

  const selectTimer = (type: TimerType) => {
    if (isRunning) return;
    setSelectedTimer(type);
  }

  function playBell() {
    playLongBell(selectedBell)
  }

  function start(): void {
    resetAllBells();
    setIsRunning(true);
    const nowSecs = getSecondsNow();

    const newTimer = {
      delayEnd: nowSecs + timerLengths.delay,
      meditationEnd: nowSecs + timerLengths.meditation + timerLengths.delay,
      lengths: timerLengths,
    };

    storeTimeRemaining(newTimer)
    startCountingDown(newTimer);
  }

  function stop(): void {
    setIsRunning(false);
    stopCountingDown();
    setTimeRemaining(-1);
    setIsPaused(false);
    setActiveTimer(undefined);
    resetLongBell(selectedBell);
  }

  function pause(): void {
    setIsPaused(true);
    stopCountingDown();
    pauseLongBell(selectedBell);
  }

  function resume(): void {
    if (!activeTimer) throw new Error('This is impossible');

    const nowSecs = getSecondsNow();
    const isDelay = activeTimerType === TimerType.Delay;

    const newTimings = {
      delayEnd: nowSecs + (isDelay ? timeRemaining : -1),
      meditationEnd: nowSecs + (isDelay ? timeRemaining + activeTimer.lengths.meditation : timeRemaining),
      lengths: activeTimer.lengths
    };

    startCountingDown(newTimings);
    setIsPaused(false);
    resumeLongBell(selectedBell);
  }

  function stopCountingDown() {
    if (countdownInterval.current) clearInterval(countdownInterval.current)
  }

  function startCountingDown(timer: ActiveTimer) {
    setActiveTimer(timer);

    countdownInterval.current = setInterval(() => {
      const remaining = storeTimeRemaining(timer);

      if (remaining.timeRemaining <= 0) {
        stop()
        playBell()
        stopCountingDown()
      }
    }, 1000);
  }

  function storeTimeRemaining(timer: ActiveTimer) {
    const nowSecs = getSecondsNow();

    const activeTimerType = nowSecs < timer.delayEnd ? TimerType.Delay : TimerType.Meditation;

    const timeRemaining = activeTimerType === TimerType.Delay
      ? timer.delayEnd - nowSecs
      : timer.meditationEnd - nowSecs;

    setActiveTimerType(activeTimerType);
    setTimeRemaining(timeRemaining);

    return {
      activeTimerType,
      timeRemaining
    }
  }

  return (
    <>
      <SaveSettingsButton currentSettings={{ bell: selectedBell, lengths: timerLengths }} />
      <TimerControl
        isRunning={isRunning}
        value={timerLengths}
        selectedTimer={selectedTimer}
        timeRemaining={timeRemaining}
        onChange={setTimerLengths} />
      <div className="flex gap-x-6 gap-y-4 flex-wrap justify-center mt-8">
        <TimerButton
          label="Delay"
          selected={(activeTimerType ?? selectedTimer) === TimerType.Delay}
          onClick={() => selectTimer(TimerType.Delay)}>
          {convertToTimeString(activeTimerType === TimerType.Delay ? timeRemaining : timerLengths.delay)}
        </TimerButton>
        <TimerButton
          label="Meditation"
          selected={(activeTimerType ?? selectedTimer) === TimerType.Meditation}
          onClick={() => selectTimer(TimerType.Meditation)}>
          {convertToTimeString(activeTimerType === TimerType.Meditation ? timeRemaining : timerLengths.meditation)}
        </TimerButton>
        <TimerButton
          label="Interval"
          selected={(activeTimerType ?? selectedTimer) === TimerType.Interval}
          onClick={() => selectTimer(TimerType.Interval)}>
          {timerLengths.intervals.length} bell
          {timerLengths.intervals.length !== 1 ? 's' : ''}
        </TimerButton>
      </div>
      <div className="mt-8">
        <BellButtons
          disabled={isRunning}
          onChange={handleBellChange}
          value={selectedBell}
        />
      </div>
      <div className="mt-12 flex justify-center">
        <div className="flex gap-3">
          {!isRunning
            ? (<ControlButton onClick={() => start()}>Start</ControlButton>)
            : (<>
              {isPaused
                ? (<ControlButton onClick={() => resume()}>Resume</ControlButton>)
                : (<ControlButton onClick={() => pause()}>Pause</ControlButton>)}
              <ControlButton onClick={() => stop()}>Stop</ControlButton>
            </>)}
        </div>
      </div>
    </>
  )
}

export default MeditationTimer

