// useState: greeting
// http://localhost:3000/isolated/final/01.js

import * as React from 'react'

function Greeting(): JSX.Element {
  const [name, setName] = React.useState<string>('')
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App(): JSX.Element {
  return <Greeting />
}

export default App
