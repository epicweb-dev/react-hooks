// useEffect: HTTP requests
// 💯 store the state in an object
// http://localhost:3000/isolated/final/06.extra-3.tsx

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

interface BaseState {
  status: Status
  pokemon: null | IPokemon
  error: null | Error
}

interface IdleState extends BaseState {
  status: typeof StatusEnum.IDLE
  pokemon: null
  error: null
}

interface PendingState extends BaseState {
  status: typeof StatusEnum.PENDING
  pokemon: null
  error: null
}

interface RejectedState extends BaseState {
  status: typeof StatusEnum.REJECTED
  pokemon: null
  error: Error
}
interface ResolvedState extends BaseState {
  status: typeof StatusEnum.RESOLVED
  pokemon: IPokemon
  error: null
}

type State = IdleState | PendingState | RejectedState | ResolvedState

interface PokemonInfoProps {
  pokemonName: string
}
function PokemonInfo({pokemonName}: PokemonInfoProps): JSX.Element {
  const [state, setState] = React.useState<State>({
    status: StatusEnum.IDLE,
    pokemon: null,
    error: null,
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: StatusEnum.PENDING, pokemon: null, error: null})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({status: StatusEnum.RESOLVED, pokemon, error: null})
      },
      error => {
        setState({status: StatusEnum.REJECTED, pokemon: null, error: error})
      },
    )
  }, [pokemonName])

  if (state.status === StatusEnum.IDLE) {
    return <>Submit a pokemon</>
  } else if (state.status === StatusEnum.PENDING) {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (state.status === StatusEnum.REJECTED) {
    return (
      <div>
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      </div>
    )
  } else if (state.status === StatusEnum.RESOLVED) {
    return <PokemonDataView pokemon={state.pokemon} />
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
