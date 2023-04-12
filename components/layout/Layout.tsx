import React from 'react'
import HTMLHead from '../meta/HTMLHead'
import Header from './Header'
import { useRouter } from 'next/router'

type LayoutProps = {
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function Layout({
  title = 'Free Online Meditation Timer',
  description = 'A free web-based meditation timer with three bells to choose from. Customize delay, interval, and meditation timers. Choose light or dark mode. No ads, no sign-up.',
  children
}: LayoutProps) {
  const { pathname } = useRouter()

  return (
    <>
      <HTMLHead title={title} description={description} />
      <Header />
      <main
        className={
          'min-h-[calc(100vh-4rem-4px)] lg:min-h-[calc(100vh-5rem-4px)] relative ' +
          (pathname.split('/')[1] ? pathname.split('/')[1] : 'home')
        }
        id="main"
      >
        {children}
      </main>
    </>
  )
}
