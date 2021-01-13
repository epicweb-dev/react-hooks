// useEffect: HTTP requests
// http://localhost:3000/isolated/final/06.tsx

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'
import type {IPokemon} from '../pokemon'

interface PokemonInfoProps {
  pokemonName: string
}
function PokemonInfo({pokemonName}: PokemonInfoProps): JSX.Element {
  const [pokemon, setPokemon] = React.useState<null | IPokemon>(null)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setPokemon(null)
    fetchPokemon(pokemonName).then(pokemon => setPokemon(pokemon))
  }, [pokemonName])

  if (!pokemonName) {
    return <>Submit a pokemon</>
  } else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function App(): JSX.Element {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName: string): void {
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
