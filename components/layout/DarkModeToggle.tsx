import { useEffect, useRef, useState } from 'react'
import { Switch } from '@headlessui/react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [enabled, setEnabled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setEnabled(true)
      setTimeout(() => {
        setMounted(true)
      }, 200)
    } else {
      setMounted(true)
    }
  }, [])

  function handleChange(): void {
    if (!enabled) {
      setEnabled(true)
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setEnabled(false)
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={
        classNames(
          enabled
            ? 'bg-gray-600 focus:ring-sky-200 ring-offset-black'
            : 'bg-gray-300 focus:ring-sky-900 ring-offset-sky-50',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2'
        ) + (mounted ? '' : ' visually-hidden opacity-0')
      }
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={classNames(
          enabled ? 'translate-x-5 bg-black' : 'translate-x-0 bg-white',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={classNames(
            enabled
              ? 'opacity-0 duration-100 ease-out'
              : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden={enabled}
        >
          <SunIcon strokeWidth={1.5} className="h-4 w-4" />
        </span>
        <span
          className={classNames(
            enabled
              ? 'opacity-100 duration-200 ease-in'
              : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity text-sky-200'
          )}
          aria-hidden={!enabled}
        >
          <MoonIcon strokeWidth={2} className="h-4 w-4" />
        </span>
      </span>
    </Switch>
  )
}
