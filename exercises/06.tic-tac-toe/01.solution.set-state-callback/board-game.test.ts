import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent, waitFor } = dtl

await import('./index.tsx')

function getSquares() {
	return waitFor(() => {
		const squares = document.querySelectorAll('button.square')
		expect(squares).toHaveLength(9)
		return squares
	})
}

await testStep('Initial board state', getSquares)

const statusElement = await testStep('Find status element', async () => {
	const status = await screen.findByText(/Next player: X/)
	expect(status).toBeInTheDocument()
	return status
})

await testStep('Play a game', async () => {
	const squares = await getSquares()

	// X plays
	fireEvent.click(squares[0])
	await waitFor(() => {
		expect(squares[0]).toHaveTextContent('X')
	})
	expect(statusElement).toHaveTextContent('Next player: O')

	// O plays
	fireEvent.click(squares[4])
	await waitFor(() => {
		expect(squares[4]).toHaveTextContent('O')
	})
	expect(statusElement).toHaveTextContent('Next player: X')

	// X plays
	fireEvent.click(squares[1])
	// O plays
	fireEvent.click(squares[5])
	// X plays and wins
	fireEvent.click(squares[2])

	await waitFor(() => {
		expect(statusElement).toHaveTextContent('Winner: X')
	})
})

await testStep('Restart game', async () => {
	const restartButton = await screen.findByRole('button', { name: /restart/i })
	fireEvent.click(restartButton)

	await waitFor(async () => {
		const squares = await getSquares()
		expect(squares).toHaveLength(9)
		expect(statusElement).toHaveTextContent('Next player: X')
	})
})

await testStep('Cannot play on occupied square', async () => {
	const squares = await getSquares()

	fireEvent.click(squares[0])
	await waitFor(() => {
		expect(squares[0]).toHaveTextContent('X')
	})

	fireEvent.click(squares[0])
	await waitFor(() => {
		expect(squares[0]).toHaveTextContent('X')
		expect(statusElement).toHaveTextContent('Next player: O')
	})
})

await testStep('Game ends in a draw', async () => {
	const restartButton = await screen.findByRole('button', { name: /restart/i })
	fireEvent.click(restartButton)
	await new Promise(resolve => setTimeout(resolve, 10))

	const squares = await getSquares()
	const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8]

	for (const move of moves) {
		fireEvent.click(squares[move])
		await new Promise(resolve => setTimeout(resolve, 10))
	}

	await waitFor(() => {
		expect(statusElement).toHaveTextContent(`Cat's game`)
	})
})
