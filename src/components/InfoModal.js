import { ReactComponent as Github } from '../data/Github.svg'
import { ReactComponent as Close } from '../data/Close.svg'
import Modal from 'react-modal'

Modal.setAppElement('#root')

export const InfoModal = ({ isOpen, handleClose, darkMode, colorBlindMode, styles }) => (
  <Modal isOpen={isOpen} onRequestClose={handleClose} style={styles} contentLabel="Game Info Modal">
    <div className={`h-full ${darkMode ? 'dark' : ''}`}>
      <button
        className="absolute top-4 right-4 rounded-full nm-flat-background dark:nm-flat-background-dark text-primary dark:text-primary-dark p-1 w-6 h-6 sm:p-2 sm:h-8 sm:w-8"
        onClick={handleClose}
      >
        <Close />
      </button>
      <div className="h-full flex flex-col items-center justify-center max-w-[390px] mx-auto pt-9 text-primary dark:text-primary-dark">
        <div className="flex-1 w-full sm:text-base text-sm">
          <h1 className="text-center sm:text-3xl text-2xl">What is this?</h1>
          <ul className="list-disc pl-5 block sm:text-base text-sm">
            <li className="mt-6 mb-2">This is an archive for <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> by <a href="https://twitter.com/powerlanguish">Josh Wardle</a> built on <a href="https://twitter.com/katherinecodes">Katherine Peterson</a>'s <a href="https://octokatherine.github.io/word-master">WordMaster</a></li>
          </ul>
          <ul className="list-disc pl-5 block sm:text-base text-sm">
            <li className="mt-6 mb-2">Made with love by <a href="https://www.twitter.com/devangvang">Devang Thakkar</a>.</li>
          </ul>
          <h1 className="text-center sm:text-3xl text-2xl">How to play?</h1>
          <ul className="list-disc pl-5 block sm:text-base text-sm">
            <li className="mt-6 mb-2">You have 6 guesses to guess the correct word.</li>
            <li className="mb-2">You can guess any valid word.</li>
            <li className="mb-2">{
              `After each guess, each letter will turn ${colorBlindMode ? 'orange, blue or gray.' : 'green, yellow, or gray.'}`
            }
            </li>
          </ul>
          <div className="mb-3 mt-8 flex items-center">
            <span className={`${colorBlindMode ? 'nm-inset-orange-500' : 'nm-inset-n-green'} text-gray-50 inline-flex items-center justify-center text-3x w-10 h-10 rounded-full`}>
              W
            </span>
            <span className="mx-2">=</span>
            <span>Correct letter, correct spot</span>
          </div>
          <div className="mb-3">
            <span className={`${colorBlindMode ? 'nm-inset-blue-300' : 'nm-inset-yellow-500'} text-gray-50 inline-flex items-center justify-center text-3x w-10 h-10 rounded-full`}>
              W
            </span>
            <span className="mx-2">=</span>
            <span>Correct letter, wrong spot</span>
          </div>
          <span className="nm-inset-n-gray text-gray-50 inline-flex items-center justify-center text-3x w-10 h-10 rounded-full">
            W
          </span>
          <span className="mx-2">=</span>
          <span>Wrong letter</span>
        </div>
        <div className="flex justify-center sm:text-base text-sm">
          <span>This project is open source on</span>
          <a
            className="ml-[6px] rounded-full h-5 w-5 sm:h-6 sm:w-6"
            href="https://github.com/devangthakkar/wordle_archive"
            target="_blank"
            rel="noreferrer"
          >
            <Github />
          </a>
        </div>
      </div>
    </div>
  </Modal>
)
