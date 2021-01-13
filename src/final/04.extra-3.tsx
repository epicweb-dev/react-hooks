// useState: tic tac toe
// 💯 add game history feature
// http://localhost:3000/isolated/final/04.extra-3.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

type SquareIdx = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
type X = 'X'
type O = 'O'
type Square = X | O | null
type Squares = [
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
]

type Step = Squares
type StepNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
type History = Step[]

interface BoardProps {
  onClick: (squareIdx: SquareIdx) => void
  squares: Squares
}

function Board({squares, onClick}: BoardProps): JSX.Element {
  function renderSquare(i: SquareIdx): JSX.Element {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

const initialSquares = (): Squares => Array(9).fill(null) as Squares
const initialHistory = (): History => [initialSquares()]

function Game() {
  const [history, setHistory] = useLocalStorageState(
    'tic-tac-toe:history',
    initialHistory,
  )
  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe:step',
    0 as StepNumber,
  )

  const currentSquares: Squares = history[currentStep]
  const winner = calculateWinner(currentSquares)
  const nextValue = calculateNextValue(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square: SquareIdx): void {
    if (winner || currentSquares[square]) {
      return
    }

    const newHistory: History = history.slice(0, currentStep + 1)
    const squares: Squares = [...currentSquares]

    squares[square] = nextValue
    setHistory([...newHistory, squares])
    setCurrentStep(newHistory.length as StepNumber)
  }

  function restart() {
    setHistory(initialHistory())
    setCurrentStep(0)
  }

  const moves = history.map((stepSquares, step) => {
    const desc = step ? `Go to move #${step}` : 'Go to game start'
    const isCurrentStep = step === currentStep
    return (
      <li key={step}>
        <button
          disabled={isCurrentStep}
          onClick={() => setCurrentStep(step as StepNumber)}
        >
          {desc} {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateStatus(
  winner: X | O | null,
  squares: Squares,
  nextValue: X | O,
) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares: Squares): X | O {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

function calculateWinner(squares: Squares): X | O | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ] as const
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App(): JSX.Element {
  return <Game />
}

export default App
