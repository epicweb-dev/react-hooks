// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('');
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={event => setName(event.target.value)} />
    </div>
  )
}

function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => onAnimalChange(event)}
      />
    </div>
  )
}

// function Display({name, animal}) {
//   return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
// }

function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  // 🐨 add a useState for the animal
  const [animal, setAnimal ] = React.useState('');
  return (
    <form>
      <Name />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} onAnimalChange={e => setAnimal(e.target.value)} />
      {/* 🐨 pass the animal prop here */}
      <Display animal={animal} />
    </form>
  )
}

export default App
