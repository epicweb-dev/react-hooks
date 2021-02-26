// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
/*
function Name({name, onNameChange}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  )
}
*/
function Name() {
  //const [name, setName] = React.useState('');
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
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

/*
function Display({name, animal}) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

function App() {
  // 🐨 add a useState for the animal
  const [name, setName] = React.useState('')
  const [animal, setAnimal] = React.useState('');
  return (
    <form>
      <Name name={name} onNameChange={event => setName(event.target.value)} />
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
      <Display name={name} animal={animal}/>
    </form>
  )
}
*/
function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}
function App() {
  // 🐨 add a useState for the animal
  const [animal, setAnimal] = React.useState('');
  return (
    <form>
      <Name />
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
      <Display animal={animal}/>
    </form>
  )
}

export default App
