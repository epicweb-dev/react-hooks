import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import VanillaTilt from 'vanilla-tilt'

interface HTMLVanillaTiltElement extends HTMLDivElement {
	vanillaTilt?: VanillaTilt
}

function Tilt({
	children,
	max = 25,
	speed = 400,
	glare = true,
	maxGlare = 0.5,
}: {
	children: React.ReactNode
	max?: number
	speed?: number
	glare?: boolean
	maxGlare?: number
}) {
	// 🐨 create a tiltRef here with useRef (initialize it to null)
	// 🦺 you can pass HTMLVanillaTiltElement to the generic type

	const vanillaTiltOptions = {
		max,
		speed,
		glare,
		'max-glare': maxGlare,
	}

	// 🐨 create a useEffect callback here and refactor things to move the contents
	// of the ref callback to here.
	// 💰 You'll get the tiltNode from tiltRef.current
	// 💰 you'll want to keep the early return if the tiltNode is null
	// 💰 make sure to include the vanillaTiltOptions object in the dependency array

	return (
		<div
			className="tilt-root"
			// 🐨 replace the contents of this ref prop with a reference to tiltRef
			// 💰 ref={tiltRef}
			ref={(tiltNode: HTMLVanillaTiltElement) => {
				// 🐨 move all of this to the useEffect callback
				if (!tiltNode) return
				VanillaTilt.init(tiltNode, vanillaTiltOptions)
				return () => tiltNode.vanillaTilt?.destroy()
			}}
		>
			<div className="tilt-child">{children}</div>
		</div>
	)
}

function App() {
	const [showTilt, setShowTilt] = useState(true)
	const [count, setCount] = useState(0)
	const [options, setOptions] = useState({
		max: 25,
		speed: 400,
		glare: true,
		maxGlare: 0.5,
	})
	return (
		<div>
			<button onClick={() => setShowTilt(s => !s)}>Toggle Visibility</button>
			{showTilt ? (
				<div className="app">
					<form
						onSubmit={e => e.preventDefault()}
						onChange={event => {
							const formData = new FormData(event.currentTarget)
							setOptions({
								max: Number(formData.get('max')),
								speed: Number(formData.get('speed')),
								glare: formData.get('glare') === 'on',
								maxGlare: Number(formData.get('maxGlare')),
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
							<button
								className="count-button"
								onClick={() => setCount(c => c + 1)}
							>
								{count}
							</button>
						</div>
					</Tilt>
				</div>
			) : null}
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
createRoot(rootEl).render(<App />)

// 🤫 we'll fix this in the next step!
// (ALMOST) NEVER DISABLE THIS LINT RULE IN REAL LIFE!
/*
eslint
	react-hooks/exhaustive-deps: "off",
*/
