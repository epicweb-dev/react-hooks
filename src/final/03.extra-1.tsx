// Lifting state
// 💯 colocating state
// http://localhost:3000/isolated/final/03.extra-1.js

import * as React from 'react'

function Name(): JSX.Element {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
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
  animal: string
}
function Display({animal}: DisplayProps): JSX.Element {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App(): JSX.Element {
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={event => setAnimal(event.target.value)}
      />
      <Display animal={animal} />
    </form>
  )
}

export default App
