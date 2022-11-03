// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import {useLocalStorageState} from "../utils"

const initializeSquares = Array(9).fill(null)
const initializeHistory = [initializeSquares]

function Board({squares, onClick}) {
  function renderSquare(i) {
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

function Game() {
  const [currentSquares, setCurrentSquares] = useLocalStorageState('current', initializeSquares);
  const [history, setHistory] = useLocalStorageState('history', [...initializeHistory]);
  const [currentStep, setCurrentStep] = React.useState(calculateCurrentStep(history))
  const [nextValue, setNextValue] = React.useState(calculateNextValue(currentSquares))
  const [winner, setWinner] = React.useState(calculateWinner(currentSquares))
  const [status, setStatus] = React.useState(
    calculateStatus(winner, currentSquares, nextValue)
  )

  function restart() {
    const squaresCopy = [...initializeSquares]
    const newHistory = [...initializeHistory]
    setHistory(newHistory)
    setCurrentStep(calculateCurrentStep(newHistory))
    updateState(squaresCopy)
  }

  function updateState(squares) {
    const nextValueCopy = calculateNextValue(squares)
    const winnerCopy = calculateWinner(squares)
    const statusCopy = calculateStatus(winnerCopy, squares, nextValueCopy)
    setCurrentSquares(squares)
    setNextValue(nextValueCopy)
    setWinner(winnerCopy)
    setStatus(statusCopy)
  }

  function calculateCurrentStep(history) {
    return history.length - 1
  }

  function selectSquare(square) {
    if (currentSquares[square] !== null || winner !== null) {
      return null
    }

    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue

    const nextStep = currentStep + 1
    setCurrentStep(nextStep)
    
    const historyCopy = [...history].splice(0, nextStep)
    const newHistory = [...historyCopy, squaresCopy]
    setHistory(newHistory)
    
    updateState(squaresCopy)
  }


  function renderMove(step, history) {
    const buttonText = step === 0 ? "Go to game start" : `Go to move #${step}`

    return (
      <li>
        <button onClick={() => {calculateCurrentSquares(step, history)}} disabled={currentStep === step}>
          {buttonText} {currentStep === step && "(current)"}
        </button>
      </li>
    )
  }

  function calculateCurrentSquares(step, history) {
    const selectedSquares = history[step]
    setCurrentStep(step)
    updateState(selectedSquares)
  }

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
        <ol>{history.map((sq, step) => renderMove(step, history))}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
