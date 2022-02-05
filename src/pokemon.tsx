import * as React from 'react'
import type {PokemonData} from './types'
import type {FallbackProps, ErrorBoundaryProps} from 'react-error-boundary'
import {ErrorBoundary} from 'react-error-boundary'

const formatDate = (date: Date) =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

/**
 *
 * @param name the name of the pokemon
 * @param delay an arbitrary delay (to test loading states). This is optional and defaults to 1500
 */
async function fetchPokemon(
  name: string,
  delay: number = 1500,
): Promise<PokemonData> {
  const pokemonQuery = `
    query PokemonInfo($name: String) {
      pokemon(name: $name) {
        id
        number
        name
        image
        attacks {
          special {
            name
            type
            damage
          }
        }
      }
    }
  `

  const response = await window.fetch('https://graphql-pokemon2.vercel.app/', {
    // learn more about this API here: https://graphql-pokemon2.vercel.app/
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      delay: String(delay),
    },
    body: JSON.stringify({
      query: pokemonQuery,
      variables: {name: name.toLowerCase()},
    }),
  })

  type JSONResponse = {
    data?: {
      pokemon: Omit<PokemonData, 'fetchedAt'>
    }
    errors?: Array<{message: string}>
  }
  const {data, errors}: JSONResponse = await response.json()
  if (response.ok) {
    const pokemon = data?.pokemon
    if (pokemon) {
      // add fetchedAt helper
      return Object.assign(pokemon, {fetchedAt: formatDate(new Date())})
    } else {
      return Promise.reject(new Error(`No pokemon with the name "${name}"`))
    }
  } else {
    // handle the graphql errors
    const error = new Error(errors?.map(e => e.message).join('\n') ?? 'unknown')
    return Promise.reject(error)
  }
}

function PokemonInfoFallback({name}: {name: string}) {
  const initialName = React.useRef(name).current
  const fallbackPokemonData: PokemonData = {
    id: 'loading-pokemon',
    name: initialName,
    number: 'XXX',
    image: '/img/pokemon/fallback-pokemon.jpg',
    attacks: {
      special: [
        {name: 'Loading Attack 1', type: 'Type', damage: -1},
        {name: 'Loading Attack 2', type: 'Type', damage: -1},
      ],
    },
    fetchedAt: 'loading...',
  }
  return <PokemonDataView pokemon={fallbackPokemonData} />
}

function PokemonDataView({pokemon}: {pokemon: PokemonData}) {
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <section>
        <h2>
          {pokemon.name}
          <sup>{pokemon.number}</sup>
        </h2>
      </section>
      <section>
        <ul>
          {pokemon.attacks.special.map(attack => (
            <li key={attack.name}>
              <label>{attack.name}</label>:{' '}
              <span>
                {attack.damage < 0 ? 'XX' : attack.damage}{' '}
                <small>({attack.type})</small>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <small className="pokemon-info__fetch-time">{pokemon.fetchedAt}</small>
    </div>
  )
}

function PokemonForm({
  pokemonName: externalPokemonName,
  initialPokemonName = externalPokemonName ?? '',
  onSubmit,
}: {
  pokemonName: string
  initialPokemonName?: string
  onSubmit: (newPokemonName: string) => void
}) {
  const [pokemonName, setPokemonName] = React.useState(initialPokemonName)

  // this is generally not a great idea. We're synchronizing state when it is
  // normally better to derive it https://kentcdodds.com/blog/dont-sync-state-derive-it
  // however, we're doing things this way to make it easier for the exercises
  // to not have to worry about the logic for this PokemonForm component.
  React.useEffect(() => {
    // note that because it's a string value, if the externalPokemonName
    // is the same as the one we're managing, this will not trigger a re-render
    if (typeof externalPokemonName === 'string') {
      setPokemonName(externalPokemonName)
    }
  }, [externalPokemonName])

  function handleChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setPokemonName(e.currentTarget.value)
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(pokemonName)
  }

  function handleSelect(newPokemonName: string) {
    setPokemonName(newPokemonName)
    onSubmit(newPokemonName)
  }

  return (
    <form name="pokemonForm" onSubmit={handleSubmit} className="pokemon-form">
      <label htmlFor="pokemonName-input">Pokemon Name</label>
      <small>
        Try{' '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('pikachu')}
        >
          "pikachu"
        </button>
        {', '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('charizard')}
        >
          "charizard"
        </button>
        {', or '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('mew')}
        >
          "mew"
        </button>
      </small>
      <div>
        <input
          className="pokemonName-input"
          id="pokemonName-input"
          name="pokemonName"
          placeholder="Pokemon Name..."
          value={pokemonName}
          onChange={handleChange}
          onClick={handleChange}
        />
        <button type="submit" disabled={!pokemonName.length}>
          Submit
        </button>
      </div>
    </form>
  )
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

function PokemonErrorBoundary(
  props: Pick<ErrorBoundaryProps, 'onReset' | 'resetKeys'> & {
    children: React.ReactNode
  },
) {
  return <ErrorBoundary FallbackComponent={ErrorFallback} {...props} />
}

export {
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  fetchPokemon,
  PokemonErrorBoundary,
}
