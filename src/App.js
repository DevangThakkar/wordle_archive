import { useEffect, useState, useRef } from 'react'
import { letters, status } from './constants'
import { Keyboard } from './components/Keyboard'
import words from './data/words'

import { useLocalStorage } from './hooks/useLocalStorage'
import { ReactComponent as Info } from './data/Info.svg'
import { ReactComponent as Settings } from './data/Settings.svg'

import { InfoModal } from './components/InfoModal'
import { SettingsModal } from './components/SettingsModal'
import { EndGameModal } from './components/EndGameModal'

const state = {
  playing: 'playing',
  won: 'won',
  lost: 'lost',
}

const getDayAnswer = (day_) => {
  return wordle_answers[day_-1].toUpperCase()
}

const getDay = () => {
  const today = new Date()
  const date1 = new Date('6/20/21')
  const diffTime = Math.abs(today - date1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const wordle_answers = ["rebut", "sissy", "humph", "awake", "blush", "focal", "evade", "naval", "serve", "heath", "dwarf", "model", "karma", "stink", "grade", "quiet", "bench", "abate", "feign", "major", "death", "fresh", "crust", "stool", "colon", "abase", "marry", "react", "batty", "pride", "floss", "helix", "croak", "staff", "paper", "unfed", "whelp", "trawl", "outdo", "adobe", "crazy", "sower", "repay", "digit", "crate", "cluck", "spike", "mimic", "pound", "maxim", "linen", "unmet", "flesh", "booby", "forth", "first", "stand", "belly", "ivory", "seedy", "print", "yearn", "drain", "bribe", "stout", "panel", "crass", "flume", "offal", "agree", "error", "swirl", "argue", "bleed", "delta", "flick", "totem", "wooer", "front", "shrub", "parry", "biome", "lapel", "start", "greet", "goner", "golem", "lusty", "loopy", "round", "audit", "lying", "gamma", "labor", "islet", "civic", "forge", "corny", "moult", "basic", "salad", "agate", "spicy", "spray", "essay", "fjord", "spend", "kebab", "guild", "aback", "motor", "alone", "hatch", "hyper", "thumb", "dowry", "ought", "belch", "dutch", "pilot", "tweed", "comet", "jaunt", "enema", "steed", "abyss", "growl", "fling", "dozen", "boozy", "erode", "world", "gouge", "click", "briar", "great", "altar", "pulpy", "blurt", "coast", "duchy", "groin", "fixer", "group", "rogue", "badly", "smart", "pithy", "gaudy", "chill", "heron", "vodka", "finer", "surer", "radio", "rouge", "perch", "retch", "wrote", "clock", "tilde", "store", "prove", "bring", "solve", "cheat", "grime", "exult", "usher", "epoch", "triad", "break", "rhino", "viral", "conic", "masse", "sonic", "vital", "trace", "using", "peach", "champ", "baton", "brake", "pluck", "craze", "gripe", "weary", "picky", "acute", "ferry", "aside", "tapir", "troll", "unify", "rebus", "boost", "truss", "siege", "tiger", "banal", "slump", "crank", "gorge", "query"]
var day = getDay()
const og_day = getDay()

function App() {
  const initialStates = {
    answer: () => getDayAnswer(day),
    gameState: state.playing,
    board: [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ],
    cellStatuses: () => Array(6).fill(Array(5).fill(status.unguessed)),
    currentRow: 0,
    currentCol: 0,
    letterStatuses: () => {
      const letterStatuses = {}
      letters.forEach((letter) => {
        letterStatuses[letter] = status.unguessed
      })
      return letterStatuses
    },
  }
  const [answer, setAnswer] = useState(initialStates.answer)
  const [gameState, setGameState] = useState(initialStates.gameState)
  const [board, setBoard] = useState(initialStates.board)
  const [cellStatuses, setCellStatuses] = useState(initialStates.cellStatuses)
  const [currentRow, setCurrentRow] = useState(initialStates.currentRow)
  const [currentCol, setCurrentCol] = useState(initialStates.currentCol)
  const [letterStatuses, setLetterStatuses] = useState(initialStates.letterStatuses)
  const [submittedInvalidWord, setSubmittedInvalidWord] = useState(false)
  const [currentStreak, setCurrentStreak] = useLocalStorage('current-streak', 0)
  const [longestStreak, setLongestStreak] = useLocalStorage('longest-streak', 0)
  const streakUpdated = useRef(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [firstTime, setFirstTime] = useLocalStorage('first-time', true)
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(firstTime)
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const handleInfoClose = () => {
    setFirstTime(false)
    setInfoModalIsOpen(false)
  }

  const [darkMode, setDarkMode] = useLocalStorage('dark-mode', false)
  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  useEffect(() => {
    if (gameState !== state.playing) {
      setTimeout(() => {
        openModal()
      }, 500)
    }
  }, [gameState])

  useEffect(() => {
    if (!streakUpdated.current) {
      if (gameState === state.won) {
        if (currentStreak >= longestStreak) {
          setLongestStreak((prev) => prev + 1)
        }
        setCurrentStreak((prev) => prev + 1)
        streakUpdated.current = true
      } else if (gameState === state.lost) {
        setCurrentStreak(0)
        streakUpdated.current = true
      }
    }
  }, [gameState, currentStreak, longestStreak, setLongestStreak, setCurrentStreak])

  const getCellStyles = (rowNumber, colNumber, letter) => {
    if (rowNumber === currentRow) {
      if (letter) {
        return `nm-inset-background dark:nm-inset-background-dark text-primary dark:text-primary-dark ${
          submittedInvalidWord ? 'border border-red-800' : ''
        }`
      }
      return 'nm-flat-background dark:nm-flat-background-dark text-primary dark:text-primary-dark'
    }

    switch (cellStatuses[rowNumber][colNumber]) {
      case status.green:
        return 'nm-inset-n-green text-gray-50'
      case status.yellow:
        return 'nm-inset-yellow-500 text-gray-50'
      case status.gray:
        return 'nm-inset-n-gray text-gray-50'
      default:
        return 'nm-flat-background dark:nm-flat-background-dark text-primary dark:text-primary-dark'
    }
  }

  const addLetter = (letter) => {
    setSubmittedInvalidWord(false)
    setBoard((prev) => {
      if (currentCol > 4) {
        return prev
      }
      const newBoard = [...prev]
      newBoard[currentRow][currentCol] = letter
      return newBoard
    })
    if (currentCol < 5) {
      setCurrentCol((prev) => prev + 1)
    }
  }

  const isValidWord = (word) => {
    if (word.length < 5) return false
    return words[word.toLowerCase()]
  }

  const onEnterPress = () => {
    const word = board[currentRow].join('')
    if (!isValidWord(word)) {
      setSubmittedInvalidWord(true)
      return
    }

    if (currentRow === 6) return

    updateCellStatuses(word, currentRow)
    updateLetterStatuses(word)
    setCurrentRow((prev) => prev + 1)
    setCurrentCol(0)
  }

  const onDeletePress = () => {
    setSubmittedInvalidWord(false)
    if (currentCol === 0) return

    setBoard((prev) => {
      const newBoard = [...prev]
      newBoard[currentRow][currentCol - 1] = ''
      return newBoard
    })

    setCurrentCol((prev) => prev - 1)
  }

  const updateCellStatuses = (word, rowNumber) => {
    setCellStatuses((prev) => {
      const newCellStatuses = [...prev]
      newCellStatuses[rowNumber] = [...prev[rowNumber]]
      const wordLength = word.length
      const answerLetters = answer.split('')

      // set all to gray
      for (let i = 0; i < wordLength; i++) {
        newCellStatuses[rowNumber][i] = status.gray
      }

      // check greens
      for (let i = wordLength - 1; i >= 0; i--) {
        if (word[i] === answer[i]) {
          newCellStatuses[rowNumber][i] = status.green
          answerLetters.splice(i, 1)
        }
      }

      // check yellows
      for (let i = 0; i < wordLength; i++) {
        if (answerLetters.includes(word[i]) && newCellStatuses[rowNumber][i] !== status.green) {
          newCellStatuses[rowNumber][i] = status.yellow
          answerLetters.splice(answerLetters.indexOf(word[i]), 1)
        }
      }

      return newCellStatuses
    })
  }

  const isRowAllGreen = (row) => {
    return row.every((cell) => cell === status.green)
  }

  // every time cellStatuses updates, check if the game is won or lost
  useEffect(() => {
    const cellStatusesCopy = [...cellStatuses]
    const reversedStatuses = cellStatusesCopy.reverse()
    const lastFilledRow = reversedStatuses.find((r) => {
      return r[0] !== status.unguessed
    })

    if (lastFilledRow && isRowAllGreen(lastFilledRow)) {
      setGameState(state.won)
    } else if (currentRow === 6) {
      setGameState(state.lost)
    }
  }, [cellStatuses, currentRow])

  const updateLetterStatuses = (word) => {
    setLetterStatuses((prev) => {
      const newLetterStatuses = { ...prev }
      const wordLength = word.length
      for (let i = 0; i < wordLength; i++) {
        if (newLetterStatuses[word[i]] === status.green) continue

        if (word[i] === answer[i]) {
          newLetterStatuses[word[i]] = status.green
        } else if (answer.includes(word[i])) {
          newLetterStatuses[word[i]] = status.yellow
        } else {
          newLetterStatuses[word[i]] = status.gray
        }
      }
      return newLetterStatuses
    })
  }

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: darkMode ? 'hsl(231, 16%, 25%)' : 'hsl(231, 16%, 92%)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      height: 'calc(100% - 2rem)',
      width: 'calc(100% - 2rem)',
      backgroundColor: darkMode ? 'hsl(231, 16%, 25%)' : 'hsl(231, 16%, 92%)',
      boxShadow: `${
        darkMode
          ? '0.2em 0.2em calc(0.2em * 2) #252834, calc(0.2em * -1) calc(0.2em * -1) calc(0.2em * 2) #43475C'
          : '0.2em 0.2em calc(0.2em * 2) #A3A7BD, calc(0.2em * -1) calc(0.2em * -1) calc(0.2em * 2) #FFFFFF'
      }`,
      border: 'none',
      borderRadius: '1rem',
      maxWidth: '475px',
      maxHeight: '650px',
      position: 'relative',
    },
  }

  const play = () => {
    setAnswer(initialStates.answer)
    setGameState(initialStates.gameState)
    setBoard(initialStates.board)
    setCellStatuses(initialStates.cellStatuses)
    setCurrentRow(initialStates.currentRow)
    setCurrentCol(initialStates.currentCol)
    setLetterStatuses(initialStates.letterStatuses)
  }
  const playFirst = () => {
    day = 1
    play()
  }
  const playPrevious = () => {
    day = day - 1
    play()
  }
  const playRandom = () => {
    day = Math.floor(Math.random() * og_day)
    play()
  }
  const playNext = () => {
    if (day < og_day) {
      day = day + 1
    }
    play()
  }
  const playLast = () => {
    day = og_day
    play()
  }

  console.log(window.innerWidth)

  if (window.innerWidth < 600) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className={`flex flex-col justify-between h-fill bg-background dark:bg-background-dark`}>
          <header className="flex items-center py-2 px-3 text-primary dark:text-primary-dark">
            <button type="button" onClick={() => setSettingsModalIsOpen(true)}>
              <Settings />
            </button>
            <h1 className="flex-1 text-center text-xl xxs:text-2xl -mr-6 sm:text-4xl tracking-wide font-bold font-og">
              WORDLE ARCHIVE {day}
            </h1>
            <button type="button" onClick={() => setInfoModalIsOpen(true)}>
              <Info />
            </button>
          </header>
          <div className="flex items-center flex-col py-4">
            <div className="grid grid-cols-5 grid-flow-row gap-4">
              {board.map((row, rowNumber) =>
                row.map((letter, colNumber) => (
                  <span
                    key={colNumber}
                    className={`${getCellStyles(
                      rowNumber,
                      colNumber,
                      letter
                    )} inline-flex items-center font-medium justify-center text-lg w-[14vw] h-[14vw] xs:w-14 xs:h-14 sm:w-20 sm:h-20 rounded`}
                  >
                    {letter}
                  </span>
                ))
              )}
            </div>
          </div>
          <div className="flex flex-force-center items-center py-3">
            <div className="flex items-center px-1">
              <button
                type="button"
                className="rounded px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
                onClick={playPrevious}>Previous
              </button>
            </div>
            <div className="flex items-center px-2">
              <button
                type="button"
                className="rounded px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
                onClick={playRandom}>Random
              </button>
            </div>
            <div className="flex items-center px-3">
              <button
                type="button"
                className="rounded px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
                onClick={playNext}>Next
              </button>
            </div>
          </div>
          <InfoModal
            isOpen={infoModalIsOpen}
            handleClose={handleInfoClose}
            darkMode={darkMode}
            styles={modalStyles}
          />
          <EndGameModal
            isOpen={modalIsOpen}
            handleClose={closeModal}
            styles={modalStyles}
            darkMode={darkMode}
            gameState={gameState}
            state={state}
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            answer={answer}
            playAgain={() => {
              setAnswer(initialStates.answer)
              setGameState(initialStates.gameState)
              setBoard(initialStates.board)
              setCellStatuses(initialStates.cellStatuses)
              setCurrentRow(initialStates.currentRow)
              setCurrentCol(initialStates.currentCol)
              setLetterStatuses(initialStates.letterStatuses)
              closeModal()
              streakUpdated.current = false
            }}
            day={day}
            currentRow={currentRow}
            cellStatuses={cellStatuses}
          />
          <SettingsModal
            isOpen={settingsModalIsOpen}
            handleClose={() => setSettingsModalIsOpen(false)}
            styles={modalStyles}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Keyboard
            letterStatuses={letterStatuses}
            addLetter={addLetter}
            onEnterPress={onEnterPress}
            onDeletePress={onDeletePress}
            gameDisabled={gameState !== state.playing}
          />
        </div>
      </div>
    )
  }
  else {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className={`flex flex-col justify-between h-fill bg-background dark:bg-background-dark`}>
          <header className="flex items-center py-2 px-3 text-primary dark:text-primary-dark">
            <button type="button" onClick={() => setSettingsModalIsOpen(true)}>
              <Settings />
            </button>
            <h1 className="flex-1 text-center text-xl xxs:text-2xl -mr-6 sm:text-4xl tracking-wide font-bold font-og">
              WORDLE ARCHIVE {day}
            </h1>
            <button type="button" onClick={() => setInfoModalIsOpen(true)}>
              <Info />
            </button>
          </header>
          <div className="flex items-center flex-col py-4">
            <div className="grid grid-cols-5 grid-flow-row gap-4">
              {board.map((row, rowNumber) =>
                row.map((letter, colNumber) => (
                  <span
                    key={colNumber}
                    className={`${getCellStyles(
                      rowNumber,
                      colNumber,
                      letter
                    )} inline-flex items-center font-medium justify-center text-lg w-[14vw] h-[14vw] xs:w-14 xs:h-14 sm:w-20 sm:h-20 rounded`}
                  >
                    {letter}
                  </span>
                ))
              )}
            </div>
          </div>
          <div className="flex flex-force-center items-center py-3">
            <div className="flex items-center px-1">
              <button
                type="button"
                className="rounded px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
                onClick={playFirst}>First
              </button>
            </div>
            <div className="flex items-center px-2">
              <button
                type="button"
                className="rounded px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
                onClick={playPrevious}>Previous
              </button>
            </div>
            <div className="flex items-center px-3">
              <button
                type="button"
                className="rounded px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
                onClick={playRandom}>Random
              </button>
            </div>
            <div className="flex items-center px-4">
              <button
                type="button"
                className="rounded px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
                onClick={playNext}>Next
              </button>
            </div>
            <div className="flex items-center px-5">
              <button
                type="button"
                className="rounded px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
                onClick={playLast}>Last
              </button>
            </div>
          </div>
          <InfoModal
            isOpen={infoModalIsOpen}
            handleClose={handleInfoClose}
            darkMode={darkMode}
            styles={modalStyles}
          />
          <EndGameModal
            isOpen={modalIsOpen}
            handleClose={closeModal}
            styles={modalStyles}
            darkMode={darkMode}
            gameState={gameState}
            state={state}
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            answer={answer}
            playAgain={() => {
              setAnswer(initialStates.answer)
              setGameState(initialStates.gameState)
              setBoard(initialStates.board)
              setCellStatuses(initialStates.cellStatuses)
              setCurrentRow(initialStates.currentRow)
              setCurrentCol(initialStates.currentCol)
              setLetterStatuses(initialStates.letterStatuses)
              closeModal()
              streakUpdated.current = false
            }}
            day={day}
            currentRow={currentRow}
            cellStatuses={cellStatuses}
          />
          <SettingsModal
            isOpen={settingsModalIsOpen}
            handleClose={() => setSettingsModalIsOpen(false)}
            styles={modalStyles}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Keyboard
            letterStatuses={letterStatuses}
            addLetter={addLetter}
            onEnterPress={onEnterPress}
            onDeletePress={onDeletePress}
            gameDisabled={gameState !== state.playing}
          />
        </div>
      </div>
    )
  }
}

export default App
