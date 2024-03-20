import React from 'react'
import { convertToTimeString } from './utils/timeUtils'
import { TrashIcon } from '@heroicons/react/24/outline'

type Props = React.PropsWithChildren<{
    addInterval: () => void
    intervals: number[]
    disabled: boolean
    removeInterval: (index: number) => void
}>

function IntervalsControl({ addInterval, intervals, disabled, removeInterval }: Props) {
    const handleDelete = (index: number) => removeInterval(index);

    return (
        <>
            <button
                className="btn btn-primary !py-1 mt-4 cursor-pointer !text-base disabled:opacity-75 disabled:pointer-events-none"
                onClick={addInterval}
                disabled={disabled}
            >
                <span className="transform translate-y-px inline-block">
                    Add Interval
                </span>
            </button>
            <div className="mt-2 w-full">
                {intervals.length ? (
                    <ul className="w-56 max-w-full mx-auto flex flex-wrap gap-2 justify-center">
                        {intervals.map((interval, index) => {
                            return (
                                <li
                                    key={interval}
                                    className="w-50 text-lg flex gap-4 justify-between items-center bg-gray-50 border-2 h-10 border-sky-800 rounded-lg px-2 dark:bg-gray-800 dark:border-sky-200"
                                >
                                    <span>{convertToTimeString(interval)}</span>
                                    <button
                                        className="hover:bg-gray-200 dark:hover:bg-gray-700 h-7 w-7 flex items-center justify-center rounded-lg py-0.5 disabled:opacity-75 disabled:pointer-events-none"
                                        aria-label="delete interval"
                                        onClick={() => handleDelete(index)}
                                        disabled={disabled}
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <p className="text-center text-sm">No interval bells added yet</p>
                )}
            </div>
        </>
    )
}

export default IntervalsControl
