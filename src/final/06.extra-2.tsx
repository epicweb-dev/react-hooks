// useEffect: HTTP requests
// 💯 use a status
// http://localhost:3000/isolated/final/06.extra-2.tsx

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'

import type {IPokemon} from '../pokemon'

/**
 * $Values
 * @desc Get the union type of all the values in an object type `T`
 * @see https://flow.org/en/docs/types/utilities/#toc-values
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *
 *   // Expect: string | number | boolean
 *   type PropsValues = $Values<Props>;
 */
type $Values<T extends Record<string, unknown>> = T[keyof T]

const StatusEnum = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
} as const

type Status = $Values<typeof StatusEnum>
interface PokemonInfoProps {
  pokemonName: string
}
function PokemonInfo({pokemonName}: PokemonInfoProps): JSX.Element {
  const [status, setStatus] = React.useState<Status>(StatusEnum.IDLE)
  const [pokemon, setPokemon] = React.useState<null | IPokemon>(null)
  const [error, setError] = React.useState<null | Error>(null)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setStatus(StatusEnum.PENDING)
    fetchPokemon(pokemonName).then(
      pokemon => {
        setPokemon(pokemon)
        setStatus(StatusEnum.RESOLVED)
      },
      error => {
        setError(error)
        setStatus(StatusEnum.REJECTED)
      },
    )
  }, [pokemonName])

  if (status === StatusEnum.IDLE && !pokemon) {
    return <>Submit a pokemon</>
  } else if (status === StatusEnum.PENDING) {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === StatusEnum.REJECTED && error) {
    return (
      <div>
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if (status === StatusEnum.RESOLVED && pokemon) {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
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
