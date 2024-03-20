import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BellTypes, TimerLengths, TimerType, ActiveTimer, MessageType, TimedEventMessage } from './types/TimerTypes'
import BellButtons from './BellButtons'
import ControlButton from './ControlButton'
import { resetBell, playBell, pauseBell, resetAllBells, resumeBell } from './Bells'
import SaveSettingsButton from './SaveSettingsButton'
import { convertToTimeString, getSecondsNow } from './utils/timeUtils'
import TimerControl from './TimerControl'
import { loadInitialState } from './utils/settingsSaver'
import TimerButton from './TimerButton'

let initialSettings = loadInitialState();

type Props = {}

function MeditationTimer({ }: Props) {
  const [activeTimer, setActiveTimer] = useState<ActiveTimer | undefined>(undefined);
  const [activeTimerType, setActiveTimerType] = useState<TimerType | undefined>(undefined);
  const [shouldPlayBell, setShouldPlayBell] = useState<BellTypes | undefined>(undefined);
  const [selectedTimerType, setSelectedTimerType] = useState(TimerType.Meditation);
  const [timeRemaining, setTimeRemaining] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedBell, setSelectedBell] = useState(initialSettings ? initialSettings.bell : 0);
  const [timerLengths, setTimerLengths] = useState<TimerLengths>(initialSettings ? initialSettings.lengths : {
    delay: 10,
    meditation: 900,
    intervals: []
  });

  const timerWorker = useMemo(() => new Worker(new URL('./workers/timerWorker.ts', import.meta.url), { type: "module" }), []);

  useEffect(() => {
    // I had to do it this way as the worker would always call the bell that was selected when the onmessage is set in the below 
    // effect. It's not ideal, but it seems to work
    if (shouldPlayBell !== undefined)
      playBell(selectedBell, shouldPlayBell);

    setShouldPlayBell(undefined);
  }, [shouldPlayBell]);

  useEffect(() => {
    timerWorker.onmessage = ({ data: { event } }: MessageEvent<TimedEventMessage>) => {
      setShouldPlayBell(event === TimerType.Interval ? BellTypes.Short : BellTypes.Long);
    };

    return () => timerWorker.terminate();
  }, [timerWorker]);

  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleBellChange = (newVal: number) => {
    setSelectedBell(newVal);
    playBell(newVal, BellTypes.Short);
  }

  const selectTimer = (type: TimerType) => {
    if (isRunning) return;
    setSelectedTimerType(type);
  }

  function start(): void {
    resetAllBells();
    setIsRunning(true);
    const startTime = getSecondsNow();

    const newTimer = {
      delayEnd: startTime + timerLengths.delay,
      meditationEnd: startTime + timerLengths.meditation + timerLengths.delay,
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
    setActiveTimerType(undefined);
    resetBell(selectedBell);
  }

  function pause(): void {
    setIsPaused(true);
    stopCountingDown();
    pauseBell(selectedBell);
  }

  function resume(): void {
    if (!activeTimer) throw new Error('This is impossible');

    const startTime = getSecondsNow();
    const isDelay = activeTimerType === TimerType.Delay;

    const newTimings = {
      delayEnd: startTime + (isDelay ? timeRemaining : -1),
      meditationEnd: startTime + (isDelay ? timeRemaining + activeTimer.lengths.meditation : timeRemaining),
      lengths: activeTimer.lengths
    };

    startCountingDown(newTimings);
    setIsPaused(false);
    resumeBell(selectedBell);
  }

  function stopCountingDown() {
    if (countdownInterval.current) clearInterval(countdownInterval.current);
    timerWorker.postMessage({ type: MessageType.Stop });
  }

  function startCountingDown(timer: ActiveTimer) {
    setActiveTimer(timer);

    timerWorker.postMessage({ type: MessageType.Start, timer });
    countdownInterval.current = setInterval(() => {
      const remaining = storeTimeRemaining(timer);

      if (remaining.timeRemaining <= 0) {
        stop()
      }
    }, 1000);

  }

  function storeTimeRemaining(timer: ActiveTimer) {
    const nowSecs = getSecondsNow();

    const activeTimerType = nowSecs < timer.delayEnd ? TimerType.Delay : TimerType.Meditation;

    const timeRemaining = activeTimerType === TimerType.Delay
      ? timer.delayEnd - nowSecs
      : timer.meditationEnd - nowSecs;

    setActiveTimerType(timeRemaining > 0 ? activeTimerType : undefined);
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
        onChange={setTimerLengths}
        selectedTimer={activeTimerType ?? selectedTimerType}
        timeRemaining={timeRemaining}
        value={timerLengths} />
      <div className="flex gap-x-6 gap-y-4 flex-wrap justify-center mt-8">
        <TimerButton
          disabled={isRunning}
          label="Delay"
          selected={(activeTimerType ?? selectedTimerType) === TimerType.Delay}
          onClick={() => selectTimer(TimerType.Delay)}>
          {convertToTimeString(activeTimerType === TimerType.Delay ? timeRemaining : timerLengths.delay)}
        </TimerButton>
        <TimerButton
          disabled={isRunning}
          label="Meditation"
          selected={(activeTimerType ?? selectedTimerType) === TimerType.Meditation}
          onClick={() => selectTimer(TimerType.Meditation)}>
          {convertToTimeString(activeTimerType === TimerType.Meditation ? timeRemaining : timerLengths.meditation)}
        </TimerButton>
        <TimerButton
          disabled={isRunning}
          label="Interval"
          selected={(activeTimerType ?? selectedTimerType) === TimerType.Interval}
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

