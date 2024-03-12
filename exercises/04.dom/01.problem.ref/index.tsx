import { useEffect, useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import VanillaTilt from 'vanilla-tilt'

interface HTMLVanillaTiltElement extends HTMLDivElement {
	vanillaTilt: VanillaTilt
}

function Tilt({ children }: { children: React.ReactNode }) {
	// 🐨 create a tiltRef here with useRef<HTMLVanillaTiltElement>(null)

	useEffect(() => {
		// 🐨 get the tiltNode from tiltRef.current
		const tiltNode = null as unknown as HTMLVanillaTiltElement
		// 🦺 TypeScript will complain that it's possible for the tiltNode to be
		// null. It's definitely possible (like if we changed the code to not apply
		// the ref prop on the div below), so go ahead and just do an early return
		// in that case.

		const vanillaTiltOptions = {
			max: 25,
			speed: 400,
			glare: true,
			'max-glare': 0.5,
		}
		VanillaTilt.init(tiltNode, vanillaTiltOptions)

		// 🐨 Don't forget to return a cleanup function. VanillaTilt.init will add an
		// object to your DOM node to cleanup:
		// 💰 return () => tiltNode.vanillaTilt.destroy()

		// 📜 Learn why we don't need to pass the tiltRef as a dependency:
		// https://epicreact.dev/why-you-shouldnt-put-refs-in-a-dependency-array
	}, [])

	// 🐨 add the `ref` prop to the `tilt-root` div here:
	return (
		<div className="tilt-root">
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
