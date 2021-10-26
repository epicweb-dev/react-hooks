// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={event=>setName(event.target.value)} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal,onAnimalChange}) {
  // 💣 delete this, it's now managed by the App
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => onAnimalChange(event.target.value)}
        />
    </div>
  )
}


function Display({ animal}) {
  return <div>{`Hey , your favorite animal is: ${animal}!`}</div>
}

// // 💣 remove this component in favor of the new one
// function Display({name}) {
  //   return <div>{`Hey ${name}, you are great!`}</div>
  // }
  
  function App() {
    // 🐨 add a useState for the animal
    const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
      {/* 🐨 pass the animal prop here */}
      <Display  animal={animal}/>
    </form>
  )
}

export default App
