// Lifting state
// http://localhost:3000/isolated/exercise/03.tsx

import * as React from 'react'

function Name({
  name,
  onNameChange,
}: {
  name: string
  onNameChange: (newName: string) => void
}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => onNameChange(event.currentTarget.value)}
      />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal() {
  // 💣 delete this, it's now managed by the App
  const [animal, setAnimal] = React.useState('')
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => setAnimal(event.currentTarget.value)}
      />
    </div>
  )
}

// 🐨 uncomment this
// function Display({name, animal}) {
//   return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
// }

// 💣 remove this component in favor of the new one
function Display({name}: {name: string}) {
  return <div>{`Hey ${name}, you are great!`}</div>
}

function App() {
  // 🐨 add a useState for the animal
  const [name, setName] = React.useState('')
  return (
    <form>
      <Name name={name} onNameChange={setName} />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal />
      {/* 🐨 pass the animal prop here */}
      <Display name={name} />
    </form>
  )
}

export {App}
