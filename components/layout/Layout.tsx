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
      <main className="bg-sky-50 dark:bg-black min-h-[calc(100vh-4rem-4px)] lg:min-h-[calc(100vh-5rem-4px)]">
        {children}
      </main>
    </>
  )
}
