import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent } = dtl

// Import the component
await import('./index.tsx')

declare global {
	interface Performance {
		memory?: {
			usedJSHeapSize: number
			jsHeapSizeLimit: number
			totalJSHeapSize: number
		}
	}
}

if (performance.memory) {
	async function toggleShowForm(times: number) {
		const checkbox = await screen.findByLabelText(/show form/i)
		for (let i = 0; i < times; i++) {
			fireEvent.click(checkbox)
			// Wait for any asynchronous operations to complete
			await new Promise(resolve => setTimeout(resolve, 10))
		}
	}

	await testStep(
		'Memory usage does not increase linearly when toggling showForm',
		async () => {
			// Check if memory measurement is available
			if (!performance.memory) {
				console.warn(
					'Memory measurement is not available in this browser. Skipping test.',
				)
				return
			}

			// wait a bit for garbage collection to finish
			await new Promise(resolve => setTimeout(resolve, 500))
			const initialMemory = performance.memory.usedJSHeapSize

			await toggleShowForm(250)

			// wait a bit for garbage collection to finish
			await new Promise(resolve => setTimeout(resolve, 500))

			const finalMemory = performance.memory.usedJSHeapSize

			const initialMemoryMB =
				(initialMemory / (1024 * 1024)).toLocaleString() + ' MB'
			const finalMemoryMB =
				(finalMemory / (1024 * 1024)).toLocaleString() + ' MB'

			const percentageChange = (
				((finalMemory - initialMemory) / initialMemory) *
				100
			).toFixed(2)
			expect(
				Number(percentageChange),
				`🚨 The memory usage increased from ${initialMemoryMB} to ${finalMemoryMB} (a ${percentageChange}% increase)`,
			).toBeLessThan(110)
		},
	)
} else {
	await testStep(
		'Memory measurement is not available in this browser. Skipping test.',
		() => {},
	)
}
