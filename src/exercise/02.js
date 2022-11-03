// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(initialData) {
  const [data, setData] = React.useState(
    () => JSON.parse(window.localStorage.getItem('data')) || initialData,
  )

  React.useEffect(
    () => window.localStorage.setItem('data', JSON.stringify(data)),
    [data],
  )

  return [data, setData]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState(initialName)

  function handleChange(event) {
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

function App() {
  return <Greeting initialName="2K" />
}

export default App
