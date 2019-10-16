// useRef and useEffect: DOM interaction

import React from 'react'
import VanillaTilt from 'vanilla-tilt'

// If you'd rather practice refactoring a class component to a function
// component with hooks, then go ahead and do this exercise.
//
// This one's not rendered to the exercise, page, so you can go to this
// component's isolated page here:
// http://localhost:3000/isolated/exercises/05-classes

class Tilt extends React.Component {
  tiltRef = React.createRef()
  componentDidMount() {
    const tiltNode = this.tiltRef.current
    const vanillaTiltOptions = {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    }
    VanillaTilt.init(tiltNode, vanillaTiltOptions)
  }
  componentWillUnmount() {
    this.tiltRef.current.vanillaTilt.destroy()
  }
  render() {
    return (
      <div ref={this.tiltRef} className="tilt-root">
        <div className="tilt-child">{this.props.children}</div>
      </div>
    )
  }
}
function Usage() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}
Usage.title = 'useRef and useEffect: DOM interaction'

export default Usage
