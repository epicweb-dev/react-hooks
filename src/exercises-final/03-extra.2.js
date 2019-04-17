// Counter: advanced custom hooks
// http://localhost:3000/isolated/exercises-final/03-extra.2
import React from 'react'

function useLocalStorageState({
  key,
  initialValue,
  serialize = v => v,
  deserialize = v => v,
}) {
  const [state, setState] = React.useState(
    () => deserialize(window.localStorage.getItem(key)) || initialValue,
  )

  const serializedState = serialize(state)
  React.useEffect(() => {
    window.localStorage.setItem(key, serializedState)
  }, [key, serializedState])

  return [state, setState]
}

function useLocalStorageCounter({step = 1, initialCount = 0, key = 'count'}) {
  const [count, setCount] = useLocalStorageState({
    key,
    initialValue: initialCount,
    deserialize: v => Number(v),
  })

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
