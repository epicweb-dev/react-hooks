// useEffect: HTTP requests
// 💯 re-mount the error boundary
// http://localhost:3000/isolated/final/06.extra-5.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'

import type {IPokemon} from '../pokemon'

//#region ErrorBoundary
interface ErrorBoundaryProps {
  children: React.ReactNode
  FallbackComponent: (props: {error: Error}) => React.ReactNode
}
interface ErrorBoundaryState {
  error: null | Error
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public readonly state: ErrorBoundaryState = {error: null}
  public static getDerivedStateFromError(error: Error) {
    return {error}
  }
  public render() {
    const {error} = this.state
    const {children, FallbackComponent} = this.props
    return error ? FallbackComponent({error}) : children
  }
}
//#endregion

//#region PokemonInfo
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
    // this will be handled by an error boundary
    throw state.error
  } else if (state.status === StatusEnum.RESOLVED) {
    return <PokemonDataView pokemon={state.pokemon} />
  }

  throw new Error('This should be impossible')
}
//#endregion

//#region ErrorFallback
function ErrorFallback({error}: {error: Error}): JSX.Element {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}
//#endregion

//#region App
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
        <ErrorBoundary key={pokemonName} FallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}
//#endregion

export default App
