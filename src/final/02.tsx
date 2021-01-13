// useEffect: persistent state
// http://localhost:3000/isolated/final/02.js

import * as React from 'react'

interface GreetingProps {
  initialName?: string
}

function Greeting({initialName = ''}: GreetingProps): JSX.Element {
  const [name, setName] = React.useState<string>(
    window.localStorage.getItem('name') || initialName,
  )

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  })

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
  return <Greeting />
}

export default App
