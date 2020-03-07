// useEffect: persistent state
// 💯 advanced custom hooks

// http://localhost:3000/isolated/final/03.extra-3

import React from 'react'

function useLocalStorageCounter({step = 1, initialCount = 0, key = 'count'}) {
  const [count, setCount] = React.useState(() =>
    Number(window.localStorage.getItem(key) || initialCount),
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, count)
  }, [key, count])

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

export default Usage
