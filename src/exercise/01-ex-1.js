// useState: greeting
// http://localhost:3000/isolated/exercise/01-ex-1.js

import React from 'react'

function Greeting({initialName}) {
  const [name, setName] = React.useState(initialName)

  const handleChange = (event) => {
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

function App() {
  return <Greeting initialName="Vasia"/>
}

export default App
