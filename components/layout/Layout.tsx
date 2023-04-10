import React from 'react'
import HTMLHead from '../meta/Head'
import Header from './Header'

type LayoutProps = {
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function Layout({
  title = 'Meditation Timer',
  description = 'A free web-based meditation timer with three bells to choose from.  Customize delay, interval, and meditation timers.  No ads, no sign-up.',
  children
}: LayoutProps) {
  return (
    <>
      <HTMLHead title={title} description={description} />
      <Header />
      {children}
    </>
  )
}
