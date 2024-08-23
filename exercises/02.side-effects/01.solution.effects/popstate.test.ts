import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent } = dtl

const currentPath = window.location.pathname
window.history.pushState({}, '', `${currentPath}?query=dog`)

await import('./index.tsx')

await testStep(
	'The search box is initialized with URL query parameter',
	async () => {
		const searchBox = await screen.findByRole('searchbox', { name: /search/i })
		expect(searchBox).toHaveValue('dog')
	},
)

// wait for the event handler to be set up
// for some reason it takes a bit
await new Promise(resolve => setTimeout(resolve, 100))

await testStep(
	'The search box updates when popstate event is triggered',
	async () => {
		// Simulate navigation to a new URL
		const currentPath = window.location.pathname
		window.history.pushState({}, '', `${currentPath}?query=cat`)

		// Trigger popstate event
		fireEvent.popState(window)

		// Check if the search box value is updated
		await dtl.waitFor(async () =>
			expect(
				await screen.findByRole('searchbox', { name: /search/i }),
			).toHaveValue('cat'),
		)
	},
)
