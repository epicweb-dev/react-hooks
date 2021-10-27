// DOM Side-Effects
// 💯 Side-effect cleanup
// http://localhost:3000/isolated/final/05.tsx

import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'

interface HTMLVanillaTiltElement extends HTMLDivElement {
  vanillaTilt: VanillaTilt
}

function Tilt({children}: {children: React.ReactNode}) {
  const tiltRef = React.useRef<HTMLVanillaTiltElement>(null)

  React.useEffect(() => {
    const {current: tiltNode} = tiltRef
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
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export {App}
