import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '/public/meditation-timer-logo.png'
import Link from 'next/link'
import DarkModeToggle from './DarkModeToggle'
import AboutModal from '../home/AboutModal'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const navigation = [
    { name: 'About', clickHandler: () => setShowModal(true) },
    { name: 'Donate', href: 'https://ko-fi.com/benbrophy' }
  ]

  return (
    <>
      <a
        href="#main"
        className="absolute top-0 left-0 p-4 bg-sky-100 dark:bg-black z-50 border-b-2 border-r-2 rounded-br-lg border-sky-800 dark:border-sky-200 transform -translate-y-full transition-transform focus:translate-y-0 duration-200"
      >
        Skip to Main Content
      </a>
      <header className="border-b-4 border-sky-900 dark:border-sky-200 bg-sky-50 dark:bg-black relative">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 h-[4rem] lg:h-[5rem]">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Meditation Timer</span>
            <img
              className="h-8 lg:h-10 w-auto filter brightness-25 dark:filter-none"
              src={logo.src}
              alt=""
            />
          </Link>
          <div className="flex items-center gap-6">
            <DarkModeToggle />
            <div className="flex md:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-sky-200"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden md:flex gap-4">
              {navigation.map(item =>
                item.clickHandler ? (
                  <button
                    key={item.name}
                    className="w-full block text-base font-semibold leading-6 py-2 px-3 rounded-lg hover:bg-sky-100 dark:hover:bg-gray-700 hover:transition-colors hover:duration-200"
                    onClick={item.clickHandler}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-base font-semibold leading-6 py-2 px-3 rounded-lg hover:bg-sky-100 dark:hover:bg-gray-600 hover:transition-colors hover:duration-200"
                    target="_blank"
                    rel="noopener"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>
        </nav>
        <Transition show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
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
              <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-sky-50 dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Meditation Timer</span>
                    <img
                      className="h-8 w-auto filter brightness-25 dark:filter-none"
                      src={logo.src}
                      alt=""
                    />
                  </a>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-sky-100 dark:text-sky-200 dark:hover:bg-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <nav className="space-y-2 py-6 flex flex-col">
                      {navigation.map(item =>
                        item.clickHandler ? (
                          <button
                            key={item.name}
                            className="-mx-3 text-left block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-sky-100 dark:hover:bg-gray-600"
                            onClick={item.clickHandler}
                          >
                            {item.name}
                          </button>
                        ) : (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-sky-100 dark:hover:bg-gray-600"
                            target="_blank"
                            rel="noopener"
                          >
                            {item.name}
                          </Link>
                        )
                      )}
                    </nav>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      </header>
      <AboutModal show={showModal} setShow={setShowModal} />
    </>
  )
}
