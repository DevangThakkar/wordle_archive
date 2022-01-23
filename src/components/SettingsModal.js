import { ReactComponent as Close } from '../data/Close.svg'
import Modal from 'react-modal'
import { Switch } from '@headlessui/react'

Modal.setAppElement('#root')

export const SettingsModal = ({ isOpen, handleClose, styles, darkMode, toggleDarkMode, colorBlindMode, toggleColorBlindMode}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={styles}
      contentLabel="Settings Modal"
    >
      <div className={`h-full ${darkMode ? 'dark' : ''}`}>
        <div
          className={`h-full flex flex-col items-center justify-center max-w-[390px] mx-auto pt-9 text-primary dark:text-primary-dark `}
        >
          <h1 className="text-center mb-4 sm:text-3xl text-2xl">Settings</h1>
          <div className="flex-1 w-full border-b border-slate-400 mb-4">
            <button
              className="absolute top-4 right-4 rounded-full nm-flat-background dark:nm-flat-background-dark text-primary dark:text-primary-dark p-1 w-6 h-6 sm:p-2 sm:h-8 sm:w-8"
              onClick={handleClose}
            >
              <Close />
            </button>

            <Switch.Group as="div" className="flex items-center">
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                className={`${
                  darkMode
                    ? 'nm-inset-yellow-500 border-background-dark'
                    : 'nm-inset-background border-transparent'
                } relative inline-flex flex-shrink-0 h-8 w-14 p-1 border-2 rounded-full cursor-pointer transition ease-in-out duration-200`}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    darkMode ? 'translate-x-[1.55rem]' : 'translate-x-0'
                  } absolute pointer-events-none inline-block top-1/2 -translate-y-1/2 h-5 w-5 shadow rounded-full bg-white transform ring-0 transition ease-in-out duration-200`}
                />
              </Switch>
              <Switch.Label as="span" className="ml-3 cursor-pointer">
                Dark Mode
              </Switch.Label>
            </Switch.Group>

            <Switch.Group as="div" className="flex items-center mt-8">
              <Switch
                checked={colorBlindMode}
                onChange={toggleColorBlindMode}
                className={`${
                  colorBlindMode
                    ? 'nm-inset-yellow-500'
                    : 'nm-inset-background'
                } ${darkMode ? 'border-background-dark' : ''} relative inline-flex flex-shrink-0 h-8 w-14 p-1 border-2 rounded-full cursor-pointer transition ease-in-out duration-200`}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    colorBlindMode ? 'translate-x-[1.55rem]' : 'translate-x-0'
                  } absolute pointer-events-none inline-block top-1/2 -translate-y-1/2 h-5 w-5 shadow rounded-full bg-white transform ring-0 transition ease-in-out duration-200`}
                />
              </Switch>
              <Switch.Label as="span" className="ml-3 cursor-pointer">
                Color Blind Mode
              </Switch.Label>
            </Switch.Group>
          </div>
        </div>
      </div>
    </Modal>
  )
}
