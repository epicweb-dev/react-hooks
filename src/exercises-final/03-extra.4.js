// useEffect: persistent state
// 💯 composed custom hooks

// http://localhost:3000/isolated/exercises-final/03-extra.4

import React from 'react'

function useLocalStorageState(
  key,
  defaultValue,
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function useLocalStorageCounter({step = 1, initialCount = 0, key = 'count'}) {
  const [count, setCount] = useLocalStorageState(key, initialCount)

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
