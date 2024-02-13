export type Player = 'X' | 'O'
export type Squares = Array<Player | null>

export type GameState = {
	history: Array<Squares>
	currentStep: number
}

function isSquare(value: unknown): value is null | 'X' | 'O' {
	return value === null || value === 'X' || value === 'O'
}

function isArray(value: unknown): value is Array<unknown> {
	return Array.isArray(value)
}

function isSquaresArray(value: unknown): value is Squares {
	if (!isArray(value)) return false
	return value.length === 9 && value.every(isSquare)
}

function isHistory(value: unknown): value is Array<Squares> {
	if (!isArray(value)) return false
	if (!value.every(isSquaresArray)) return false
	return true
}

function isStep(value: unknown): value is number {
	return (
		typeof value === 'number' &&
		Number.isInteger(value) &&
		value >= 0 &&
		value <= 9
	)
}

export function isValidGameState(value: unknown): value is GameState {
	return (
		typeof value === 'object' &&
		value !== null &&
		isHistory((value as any).history) &&
		isStep((value as any).currentStep)
	)
}

export function calculateStatus(
	winner: null | string,
	squares: Squares,
	nextValue: Player,
) {
	return winner
		? `Winner: ${winner}`
		: squares.every(Boolean)
			? `Scratch: Cat's game`
			: `Next player: ${nextValue}`
}

export function calculateNextValue(squares: Squares): Player {
	const xSquaresCount = squares.filter(r => r === 'X').length
	const oSquaresCount = squares.filter(r => r === 'O').length
	return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

export function calculateWinner(squares: Squares): Player | null {
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
		const line = lines[i]
		if (!line) continue
		const [a, b, c] = line
		if (a === undefined || b === undefined || c === undefined) continue

		const player = squares[a]
		if (player && player === squares[b] && player === squares[c]) {
			return player
		}
	}
	return null
}
