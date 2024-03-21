import React from 'react'

type Props = React.PropsWithChildren<{
  onClick: () => void
}>

function ControlButton({ onClick, children }: Props) {
  return (
    <button
      className={
        'btn btn-primary flex flex-col items-center leading-tight justify-center !text-2xl w-36'
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ControlButton
