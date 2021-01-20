// Real World Review: Tic Tac Toe
// 💯 preserve state in localStorage
// http://localhost:3000/isolated/final/04.extra-1.tsx

import * as React from 'react'
import {
  calculateStatus,
  calculateNextValue,
  calculateWinner,
} from '../tic-tac-toe-utils'
import type {Squares} from '../tic-tac-toe-utils'

function Board() {
  const [squares, setSquares] = React.useState<Squares>(() => {
    let localStorageValue
    try {
      localStorageValue = JSON.parse(
        window.localStorage.getItem('squares') ?? 'null',
      )
    } catch (error: unknown) {
      // something is wrong in localStorage, so don't use it
    }
    if (localStorageValue) {
      return localStorageValue
    } else {
      return Array(9).fill(null)
    }
  })

  React.useEffect(() => {
    window.localStorage.setItem('squares', JSON.stringify(squares))
  }, [squares])

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(index: number) {
    if (winner || squares[index]) {
      return
    }
    setSquares(previousSquares => {
      const squaresCopy = [...previousSquares]
      squaresCopy[index] = nextValue
      return squaresCopy
    })
  }

  function restart() {
    setSquares(Array(9).fill(null))
  }

  function renderSquare(i: number) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
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
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function App() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

export {App}
