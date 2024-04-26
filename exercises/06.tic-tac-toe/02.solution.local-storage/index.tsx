import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
	calculateNextValue,
	calculateStatus,
	calculateWinner,
	type Squares,
} from '#shared/tic-tac-toe-utils'

const defaultState = Array(9).fill(null)

const localStorageKey = 'squares'
function Board() {
	const [squares, setSquares] = useState<Squares>(() => {
		let localStorageValue
		try {
			localStorageValue = JSON.parse(
				window.localStorage.getItem(localStorageKey) ?? 'null',
			)
		} catch {
			// something is wrong in localStorage, so don't use it
		}
		return localStorageValue && Array.isArray(localStorageValue)
			? localStorageValue
			: defaultState
	})

	useEffect(() => {
		window.localStorage.setItem(localStorageKey, JSON.stringify(squares))
	}, [squares])

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
