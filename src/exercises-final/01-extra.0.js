// Counter: hooks and simple state
// http://localhost:3000/isolated/exercises-final/01-extra.0
import React from 'react'

function Counter({step = 1, initialCount = 0}) {
  const [count, setCount] = React.useState(initialCount)
  const increment = () => setCount(count + step)
  return <button onClick={increment}>{count}</button>
}

function Usage() {
  return <Counter />
}
Usage.title = 'Counter: hooks and simple state'

export default Usage
