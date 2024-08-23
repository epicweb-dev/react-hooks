import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
import type VanillaTilt from 'vanilla-tilt'
const { screen, fireEvent, waitFor } = dtl

interface HTMLVanillaTiltElement extends HTMLDivElement {
	vanillaTilt?: VanillaTilt
}

import './index.tsx'

const tiltElement = await testStep('Initialize tilt element', async () => {
	const result = await waitFor(() => {
		const element = document.querySelector('.tilt-root')
		expect(element).toBeInTheDocument()
		return element
	})
	await waitFor(() => {
		expect(result).toHaveProperty('vanillaTilt')
	})
	return result as HTMLVanillaTiltElement
})

await testStep('Find count button', async () => {
	const button = await screen.findByRole('button', { name: /0/i })
	expect(button).toBeInTheDocument()
	return button as HTMLButtonElement
})

const maxInput = await testStep('Find max input', async () => {
	const input = (await screen.findByLabelText('Max:')) as HTMLInputElement
	expect(input).toBeInTheDocument()
	return input as HTMLInputElement
})

await testStep('Tilt effect resets when options change', async () => {
	const initialVanillaTilt = tiltElement.vanillaTilt
	fireEvent.change(maxInput, { target: { value: '30' } })
	await waitFor(() => {
		expect(tiltElement.vanillaTilt).not.toBe(initialVanillaTilt)
	})
})

await testStep('Tilt effect uses updated options', async () => {
	const newMax = 35
	fireEvent.change(maxInput, { target: { value: newMax.toString() } })
	await waitFor(() => {
		// @ts-expect-error this is not exposed
		expect(tiltElement.vanillaTilt?.settings.max).toBe(newMax)
	})
})
