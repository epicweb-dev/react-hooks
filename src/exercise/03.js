// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import React from 'react'

function Name({name, onNameChange}) {
  return (
    <div>
      <label>Name: </label>
      <input value={name} onChange={onNameChange} />
    </div>
  )
}

function FavoriteAnimal() {
  const [animal, setAnimal] = React.useState('')
  return (
    <div>
      <label>Favorite Animal: </label>
      <input value={animal} onChange={event => setAnimal(event.target.value)} />
    </div>
  )
}

function Display({name}) {
  return <div>{`Hey ${name}, you are great!`}</div>
}

function App() {
  const [name, setName] = React.useState('')
  return (
    <form>
      <Name name={name} onNameChange={event => setName(event.target.value)} />
      <FavoriteAnimal />
      <Display name={name} />
    </form>
  )
}

export default App
