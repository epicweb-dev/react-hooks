import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '~/shared/pokemon'
import type {PokemonData} from '~/shared/types'

function PokemonInfo({pokemonName}: {pokemonName: string}) {
  const [pokemon, setPokemon] = React.useState<PokemonData | null>(null)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setPokemon(null)
    fetchPokemon(pokemonName).then(pokemon => setPokemon(pokemon))
  }, [pokemonName])

  if (!pokemonName) {
    return <span>Submit a pokemon</span>
  } else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName: string) {
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

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
