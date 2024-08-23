import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent } = dtl

import './index.tsx'

const toggleButton = await testStep(
	'The user can see the toggle visibility button',
	async () => {
		const result = await screen.findByRole('button', {
			name: /toggle visibility/i,
		})
		expect(result).toBeInTheDocument()
		return result
	},
)

await testStep('The Tilt component is initially visible', async () => {
	return dtl.waitFor(() => {
		const result = document.querySelector('.tilt-root')
		expect(result).toBeInTheDocument()
		return result
	})
})

const countButton = await testStep(
	'The count button is visible inside the Tilt component',
	async () => {
		const result = await screen.findByRole('button', { name: /0/i })
		expect(result).toBeInTheDocument()
		return result
	},
)

await testStep('The user can increment the count', async () => {
	fireEvent.click(countButton)
	const updatedButton = await screen.findByRole('button', { name: /1/i })
	expect(updatedButton).toBeInTheDocument()
})

await testStep(
	'The user can toggle the Tilt component visibility',
	async () => {
		fireEvent.click(toggleButton)
		await dtl.waitFor(() => {
			expect(document.querySelector('.tilt-root')).not.toBeInTheDocument()
		})

		fireEvent.click(toggleButton)
		const visibleTiltElement = await dtl.waitFor(() => {
			const result = document.querySelector('.tilt-root')
			expect(result).toBeInTheDocument()
			return result
		})
		expect(visibleTiltElement).toBeInTheDocument()
	},
)
