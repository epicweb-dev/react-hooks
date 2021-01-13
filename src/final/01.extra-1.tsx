// useState: greeting
// 💯 accept an initialName
// http://localhost:3000/isolated/final/01.extra-1.js

import * as React from 'react'

interface GreetingProps {
  initialName?: string
}
function Greeting({initialName = ''}: GreetingProps): JSX.Element {
  const [name, setName] = React.useState<string>(initialName)
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
  return <Greeting initialName="Kody" />
}

export default App
