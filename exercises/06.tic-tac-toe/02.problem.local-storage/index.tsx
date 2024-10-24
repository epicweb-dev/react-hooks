import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
	calculateNextValue,
	calculateStatus,
	calculateWinner,
	type Squares,
} from '#shared/tic-tac-toe-utils'

const defaultState = Array(9).fill(null)
// 🐨 create a variable for the key you'll use for storing the squares
// 💰 'squares' should work well.
function Board() {
	// 🐨 use the callback form for useState. The callback should:
	// 1. get the value from localStorage using the key you created above
	// 2. parse the JSON from that value
	// 3. return the parsed value (or the default value if there isn't one)
	// 💯 for extra credit, handle situations where the value doesn't exist or fails to parse
	const [squares, setSquares] = useState<Squares>(Array(9).fill(null))

	// 🐨 add a useEffect here that updates the local storage value of the squares
	// 💰 you should stringify the squares using JSON.stringify because local storage only supports strings

	const nextValue = calculateNextValue(squares)
	const winner = calculateWinner(squares)
	const status = calculateStatus(winner, squares, nextValue)

	function selectSquare(index: number) {
		if (winner || squares[index]) return
		setSquares(previousSquares => previousSquares.with(index, nextValue))
	}

	function restart() {
		setSquares(defaultState)
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
createRoot(rootEl).render(<App />)
