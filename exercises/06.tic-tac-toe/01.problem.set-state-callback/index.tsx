import { createRoot } from 'react-dom/client'
// 💰 here are some handy utilities for you:
// import {
// 	calculateNextValue,
// 	calculateStatus,
// 	calculateWinner,
// 	type Squares,
// } from '#shared/tic-tac-toe-utils'

const defaultState = Array(9).fill(null)

function Board() {
	// 🐨 squares is the state for this component. Add useState for squares
	// 🦺 you can use the Squares type for the useState generic
	const squares = defaultState

	// 🐨 We'll need the following bits of derived state:
	// - nextValue ('X' or 'O')
	// - winner ('X', 'O', or null)
	// - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
	// 💰 I've written the calculations for you! So you can use my utilities
	// from the imports above to create these variables

	// This is the function your square click handler will call. `square` should
	// be an index. So if they click the center square, this will be `4`.
	function selectSquare(index: number) {
		// 🐨 first, if there's already winner or there's already a value at the
		// given square index (like someone clicked a square that's already been
		// clicked), then return early so we don't make any state changes
		//
		// 🐨 call setSquares and pass a callback
		// which accepts the "previousSquares", and does this:
		//   🐨 make a copy of the squares array with the updated value
		//   💰 previousSquares.with(index, nextValue) will do it!
		//
		//   🐨 return your copy of the squares
	}

	function restart() {
		// 🐨 reset the squares by calling setSquares with an array of empty squares
		// 💰 you can use the defaultState variable
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
			{/* 🐨 put the status in the div below */}
			<div className="status">STATUS</div>
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
