// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

// Extra 1: handle error

import * as React from 'react'
import { fetchPokemon, PokemonDataView, PokemonInfoFallback, PokemonForm } from '../pokemon'

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    fetchPokemon(pokemonName).then(
      (pokemonData) => setPokemon(pokemonData),
      // Take the note on this...
      (error) => setError(error)
    )
  }, [pokemonName])

  if (error) {
    return (
      <div role="alert">
        There was an error: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>
    )
  }

  if (!pokemonName) {
    return 'Submit a pokemon'
  } else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  }

  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
