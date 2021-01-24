// Lifting state
// http://localhost:3000/isolated/exercise/03-extra.js

import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('')

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={event => setName(event.target.value)} />
    </div>
  )
}

function FavoriteAnimal({name, onAnimalNameChange}) {  
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={name}
        onChange={onAnimalNameChange}
      />
    </div>
  )
}

function Display({animalName}) {
  return <div>{`Hey, your favorite animal is: ${animalName}!`}</div>
}

function App() {
  // 🐨 add a useState for the animal
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal name={animal} onAnimalNameChange={event => setAnimal(event.target.value)}/>
      {/* 🐨 pass the animal prop here */}
      <Display animalName={animal}/>
    </form>
  )
}

export default App
