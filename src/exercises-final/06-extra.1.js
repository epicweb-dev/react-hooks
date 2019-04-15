// Making HTTP requests with useEffect
// http://localhost:3000/isolated/exercises-final/06-extra.0
import React from 'react'

function fetchPokemonReducer(state, action) {
  switch (action.type) {
    case 'FETCHING': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'FETCHED': {
      return {
        error: null,
        loading: false,
        pokemon: action.pokemon,
      }
    }
    case 'FETCH_ERROR': {
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function PokemonInfo({pokemonName}) {
  const [state, dispatch] = React.useReducer(fetchPokemonReducer, {
    pokemon: null,
    loading: false,
    error: null,
  })
  const {pokemon, loading, error} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    dispatch({type: 'FETCHING'})
    fetchPokemon(pokemonName).then(
      pokemon => dispatch({type: 'FETCHED', pokemon}),
      error => dispatch({type: 'FETCH_ERROR', error}),
    )
  }, [pokemonName])

  return loading ? (
    '...'
  ) : error ? (
    'ERROR (check your developer tools network tab)'
  ) : (
    <pre>{JSON.stringify(pokemon || 'Unknown', null, 2)}</pre>
  )
}

function fetchPokemon(name) {
  const pokemonQuery = `
    query ($name: String) {
      pokemon(name: $name) {
        id
        number
        name
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
    .fetch('https://graphql-pokemon.now.sh', {
      // learn more about this API here: https://graphql-pokemon.now.sh/
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        query: pokemonQuery,
        variables: {name},
      }),
    })
    .then(r => r.json())
    .then(response => response.data.pokemon)
}

function Usage() {
  const [pokemonName, setPokemonName] = React.useState(null)
  function handleSubmit(e) {
    e.preventDefault()
    setPokemonName(e.target.elements.pokemonName.value)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemonName-input">Pokemon Name (ie Pikachu)</label>
        <input id="pokemonName-input" name="pokemonName" />
        <button type="submit">Submit</button>
      </form>
      <div data-testid="pokemon-display">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}
Usage.title = 'Making HTTP requests with useEffect'

export default Usage
