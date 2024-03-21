import React from 'react'

type Props = React.PropsWithChildren<{
    disabled: boolean,
    label: string
    onClick: () => void
    selected: boolean
}>

function TimerButton({ disabled, label, onClick, selected, children }: Props) {
    return (
        <button
            disabled={disabled}
            className={
                'btn btn-primary flex flex-col items-center leading-tight justify-center disabled:pointer-events-none' +
                (selected ? ' active' : ' disabled:opacity-75')
            }
            onClick={onClick}
        >
            <span className="font-semibold">{label}</span>
            <span className="-mt-2">
                {children}
            </span>
        </button>
    )
}

export default TimerButton
