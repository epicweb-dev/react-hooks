// useEffect: HTTP requests
// 💯 handle errors
// http://localhost:3000/isolated/final/06.extra-3.js

import React from 'react'
import fetchPokemon from '../fetch-pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const {status, pokemon, error} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState(currentState => ({
      status: 'pending',
      ...currentState,
    }))
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState(currentState => ({
          status: 'resolved',
          pokemon,
          ...currentState,
        }))
      },
      error => {
        setState(currentState => ({
          status: 'resolved',
          error,
          ...currentState,
        }))
      },
    )
  }, [pokemonName])

  return (
    <div
      style={{
        height: 300,
        width: 300,
        overflow: 'scroll',
        backgroundColor: '#eee',
        borderRadius: 4,
        padding: 10,
      }}
    >
      {status === 'idle' ? (
        'Submit a pokemon'
      ) : status === 'pending' ? (
        '...'
      ) : status === 'rejected' ? (
        <div>
          There was an error: <pre>{error.message}</pre>
        </div>
      ) : status === 'resolved' ? (
        <pre>{JSON.stringify(pokemon || 'Unknown', null, 2)}</pre>
      ) : null}
    </div>
  )
}

function InvisibleButton(props) {
  return (
    <button
      type="button"
      style={{
        border: 'none',
        padding: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        cursor: 'pointer',
        fontWeight: 'inherit',
      }}
      {...props}
    />
  )
}

function App() {
  const [{submittedPokemon, pokemonName}, setState] = React.useReducer(
    (state, action) => ({...state, ...action}),
    {submittedPokemon: '', pokemonName: ''},
  )

  function handleChange(e) {
    setState({pokemonName: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    setState({submittedPokemon: pokemonName.toLowerCase()})
  }

  function handleSelect(pokemonName) {
    setState({pokemonName, submittedPokemon: pokemonName})
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <label htmlFor="pokemonName-input">Pokemon Name</label>
        <small>
          Try{' '}
          <InvisibleButton onClick={() => handleSelect('pikachu')}>
            "pikachu"
          </InvisibleButton>
          {', '}
          <InvisibleButton onClick={() => handleSelect('charizard')}>
            "charizard"
          </InvisibleButton>
          {', or '}
          <InvisibleButton onClick={() => handleSelect('mew')}>
            "mew"
          </InvisibleButton>
        </small>
        <div>
          <input
            id="pokemonName-input"
            name="pokemonName"
            value={pokemonName}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      <hr />
      <div style={{display: 'flex'}}>
        <div style={{marginLeft: 10}} data-testid="pokemon-display">
          <PokemonInfo pokemonName={submittedPokemon} />
        </div>
      </div>
    </div>
  )
}

export default App
