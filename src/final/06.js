// useEffect: HTTP requests
// http://localhost:3000/isolated/final/06.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError]=React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setError(null)
    setPokemon(null)
    fetchPokemon(pokemonName).then(pokemon => setPokemon(pokemon)).catch(error=>setError(error))
  }, [pokemonName])

  if(error){
    return (<div role="alert">
    There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
  </div>)
  }
  else if (!pokemonName) {
    return 'Submit a pokemon'
  }
   else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  } 
  else if(error){return <div role="alert">
  There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
</div>}
  else {
    return <PokemonDataView pokemon={pokemon} />
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
