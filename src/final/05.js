// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/final/05.js

import React from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  const tiltRef = React.useRef()

  React.useEffect(() => {
    const {current: tiltNode} = tiltRef
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

export default App
