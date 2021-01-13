// useEffect: persistent state
// 💯 custom hook
// http://localhost:3000/isolated/final/02.extra-3.js

import * as React from 'react'

type UseLocalStorageState = <Key extends string>(
  key: Key,
  defaultValue?: string,
) => readonly [string, React.Dispatch<React.SetStateAction<string>>]

const useLocalStorageState: UseLocalStorageState = (key, defaultValue = '') => {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || defaultValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState] as const
}

interface GreetingProps {
  initialName?: string
}

function Greeting({initialName = ''}: GreetingProps): JSX.Element {
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
