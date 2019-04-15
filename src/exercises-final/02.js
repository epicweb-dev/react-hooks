// Counter: custom hooks
import React from 'react'

function useCounter({step = 1, initialCount = 0} = {}) {
  const [count, setCount] = React.useState(initialCount)
  const increment = () => setCount(c => c + step)
  return [count, increment]
}

function Counter({step, initialCount}) {
  const [count, increment] = useCounter({step, initialCount})
  return <button onClick={increment}>{count}</button>
}

function Usage() {
  return <Counter />
}
Usage.title = 'Counter: custom hooks'

export default Usage
