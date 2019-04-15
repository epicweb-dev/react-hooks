// Tic Tac Toe: Advanced State
// http://localhost:3000/isolated/exercises-final/04-extra.0
import React from 'react'

function Board({squares, onClick}) {
  const renderSquare = i => (
    <button className="square" onClick={() => onClick(i)}>
      {squares[i]}
    </button>
  )

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
  const [history, setHistory] = React.useState([{squares: Array(9).fill(null)}])
  const [stepNumber, setStepNumber] = React.useState(0)
  const xIsNext = stepNumber % 2 === 0

  function selectSquare(square) {
    const newHistory = history.slice(0, stepNumber + 1)
    const current = newHistory[newHistory.length - 1]
    const squares = [...current.squares]

    if (calculateWinner(squares) || squares[square]) {
      return
    }

    squares[square] = xIsNext ? 'X' : 'O'
    setHistory([...newHistory, {squares}])
    setStepNumber(newHistory.length)
  }

  const current = history[stepNumber]
  const winner = calculateWinner(current.squares)
  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else if (current.squares.every(Boolean)) {
    status = `Scratch: Cat's game`
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  const moves = history.map((step, stepNumber) => {
    const desc = stepNumber ? `Go to move #${stepNumber}` : 'Go to game start'
    return (
      <li key={stepNumber}>
        <button onClick={() => setStepNumber(stepNumber)}>{desc}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={current.squares} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
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
