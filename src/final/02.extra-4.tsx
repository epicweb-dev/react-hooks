// useEffect: persistent state
// 💯 flexible localStorage hook
// http://localhost:3000/isolated/final/02.extra-4.js

import * as React from 'react'

interface JSONStrategies {
  serialize: typeof JSON.stringify
  deserialize: <S>(text: string) => S & typeof JSON.parse
}

function useLocalStorageState<K extends string, S>(
  key: K,
  defaultValue: S | (() => S),
  {serialize = JSON.stringify, deserialize = JSON.parse} = {} as JSONStrategies,
): readonly [S, React.Dispatch<React.SetStateAction<S>>] {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage) as S
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function'
      ? (defaultValue as () => S)()
      : defaultValue
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

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App(): JSX.Element {
  const [count, setCount] = React.useState(0)
  return (
    <>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        {count}
      </button>
      <Greeting />
    </>
  )
}
export default App
