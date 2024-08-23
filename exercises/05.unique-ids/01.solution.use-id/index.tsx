import { useEffect, useId, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import VanillaTilt from 'vanilla-tilt'

function Field({
	label,
	...inputProps
}: {
	label: string
} & React.ComponentProps<'input'>) {
	const generatedId = useId()
	const id = inputProps.id ?? generatedId
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input {...inputProps} id={id} />
		</div>
	)
}

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
	const tiltRef = useRef<HTMLVanillaTiltElement>(null)

	useEffect(() => {
		const { current: tiltNode } = tiltRef
		if (!tiltNode) return
		const vanillaTiltOptions = {
			max,
			speed,
			glare,
			'max-glare': maxGlare,
		}
		VanillaTilt.init(tiltNode, vanillaTiltOptions)
		return () => tiltNode.vanillaTilt?.destroy()
	}, [glare, max, maxGlare, speed])

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
						max: Number(formData.get('max')),
						speed: Number(formData.get('speed')),
						glare: formData.get('glare') === 'on',
						maxGlare: Number(formData.get('maxGlare')),
					})
				}}
			>
				<Field label="Max" name="max" type="number" defaultValue={25} />
				<Field label="Speed" name="speed" type="number" defaultValue={400} />
				<div>
					<label>
						<input name="glare" type="checkbox" defaultChecked />
						Glare
					</label>
				</div>
				<Field
					label="Max Glare"
					name="maxGlare"
					type="number"
					defaultValue={0.5}
				/>
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
createRoot(rootEl).render(<App />)
