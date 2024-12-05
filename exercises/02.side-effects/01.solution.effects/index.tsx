import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { generateGradient, getMatchingPosts } from '#shared/blog-posts'
import { setGlobalSearchParams } from '#shared/utils'

function getQueryParam() {
	const params = new URLSearchParams(window.location.search)
	return params.get('query') ?? ''
}

function App() {
	const [query, setQuery] = useState(getQueryParam)

	const words = query.split(' ')

	const dogChecked = words.includes('dog')
	const catChecked = words.includes('cat')
	const caterpillarChecked = words.includes('caterpillar')

	useEffect(() => {
		window.addEventListener('popstate', () => setQuery(getQueryParam()))
	}, [])

	function handleCheck(tag: string, checked: boolean) {
		const newWords = checked ? [...words, tag] : words.filter(w => w !== tag)
		setQuery(newWords.filter(Boolean).join(' ').trim())
	}

	return (
		<div className="app">
			<form
				action={() => {
					setGlobalSearchParams({ query })
				}}
			>
				<div>
					<label htmlFor="searchInput">Search:</label>
					<input
						id="searchInput"
						name="query"
						type="search"
						value={query}
						onChange={e => setQuery(e.currentTarget.value)}
					/>
				</div>
				<div>
					<label>
						<input
							type="checkbox"
							checked={dogChecked}
							onChange={e => handleCheck('dog', e.currentTarget.checked)}
						/>{' '}
						🐶 dog
					</label>
					<label>
						<input
							type="checkbox"
							checked={catChecked}
							onChange={e => handleCheck('cat', e.currentTarget.checked)}
						/>{' '}
						🐱 cat
					</label>
					<label>
						<input
							type="checkbox"
							checked={caterpillarChecked}
							onChange={e =>
								handleCheck('caterpillar', e.currentTarget.checked)
							}
						/>{' '}
						🐛 caterpillar
					</label>
				</div>
				<button type="submit">Submit</button>
			</form>
			<MatchingPosts query={query} />
		</div>
	)
}

function MatchingPosts({ query }: { query: string }) {
	const matchingPosts = getMatchingPosts(query)

	return (
		<ul className="post-list">
			{matchingPosts.map(post => (
				<li key={post.id}>
					<div
						className="post-image"
						style={{ background: generateGradient(post.id) }}
					/>
					<a
						href={post.id}
						onClick={event => {
							event.preventDefault()
							alert(`Great! Let's go to ${post.id}!`)
						}}
					>
						<h2>{post.title}</h2>
						<p>{post.description}</p>
					</a>
				</li>
			))}
		</ul>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
createRoot(rootEl).render(<App />)
