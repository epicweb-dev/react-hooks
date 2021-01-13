// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/final/05.js

import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'
import type {HTMLVanillaTiltElement, TiltOptions} from 'vanilla-tilt'

function isHTMLVanillaTiltElement(
  htmlElement: HTMLElement | HTMLVanillaTiltElement,
): htmlElement is HTMLVanillaTiltElement {
  return 'vanillaTilt' in htmlElement
}

interface TiltProps extends React.PropsWithChildren<{}> {}
function Tilt({children}: TiltProps): JSX.Element {
  const tiltRef = React.useRef<HTMLDivElement>(null!)

  React.useEffect(() => {
    const {current: tiltNode} = tiltRef
    const vanillaTiltOptions: TiltOptions = {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    }
    VanillaTilt.init(tiltNode, vanillaTiltOptions)
    return () => {
      if (isHTMLVanillaTiltElement(tiltNode)) tiltNode.vanillaTilt.destroy()
    }
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
