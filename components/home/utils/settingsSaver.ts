
import { TimerSettings } from '../types/TimerTypes'

const SETTINGS_KEY = 'settings';

type TimerSettingsDeprecated = {
    duration: number
    timeRemaining: number
    delay: number
    delayTimeRemaining: number
    interval: number
    intervals: Array<number>
    bell: number
}

let initialSettings: undefined | TimerSettings | TimerSettingsDeprecated

export function loadInitialState(): TimerSettings | undefined {
    if (typeof window !== undefined) {
        try {
            const savedSettings = localStorage.getItem(SETTINGS_KEY);

            if (savedSettings)
                initialSettings = JSON.parse(savedSettings)
        } catch { }
    }

    // Migrate settings
    if (initialSettings && 'duration' in initialSettings) {
        initialSettings = {
            lengths: {
                meditation: initialSettings.duration,
                delay: initialSettings.delay,
                intervals: initialSettings.intervals
            },
            bell: initialSettings.bell
        };
        saveCurrentSettings(initialSettings);
    }

    return initialSettings;
}

export function saveCurrentSettings(settings: TimerSettings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function areSameTimeSettings(s1: TimerSettings | undefined, s2: TimerSettings) {
    return !!s1 && (
        s1.lengths.delay === s2.lengths.delay &&
        s1.lengths.meditation === s2.lengths.meditation &&
        arraysAreSame(s1.lengths.intervals, s2.lengths.intervals) &&
        s1.bell === s2.bell);
}

function arraysAreSame(arr1: Array<number>, arr2: Array<number>): boolean {
    return (
        arr1.length == arr2.length &&
        arr1.every((element, index) => element === arr2[index])
    )
}
