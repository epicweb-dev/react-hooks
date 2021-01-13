// useEffect: persistent state
// 💯 lazy state initialization
// http://localhost:3000/isolated/final/02.extra-1.js

import * as React from 'react'

interface GreetingProps {
  initialName?: string
}

function Greeting({initialName = ''}: GreetingProps): JSX.Element {
  const getInitialValue = (): string =>
    window.localStorage.getItem('name') || initialName

  const [name, setName] = React.useState<string>(getInitialValue)

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
