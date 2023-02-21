// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

//set in the name function to colocate or push down instead of lifting up.

//function modified to colocate the name state and return the state management to the
//name function.
function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={event => setName(event.target.value)} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
  // 💣 delete this, it's now managed by the App
  //const [animal, setAnimal] = React.useState('')

  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        //onChange={event => setAnimal(event.target.value)}
        onChange={onAnimalChange}


      />
    </div>
  )

}

// 🐨 uncomment this
function Display({name, animal}) {
  //the div tag has been modified to produce the desired output.
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

// 💣 remove this component in favor of the new one
// function Display({name}) {
//   return <div>{`Hey ${name}, you are great!`}</div>
// }

function App() {
  // 🐨 add a useState for the animal
  //const [name, setName] = React.useState('')
  const [animal, setAnimal] = React.useState('')

  //modified the name JSX tag to not be handled.
  return (
    <form>
      <Name />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)}/>
      {/* 🐨 pass the animal prop here */}
      <Display animal={animal} />
    </form>
  )
}

export default App
