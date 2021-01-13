// Lifting state
// http://localhost:3000/isolated/final/03.js

import * as React from 'react'

interface NameProps {
  name: string
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
function Name({name, onNameChange}: NameProps): JSX.Element {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  )
}

interface FavoriteAnimalProps {
  animal: string
  onAnimalChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
function FavoriteAnimal({
  animal,
  onAnimalChange,
}: FavoriteAnimalProps): JSX.Element {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  )
}

interface DisplayProps {
  name: string
  animal: string
}
function Display({name, animal}: DisplayProps): JSX.Element {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

function App(): JSX.Element {
  const [animal, setAnimal] = React.useState('')
  const [name, setName] = React.useState('')
  return (
    <form>
      <Name name={name} onNameChange={event => setName(event.target.value)} />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={event => setAnimal(event.target.value)}
      />
      <Display name={name} animal={animal} />
    </form>
  )
}

export default App
