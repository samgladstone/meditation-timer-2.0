import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '/public/meditation-timer-logo.png'
import Link from 'next/link'

const navigation = [{ name: 'Donate', href: '/donate' }]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b-4 border-sky-900 dark:border-sky-200 bg-sky-50 dark:bg-black dark:text-sky-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 h-[4rem] lg:h-[5rem]">
        <Link href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Meditation Timer</span>
          <img
            className="h-8 lg:h-10 w-auto filter brightness-75 dark:filter-none"
            src={logo.src}
            alt=""
          />
        </Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-sky-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-sky-900 dark:text-sky-200"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child as={Fragment}>
            <div className="fixed inset-0" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300 ease-out"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-300 ease-out"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <nav className="space-y-2 py-6">
                    {navigation.map(item => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </header>
  )
}
