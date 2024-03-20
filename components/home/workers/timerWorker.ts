import { ActiveTimer, MessageType, StartMessage, StopMessage, TimedEventMessage, TimerType, } from "../types/TimerTypes";
import { getSecondsNow } from "../utils/timeUtils";

let timeout: NodeJS.Timeout | undefined;

self.onmessage = (({ data: message }: MessageEvent<StartMessage | StopMessage>) => {
    if (message.type === MessageType.Start) {
        setNextTimePeriod(message.timer);
    }

    if (message.type === MessageType.Stop && timeout) {
        clearTimeout(timeout);
    }
});


function setNextTimePeriod(timer: ActiveTimer) {
    const { delayEnd, meditationEnd, lengths: { intervals, meditation } } = timer;
    const now = getSecondsNow();

    if (now < delayEnd) {
        setTimerTimeout(timer, TimerType.Delay, delayEnd - now);
        return;
    }

    const meditiationStart = meditationEnd - meditation;
    const nextInterval = intervals.sort((a, b) => a - b).find(interval => now < (meditiationStart + interval));

    if (nextInterval) {
        setTimerTimeout(timer, TimerType.Interval, meditiationStart + nextInterval - now);
        return;
    }

    // If we got here then it is the end of meditiation
    setTimerTimeout(timer, TimerType.Meditation, meditationEnd - now);
}

function setTimerTimeout(timer: ActiveTimer, type: TimerType, length: number) {
    timeout = setTimeout(
        () => {
            const message: TimedEventMessage = { type: MessageType.TimedEvent, event: type };
            self.postMessage(message);
            if (type != TimerType.Meditation)
                setNextTimePeriod(timer);
        },
        length * 1000
    );
}

export { }
