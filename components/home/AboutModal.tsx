import React, { Fragment, Dispatch, SetStateAction } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

function AboutModal({ show, setShow }: Props) {
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShow(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 pt-16 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-700 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-2xl font-semibold leading-6 flex justify-between">
                    <h2>About</h2>
                  </Dialog.Title>
                  <button
                    aria-label="close dialog box"
                    className="absolute top-5 right-5 hover:bg-sky-100 dark:hover:bg-gray-800 h-8 w-8 flex items-center justify-center rounded-lg transition-colors duration-200"
                    onClick={() => setShow(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                  <div className="mt-4">
                    <div className="flex flex-col gap-2">
                      <p>
                        This site was designed and built in my spare time. I
                        hope you find it useful.
                      </p>{' '}
                      <p>
                        You can reach me with comments or questions at{' '}
                        <a className="underline" href="mailto:ben@benbrophy.io">
                          ben@benbrophy.io
                        </a>
                        .
                      </p>
                      <p>
                        If you'd like to see more free projects like this, or
                        would like to see improvements to this site,{' '}
                        <a
                          href="https://ko-fi.com/benbrophy"
                          target="blank"
                          rel="noopener"
                          className="underline"
                        >
                          please consider donating
                        </a>
                        .
                      </p>
                    </div>
                    <h3 className="text-base font-medium mt-4">
                      Licensing Information
                    </h3>
                    <ul>
                      <li className="leading-tight text-sm">
                        <a
                          href="https://www.flickr.com/photos/dianasch/17134232071/"
                          className="underline"
                          target="_blank"
                          rel="noopener"
                        >
                          "Night Sky and Clouds, Arches National Park"
                        </a>{' '}
                        by{' '}
                        <a
                          href="https://www.flickr.com/photos/dianasch/"
                          className="underline"
                          target="_blank"
                          rel="noopener"
                        >
                          Diana Robinson
                        </a>{' '}
                        is licensed under{' '}
                        <a
                          href="https://creativecommons.org/licenses/by-nd/2.0/"
                          className="underline"
                          target="_blank"
                          rel="noopener"
                        >
                          CC BY-ND 2.0
                        </a>
                      </li>
                      <li className="leading-tight text-sm">
                        <a
                          className="underline"
                          href="http://www.freesound.org/people/itsallhappening/sounds/48795/"
                          target="_blank"
                          rel="noopener"
                        >
                          Bell 1
                        </a>{' '}
                        by{' '}
                        <a
                          className="underline"
                          href="http://www.freesound.org/people/itsallhappening/"
                          target="_blank"
                          rel="noopener"
                        >
                          itsallhappening
                        </a>{' '}
                        is licensed under{' '}
                        <a
                          className="underline"
                          href="http://creativecommons.org/licenses/sampling+/1.0/"
                          target="_blank"
                          rel="noopener"
                        >
                          CC Sampling Plus 1.0
                        </a>
                      </li>
                      <li className="leading-tight text-sm">
                        <a
                          className="underline"
                          href="http://www.freesound.org/people/suburban%20grilla/sounds/2166/"
                          target="_blank"
                          rel="noopener"
                        >
                          Bell 2
                        </a>{' '}
                        by{' '}
                        <a
                          className="underline"
                          href="http://www.freesound.org/people/suburban%20grilla/"
                          target="_blank"
                          rel="noopener"
                        >
                          suburban grilla
                        </a>{' '}
                        is licensed under{' '}
                        <a
                          className="underline"
                          href="http://creativecommons.org/licenses/sampling+/1.0/"
                          target="_blank"
                          rel="noopener"
                        >
                          CC Sampling Plus 1.0
                        </a>
                      </li>
                      <li className="leading-tight text-sm">
                        <a
                          className="underline"
                          href="http://freesound.org/people/kerri/sounds/27421/"
                          target="_blank"
                          rel="noopener"
                        >
                          Bell 3
                        </a>{' '}
                        by{' '}
                        <a
                          className="underline"
                          href="http://freesound.org/people/kerri/"
                          target="_blank"
                          rel="noopener"
                        >
                          kerri
                        </a>{' '}
                        is licensed under{' '}
                        <a
                          className="underline"
                          href="http://creativecommons.org/licenses/by/3.0/"
                          target="_blank"
                          rel="noopener"
                        >
                          CC BY 3.0
                        </a>
                      </li>
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default AboutModal
