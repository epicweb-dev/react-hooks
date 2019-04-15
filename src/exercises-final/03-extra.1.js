// Counter: advanced custom hooks
// http://localhost:3000/isolated/exercises-final/03-extra.1
import React from 'react'

function useLocalStorageCounter({step = 1, initialCount = 0, key = 'count'}) {
  const [count, setCount] = React.useState(() =>
    Number(window.localStorage.getItem('count') || initialCount),
  )

  React.useEffect(() => {
    window.localStorage.setItem('count', count)
  }, [count])

  const increment = () => setCount(c => c + step)

  return [count, increment]
}

function Counter({step, initialCount}) {
  const [count, increment] = useLocalStorageCounter({
    step,
    initialCount,
  })
  return <button onClick={increment}>{count}</button>
}

function Usage() {
  return <Counter />
}
Usage.title = 'Counter: advanced custom hooks'

export default Usage
