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

const catResult = await testStep('The user can see the results', async () => {
	const result = screen.getByText(/caring for your feline friend/i)
	expect(result).toBeInTheDocument()
	return result
})

await testStep('The user can search for a term', async () => {
	fireEvent.change(searchBox, { target: { value: 'dog' } })
})

await testStep('The results are filtered', async () => {
	await dtl.waitFor(() => {
		expect(catResult).not.toBeInTheDocument()
	})
	await screen.findByText(/the joy of owning a dog/i)
})
