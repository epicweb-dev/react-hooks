import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent, waitFor } = dtl

const localStorageKey = 'tic-tac-toe'
const initialState = {
	history: [['X', null, 'O', null, 'X', null, null, null, null]],
	currentStep: 0,
}
window.localStorage.setItem(localStorageKey, JSON.stringify(initialState))

// Dynamically import the game component
await import('./index.tsx')

function getSquares() {
	return waitFor(() => {
		const squares = document.querySelectorAll('button.square')
		expect(squares).toHaveLength(9)
		return squares
	})
}

await testStep('Game initializes from localStorage', async () => {
	await waitFor(async () => {
		const squares = await getSquares()
		expect(squares[0]).toHaveTextContent('X')
		expect(squares[2]).toHaveTextContent('O')
		expect(squares[4]).toHaveTextContent('X')
	})
})

await testStep('Game updates localStorage after a move', async () => {
	// Make a move
	const squares = await getSquares()
	fireEvent.click(squares[1])

	// Verify localStorage is updated
	await waitFor(() => {
		const storedState = JSON.parse(
			window.localStorage.getItem(localStorageKey) || '{}',
		)
		expect(storedState.history).toHaveLength(2)
		expect(storedState.currentStep).toBe(1)
		expect(storedState.history[1]).toEqual([
			'X',
			'O',
			'O',
			null,
			'X',
			null,
			null,
			null,
			null,
		])
	})
})

await testStep('Adding another move', async () => {
	const squares = await getSquares()
	fireEvent.click(squares[5])
	await new Promise(resolve => setTimeout(resolve, 100))
})

await testStep('Game history allows going back to previous moves', async () => {
	// Go back to the first move
	const moveButtons = screen.getAllByRole('button', { name: /Go to move/i })
	fireEvent.click(moveButtons[0])

	// Verify the board state
	await waitFor(async () => {
		const squares = await getSquares()
		expect(squares[0]).toHaveTextContent('X')
		expect(squares[1]).toHaveTextContent('O')
		expect(squares[2]).toHaveTextContent('O')
		expect(squares[4]).toHaveTextContent('X')
	})

	// Verify localStorage is updated
	const storedState = JSON.parse(
		window.localStorage.getItem(localStorageKey) || '{}',
	)
	expect(storedState.currentStep).toBe(1)
})

await testStep('Restart button clears game history', async () => {
	const restartButton = await screen.findByRole('button', { name: /restart/i })
	fireEvent.click(restartButton)

	// Check if localStorage is reset
	await waitFor(() => {
		const storedState = JSON.parse(
			window.localStorage.getItem(localStorageKey) || '{}',
		)
		expect(storedState).toEqual({
			history: [Array(9).fill(null)],
			currentStep: 0,
		})
	})

	// Check if the board is reset
	const squares = await getSquares()
	squares.forEach(square => expect(square).toHaveTextContent(''))

	// Check if move history is cleared
	const moveButtons = screen.queryAllByRole('button', { name: /Go to/i })
	expect(moveButtons).toHaveLength(1) // Only "Go to game start" should remain
})
