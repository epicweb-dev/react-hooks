import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'

import './index.tsx'

await testStep('VanillaTilt is initialized', async () => {
	await dtl.waitFor(() => {
		const tiltElement = document.querySelector('.tilt-root')
		expect(tiltElement).toHaveProperty('vanillaTilt')
	})
})
