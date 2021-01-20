// useEffect: HTTP requests
// 💯 use resetKeys
// http://localhost:3000/isolated/final/06.extra-8.tsx

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import type {FallbackProps} from 'react-error-boundary'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'
import type {PokemonData} from '../types'

type PokemonInfoState =
  | {status: 'idle'}
  | {status: 'pending'}
  | {status: 'rejected'; error: Error}
  | {status: 'resolved'; pokemon: PokemonData}

function PokemonInfo({pokemonName}: {pokemonName: string}) {
  const [state, setState] = React.useState<PokemonInfoState>({
    status: pokemonName ? 'pending' : 'idle',
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({status: 'resolved', pokemon})
      },
      error => {
        setState({status: 'rejected', error})
      },
    )
  }, [pokemonName])

  switch (state.status) {
    case 'idle':
      return <span>Submit a pokemon</span>
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      throw state.error
    case 'resolved':
      return <PokemonDataView pokemon={state.pokemon} />
    default:
      throw new Error('This should be impossible')
  }
}

function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export {App}
