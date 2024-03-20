import React from 'react'

type Props = {
  disabled: boolean
  onChange: (newValue: number) => void
  value: number,
}

function BellButtons({ disabled, onChange, value }: Props) {
  return (
    <div className="flex gap-x-6 gap-y-4 flex-wrap justify-center">
      {['Bell 1', 'Bell 2', 'Bell 3'].map((label, index) => (
        <button
          key={index}
          className={
            'btn btn-primary flex flex-col items-center leading-tight justify-center disabled:opacity-75 disabled:pointer-events-none' +
            (value === index ? ' active' : '')
          }
          onClick={() => onChange(index)}
          disabled={disabled}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default BellButtons
