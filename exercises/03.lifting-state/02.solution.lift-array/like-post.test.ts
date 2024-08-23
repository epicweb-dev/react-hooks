import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent } = dtl

import './index.tsx'

await testStep('The user can see the posts', async () => {
	await screen.findByText(/caring for your feline friend/i)
	await screen.findByText(/the joy of owning a dog/i)
})

const likeButtons = await testStep(
	'The user can see like buttons',
	async () => {
		const buttons = await screen.findAllByRole('button', {
			name: /add favorite/i,
		})
		expect(buttons.length).toBeGreaterThan(0)
		return buttons
	},
)

const totalLikeButtons = likeButtons.length

await testStep('The user can like a post', async () => {
	fireEvent.click(likeButtons[1])
	await screen.findByRole('button', { name: /remove favorite/i })
})

await testStep('The liked post moves to the top', async () => {
	const posts = screen.getAllByRole('listitem')
	const firstPost = posts[0]
	expect(
		firstPost,
		'The first post should have a remove favorite button',
	).toContainElement(screen.getByRole('button', { name: /remove favorite/i }))
})

await testStep('The user can unlike a post', async () => {
	const unlikeButton = await screen.findByRole('button', {
		name: /remove favorite/i,
	})
	fireEvent.click(unlikeButton)

	await dtl.waitFor(() =>
		expect(
			screen.queryByRole('button', { name: /remove favorite/i }),
		).not.toBeInTheDocument(),
	)
	const buttons = await screen.findAllByRole('button', {
		name: /add favorite/i,
	})
	expect(buttons.length).toBe(totalLikeButtons)
})
