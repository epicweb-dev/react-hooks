import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

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

function FavoriteAnimal({
  animal,
  onAnimalChange,
}: {
  animal: string
  onAnimalChange: (newAnimal: string) => void
}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => onAnimalChange(event.currentTarget.value)}
      />
    </div>
  )
}

function Display({name, animal}: {name: string; animal: string}) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [animal, setAnimal] = React.useState('')
  const [name, setName] = React.useState('')
  return (
    <form>
      <Name name={name} onNameChange={setName} />
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
      <Display name={name} animal={animal} />
    </form>
  )
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
