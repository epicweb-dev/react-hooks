// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

// Extra 7&8: reset and recovery from error state

import * as React from 'react'
import { fetchPokemon, PokemonDataView, PokemonInfoFallback, PokemonForm } from '../pokemon'
import { ErrorBoundary } from 'react-error-boundary'


function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState({
    status: pokemonName ? 'pending' : 'idle',
    data: null,
    error: null
  });
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
      throw pokemon.error
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
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setPokemonName('')
          }}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
