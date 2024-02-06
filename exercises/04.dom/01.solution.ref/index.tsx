import { useEffect, useRef, useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import VanillaTilt from 'vanilla-tilt'

interface HTMLVanillaTiltElement extends HTMLDivElement {
	vanillaTilt: VanillaTilt
}

function Tilt({ children }: { children: React.ReactNode }) {
	const tiltRef = useRef<HTMLVanillaTiltElement>(null)

	useEffect(() => {
		const { current: tiltNode } = tiltRef
		if (tiltNode === null) return
		const vanillaTiltOptions = {
			max: 25,
			speed: 400,
			glare: true,
			'max-glare': 0.5,
		}
		VanillaTilt.init(tiltNode, vanillaTiltOptions)
		return () => tiltNode.vanillaTilt.destroy()
	}, [])

	return (
		<div ref={tiltRef} className="tilt-root">
			<div className="tilt-child">{children}</div>
		</div>
	)
}

function App() {
	const [count, setCount] = useState(0)
	return (
		<Tilt>
			<div className="totally-centered">
				<button className="count-button" onClick={() => setCount(c => c + 1)}>
					{count}
				</button>
			</div>
		</Tilt>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
