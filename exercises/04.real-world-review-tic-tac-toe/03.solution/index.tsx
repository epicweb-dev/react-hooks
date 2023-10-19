import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {useLocalStorageState} from '~/shared/utils'
import {
  calculateStatus,
  calculateNextValue,
  calculateWinner,
} from '~/shared/tic-tac-toe-utils'
import type {Squares} from '~/shared/tic-tac-toe-utils'

function Board() {
  const [squares, setSquares] = useLocalStorageState<Squares>(
    'squares',
    Array(9).fill(null),
  )

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

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
