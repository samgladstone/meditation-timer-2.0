const pad = (val: number) => String(val).padStart(2, "0");

export function convertToTimeString(totalSeconds: number): string {
    let hours = Math.floor(totalSeconds / 60 / 60)
    let minutes = Math.floor(totalSeconds / 60 - hours * 60)
    let seconds = totalSeconds - Math.floor(totalSeconds / 60) * 60

    return hours > 0
        ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
        : `${pad(minutes)}:${pad(seconds)}`;
}

export function getSecondsNow() {
    return Math.round(Date.now() / 1000);
};