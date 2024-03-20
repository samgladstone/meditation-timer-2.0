import React from 'react'

type Props = React.PropsWithChildren<{
    label: string
    onClick: () => void
    selected: boolean
}>

function TimerButton({ label, onClick, selected, children }: Props) {
    return (
        <button
            className={
                'btn btn-primary flex flex-col items-center leading-tight justify-center' +
                (selected ? ' active' : '')
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
