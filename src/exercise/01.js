// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import React, {useState} from 'react'

function Greeting({initialName}) {
  const [name, setName] = useState(initialName)

  // 💣 delete this variable declaration and replace it with a React.useState call
  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    event.preventDefault()
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Malek" />
}

export default App
