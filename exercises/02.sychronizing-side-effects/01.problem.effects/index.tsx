import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { generateGradient, getMatchingPosts } from '#shared/blog-posts'
import { setSearchParams } from '#shared/utils'

function App() {
	// NOTE: this will not work with server rendering, but in a real app you can
	// use react-router's useSearchParams instead
	const params = new URLSearchParams(window.location.search)
	// 🐨 create a function called getQueryParam that returns the query param
	// (and falls back to an empty string)
	const [query, setQuery] = useState(params.get('query') ?? '')

	const words = query.split(' ')

	const dogChecked = words.includes('dog')
	const catChecked = words.includes('cat')
	const caterpillarChecked = words.includes('caterpillar')

	// 🐨 add a useEffect(() => {}, []) call here
	// 🦉 if you're familiar with the dependency array problem we have, don't
	// spoil it for everyone else! We'll get to it soon enough!
	// 🐨 in the useEffect callback, subscribe to window's popstate event
	// 🐨 your event handler should call setQuery to getQueryParam()
	// 📜 https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
	// 🐨 the second argument to useEffect should be an empty array

	function handleCheck(tag: string, checked: boolean) {
		const newWords = checked ? [...words, tag] : words.filter(w => w !== tag)
		setQuery(newWords.filter(Boolean).join(' ').trim())
	}

	return (
		<div className="app">
			<form
				onSubmit={e => {
					e.preventDefault()
					setSearchParams({ query })
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
ReactDOM.createRoot(rootEl).render(<App />)

// 🤫 we'll talk about this later!
/*
eslint
	react-hooks/exhaustive-deps: "off",
*/
