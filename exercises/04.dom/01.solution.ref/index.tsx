import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import VanillaTilt from 'vanilla-tilt'

interface HTMLVanillaTiltElement extends HTMLDivElement {
	vanillaTilt?: VanillaTilt
}

const vanillaTiltOptions = {
	max: 25,
	speed: 400,
	glare: true,
	'max-glare': 0.5,
}

function Tilt({ children }: { children: React.ReactNode }) {
	return (
		<div
			className="tilt-root"
			ref={(tiltNode: HTMLVanillaTiltElement) => {
				// 🦉 The types show tiltNode can be null. This is for backward
				// compatibility reasons and will be removed in the future.
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
	return (
		<div>
			<button onClick={() => setShowTilt(s => !s)}>Toggle Visibility</button>
			{showTilt ? (
				<Tilt>
					<div className="totally-centered">
						<button
							className="count-button"
							onClick={() => setCount(c => c + 1)}
						>
							{count}
						</button>
					</div>
				</Tilt>
			) : null}
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
createRoot(rootEl).render(<App />)
