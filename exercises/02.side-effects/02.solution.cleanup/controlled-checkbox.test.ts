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

await testStep('The user can search for a checkbox value', async () => {
	fireEvent.change(searchBox, { target: { value: 'dog' } })
})

await testStep('checkbox is checked automatically', async () => {
	expect(dogCheckbox).toBeChecked()
})
