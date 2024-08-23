import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent, waitFor } = dtl

const localStorageKey = 'squares'
const initialState = ['X', null, 'O', null, 'X', null, null, null, null]
window.localStorage.setItem(localStorageKey, JSON.stringify(initialState))

// Dynamically import the game component
await import('./index.tsx')

await testStep('Game initializes from localStorage', async () => {
	await waitFor(() => {
		const squares = document.querySelectorAll('button.square')
		expect(squares[0]).toHaveTextContent('X')
		expect(squares[2]).toHaveTextContent('O')
		expect(squares[4]).toHaveTextContent('X')
	})
})

await testStep('Game updates localStorage after a move', async () => {
	// Make a move
	const squares = document.querySelectorAll('button.square')
	fireEvent.click(squares[1])

	// Verify localStorage is updated
	await waitFor(() => {
		const storedState = JSON.parse(
			window.localStorage.getItem(localStorageKey) || '[]',
		)
		expect(storedState).toEqual([
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

await testStep('Restart button clears localStorage', async () => {
	const restartButton = await screen.findByRole('button', { name: /restart/i })
	fireEvent.click(restartButton)

	// Check if localStorage is cleared
	await waitFor(() => {
		const storedState = JSON.parse(
			window.localStorage.getItem(localStorageKey) || '[]',
		)
		expect(storedState).toEqual([
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
		])
	})

	// Check if the board is reset
	const squares = document.querySelectorAll('button.square')
	expect(squares).toHaveLength(9)
})
