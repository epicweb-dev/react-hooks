const blogPosts = [
	{
		id: 'cc96d5325894a',
		title: 'The Joy of Owning a Dog',
		description:
			'Discover the happiness and companionship that comes with owning a dog.',
		tags: ['dog', 'happiness'],
	},
	{
		id: 'b912d5c6674bb',
		title: 'Caring for Your Feline Friend',
		description:
			'Learn how to provide the best care for your beloved cat (not caterpillar).',
		tags: ['cat', 'care', 'caterpillar'],
	},
	{
		id: 'ed9189302b665',
		title: 'The Fascinating World of Caterpillars',
		description:
			'Explore the incredible transformation of caterpillars into beautiful butterflies.',
		tags: ['caterpillar', 'butterfly'],
	},
	{
		id: '6903727b0009e',
		title: 'Training Your Dog: Tips and Tricks',
		description:
			'Discover effective techniques to train your dog and build a strong bond.',
		tags: ['dog', 'training'],
	},
	{
		id: 'c631e68546bf3',
		title: 'Cat Breeds: Choosing the Perfect Companion',
		description:
			'Find the ideal cat breed that matches your lifestyle and personality.',
		tags: ['cat', 'breeds'],
	},
	{
		id: '0c2ef14638642',
		title: 'The Life Cycle of a Butterfly',
		description:
			"Learn about the stages of a butterfly's life and its importance in nature.",
		tags: ['caterpillar', 'butterfly'],
	},
	{
		id: 'd75f1c4c29da1',
		title: 'Dog Health: Common Issues and Prevention',
		description:
			'Discover how to keep your dog healthy and prevent common health problems.',
		tags: ['dog', 'health'],
	},
	{
		id: '537c25b372465',
		title: 'Cat Behavior: Understanding Your Feline Friend',
		description:
			'Gain insights into the behavior of cats, why some hate dogs, and how to strengthen your bond with them.',
		tags: ['cat', 'behavior', 'dog'],
	},
	{
		id: '12556f3115f1',
		title: 'Gardening for Caterpillars: Creating a Butterfly Haven',
		description:
			'Learn how to create a garden that attracts caterpillars and supports butterfly populations.',
		tags: ['caterpillar', 'gardening'],
	},
	{
		id: '405654d99d80d',
		title: 'Dog-Friendly Activities: Fun Adventures for You and Your Pup',
		description:
			'Discover exciting activities to enjoy with your dog and create lasting memories.',
		tags: ['dog', 'activities'],
	},
] as const

export type BlogPost = (typeof blogPosts)[number]

function getColorFromSeed(
	seed: string,
	startIndex: number,
	length: number,
): string {
	const endIndex = (startIndex + length) % seed.length
	if (endIndex >= startIndex) {
		return seed.slice(startIndex, endIndex)
	} else {
		return seed.slice(startIndex) + seed.slice(0, endIndex)
	}
}

export function generateGradient(seedHex: string): string {
	const color1 = getColorFromSeed(seedHex, 0, 6)
	const color2 = getColorFromSeed(seedHex, 6, 6)
	const degree = seedHex.charCodeAt(0) % 360
	const gradient = `linear-gradient(${degree}deg, #${color1}, #${color2})`

	return gradient
}

export function getMatchingPosts(query: string) {
	const words = query.split(' ').map(w => w.trim())
	return blogPosts.filter(post => {
		if (!query) return true
		return (
			words.every(word => post.tags.some(tag => tag === word)) ||
			post.title.toLowerCase().includes(query.toLowerCase()) ||
			post.description.toLowerCase().includes(query.toLowerCase())
		)
	})
}
