// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

// Extra 2&3: Instead of defining each cases, use explicit state to define the status

import * as React from 'react'
import { fetchPokemon, PokemonDataView, PokemonInfoFallback, PokemonForm } from '../pokemon'

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState({ status: 'idle', data: null, error: null });
  React.useEffect(() => {
    if (pokemonName !== '') {
      setPokemon({ status: 'pending', data: null, error: null })
      fetchPokemon(pokemonName).then(
        (pokemonData) => setPokemon({ status: 'resolved', data: pokemonData, error: null }),
        (error) => setPokemon({ status: 'rejected', data: null, error: error })
      )
    }
  }, [pokemonName])

  switch (pokemon.status) {
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={pokemon.data} />
    case 'rejected':
      return (
        <div role="alert">
          There was an error: <pre style={{ whiteSpace: 'normal' }}>{pokemon.error.message}</pre>
        </div>
      )
    default:
      return 'Submit a pokemon'
  }
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
