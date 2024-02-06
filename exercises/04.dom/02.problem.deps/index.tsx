// 1️⃣ 🐨 before you do anything else, head down to the useEffect and fix the
// dependency array!
import { useEffect, useRef, useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import VanillaTilt from 'vanilla-tilt'

interface HTMLVanillaTiltElement extends HTMLDivElement {
	vanillaTilt: VanillaTilt
}

function Tilt({
	children,
	// 4️⃣ 🐨 get rid of this rest operator and destructure each prop instead
	...options
}: {
	children: React.ReactNode
	max?: number
	speed?: number
	glare?: boolean
	maxGlare?: number
}) {
	const tiltRef = useRef<HTMLVanillaTiltElement>(null)

	useEffect(() => {
		const { current: tiltNode } = tiltRef
		if (tiltNode === null) return
		const vanillaTiltOptions = {
			// 5️⃣ 🐨 get rid of options here and simply pass each individual option
			...options,
			max: 25,
			speed: 400,
			glare: true,
			'max-glare': 0.5,
		}
		VanillaTilt.init(tiltNode, vanillaTiltOptions)
		return () => tiltNode.vanillaTilt.destroy()
		// 2️⃣ 🐨 OH NO! NEVER DISABLE THIS LINT RULE!
		// Add the options to fix the original bug
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	// 3️⃣ 🦉 once you add options to the dependency array though, you'll notice
	// another bug... Clicking on the button resets the tilt effect because the
	// options object is new every render! 🤦‍♂️
	// 6️⃣ 🐨 get rid of the options from the dependency array and add each
	// individual option.

	return (
		<div ref={tiltRef} className="tilt-root">
			<div className="tilt-child">{children}</div>
		</div>
	)
}

function App() {
	const [count, setCount] = useState(0)
	const [options, setOptions] = useState({
		max: 25,
		speed: 400,
		glare: true,
		maxGlare: 0.5,
	})
	return (
		<div className="app">
			<form
				onSubmit={e => e.preventDefault()}
				onChange={event => {
					const formData = new FormData(event.currentTarget)
					setOptions({
						max: formData.get('max') as any,
						speed: formData.get('speed') as any,
						glare: formData.get('glare') === 'on',
						maxGlare: formData.get('maxGlare') as any,
					})
				}}
			>
				<div>
					<label htmlFor="max">Max:</label>
					<input id="max" name="max" type="number" defaultValue={25} />
				</div>
				<div>
					<label htmlFor="speed">Speed:</label>
					<input id="speed" name="speed" type="number" defaultValue={400} />
				</div>
				<div>
					<label>
						<input id="glare" name="glare" type="checkbox" defaultChecked />
						Glare
					</label>
				</div>
				<div>
					<label htmlFor="maxGlare">Max Glare:</label>
					<input
						id="maxGlare"
						name="maxGlare"
						type="number"
						defaultValue={0.5}
					/>
				</div>
			</form>
			<br />
			<Tilt {...options}>
				<div className="totally-centered">
					<button className="count-button" onClick={() => setCount(c => c + 1)}>
						{count}
					</button>
				</div>
			</Tilt>
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
