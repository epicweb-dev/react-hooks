import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent } = dtl

window.history.pushState({}, '', '?query=dog')

await import('./index.tsx')

await testStep(
	'The search box is initialized with URL query parameter',
	async () => {
		const searchBox = await screen.findByRole('searchbox', { name: /search/i })
		expect(searchBox).toHaveValue('dog')
	},
)
