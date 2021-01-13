import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
//#region Pokemon interface

/** Represents a Pokémon */
export interface IPokemon extends FetchedAt {
  /** The ID of an object */
  id: string
  /** The identifier of this Pokémon */
  number?: null | string
  /** The name of this Pokémon */
  name?: null | string
  image?: null | string

  attacks: null | PokemonAttack
}

interface FetchedAt {
  fetchedAt: string
}

/** Represents a Pokémon's attack types */
interface PokemonAttack {
  /** The fast attacks of this Pokémon */
  fast?: null | Array<null | Attack>
  /** The special attacks of this Pokémon */
  special?: null | Array<null | Attack>
}

/** Represents a Pokémon's attack type */
interface Attack {
  /** The name of this Pokémon attack */
  name?: null | string
  /** The type of this Pokémon attack */
  type?: null | string
  /** The damage of this Pokémon attack */
  damage?: null | number
}
//#endregion

const formatDate = (date: Date): string =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

// the delay argument is for faking things out a bit
function fetchPokemon(name: string, delay: number = 1500): Promise<IPokemon> {
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

  return window
    .fetch('https://graphql-pokemon2.vercel.app/', {
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
    .then(async response => {
      const {data} = await response.json()
      if (response.ok) {
        const pokemon = data?.pokemon
        if (pokemon) {
          pokemon.fetchedAt = formatDate(new Date())
          return pokemon as IPokemon
        } else {
          return Promise.reject(new Error(`No pokemon with the name "${name}"`))
        }
      } else {
        // handle the graphql errors
        const error: Error = {
          name: String(response.status),
          message: data?.errors?.map((e: Error) => e.message).join('\n'),
        }
        return Promise.reject(error)
      }
    })
}

interface PokemonInfoFallbackProps {
  name: string
}
function PokemonInfoFallback({name}: PokemonInfoFallbackProps): JSX.Element {
  const initialName = React.useRef(name).current
  const fallbackPokemonData: IPokemon = {
    id: '',
    name: initialName,
    number: 'XXX',
    image: '/img/pokemon/fallback-pokemon.jpg',
    attacks: {
      special: [
        {name: 'Loading Attack 1', type: 'Type', damage: null},
        {name: 'Loading Attack 2', type: 'Type', damage: null},
      ],
    },
    fetchedAt: 'loading...',
  }
  return <PokemonDataView pokemon={fallbackPokemonData} />
}

interface PokemonDataViewProps {
  pokemon: IPokemon
}
function PokemonDataView({pokemon}: PokemonDataViewProps): JSX.Element {
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image || ''} alt={pokemon.name || "pokemon's name"} />
      </div>
      <section>
        <h2>
          {pokemon.name}
          <sup>{pokemon.number}</sup>
        </h2>
      </section>
      <section>
        <ul>
          {pokemon.attacks?.special?.map(attack => (
            <li key={attack?.name}>
              <label>{attack?.name}</label>:{' '}
              <span>
                {attack?.damage} <small>({attack?.type})</small>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <small className="pokemon-info__fetch-time">{pokemon.fetchedAt}</small>
    </div>
  )
}

interface PokemonFormProps {
  pokemonName: string
  initialPokemonName?: string
  onSubmit: (pokemonName: string) => void
}
function PokemonForm({
  pokemonName: externalPokemonName,
  initialPokemonName = externalPokemonName || '',
  onSubmit,
}: PokemonFormProps): JSX.Element {
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPokemonName(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    onSubmit(pokemonName)
  }

  function handleSelect(newPokemonName: string): void {
    setPokemonName(newPokemonName)
    onSubmit(newPokemonName)
  }

  return (
    <form onSubmit={handleSubmit} className="pokemon-form">
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
        />
        <button type="submit" disabled={!pokemonName.length}>
          Submit
        </button>
      </div>
    </form>
  )
}

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
}
function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps): JSX.Element {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

type PokemonErrorBoundaryProps = Omit<
  React.ComponentProps<typeof ErrorBoundary>,
  'FallbackComponent'
>
function PokemonErrorBoundary(props: PokemonErrorBoundaryProps): JSX.Element {
  return <ErrorBoundary FallbackComponent={ErrorFallback} {...props} />
}

export {
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  fetchPokemon,
  PokemonErrorBoundary,
}
