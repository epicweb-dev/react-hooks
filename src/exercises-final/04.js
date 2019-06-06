// Tic Tac Toe: Advanced State

import React from 'react'

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null))
  const nextValue = calculateWhoIsNext(squares)
  const winner = calculateWinner(squares)

  function selectSquare(square) {
    if (winner || squares[square]) {
      return
    }
    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setSquares(squaresCopy)
  }

  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else if (squares.every(Boolean)) {
    status = `Scratch: Cat's game`
  } else {
    status = `Next player: ${nextValue}`
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <button className="square" onClick={() => selectSquare(0)}>
          {squares[0]}
        </button>
        <button className="square" onClick={() => selectSquare(1)}>
          {squares[1]}
        </button>
        <button className="square" onClick={() => selectSquare(2)}>
          {squares[2]}
        </button>
      </div>
      <div className="board-row">
        <button className="square" onClick={() => selectSquare(3)}>
          {squares[3]}
        </button>
        <button className="square" onClick={() => selectSquare(4)}>
          {squares[4]}
        </button>
        <button className="square" onClick={() => selectSquare(5)}>
          {squares[5]}
        </button>
      </div>
      <div className="board-row">
        <button className="square" onClick={() => selectSquare(6)}>
          {squares[6]}
        </button>
        <button className="square" onClick={() => selectSquare(7)}>
          {squares[7]}
        </button>
        <button className="square" onClick={() => selectSquare(8)}>
          {squares[8]}
        </button>
      </div>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function calculateWhoIsNext(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

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

function Usage() {
  return <Game />
}
Usage.title = 'Tic Tac Toe: Advanced State'

export default Usage
