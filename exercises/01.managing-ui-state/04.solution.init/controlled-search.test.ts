import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent } = dtl

import './index.tsx'

const searchBox = await testStep(
	'The user can see the search box',
	async () => {
		const result = await screen.findByRole('searchbox', { name: /search/i })
		expect(result).toHaveValue('')
		return result
	},
)

const dogCheckbox = await testStep(
	'The user can see the dog checkbox',
	async () => {
		const result = await screen.findByRole('checkbox', { name: /dog/i })
		expect(result).not.toBeChecked()
		return result
	},
)

await testStep('The user can select the dog checkbox', async () => {
	fireEvent.click(dogCheckbox)
	expect(dogCheckbox).toBeChecked()
})

await testStep(
	'Selecting the checkbox updates the search and results',
	async () => {
		// Check that the search box value has been updated
		expect(searchBox).toHaveValue('dog')

		// Check that the results have been filtered
		await dtl.waitFor(async () => {
			await screen.findByText(/the joy of owning a dog/i)

			const catResult = screen.queryByText(/caring for your feline friend/i)
			expect(catResult).not.toBeInTheDocument()
		})
	},
)
