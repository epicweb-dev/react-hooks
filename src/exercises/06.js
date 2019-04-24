// Making HTTP requests with useEffect
import React from 'react'

// In this exercise, we'll be doing data fetching directly in a useEffect hook
// callback within our component.
//
// Here we have a form where users can enter the name of a pokemon and fetch
// data about that pokemon. Your job will be to create a component which makes
// that fetch request.

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null), the error state (null), and the
  // loading state (false).
  // 🐨 Use the `fetchPokemon` function below to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemon => { /* update all the state here */},
  //     error => {/* update all the state here */},
  //   )

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 🐨 before calling `fetchPokemon`, make sure to update the loading state
  // 🐨 when the promise resolves, update the loading and pokemon state
  // 🐨 if the promise rejects, update the loading and error state

  // 🐨 Render the appropriate content based on the state:
  //    1. loading: '...'
  //    2. error: 'ERROR!'
  //    3. pokemon: the JSON.stringified pokemon in a <pre></pre>
  return 'todo'
}

// 💯 With the way that PokemonInfo is written, it's only rendered when there's
// a pokemon to fetch. Go ahead and rewrite it to allow people to render it
// before a pokemon is presented (and you can change the implementation) below
// to render <PokemonInfo /> without the ternary.

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:

http://ws.kcd.im/?ws=learn%20react%20hooks&e=06&em=
*/

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

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

class Usage extends React.Component {
  state = {pokemonName: null}
  inputRef = React.createRef()
  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      pokemonName: this.inputRef.current.value,
    })
  }
  render() {
    const {pokemonName} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="pokemonName-input">Pokemon Name (ie Pikachu)</label>
          <input id="pokemonName-input" ref={this.inputRef} />
          <button type="submit">Submit</button>
        </form>
        PokemonInfo
        <div data-testid="pokemon-display">
          {/* 💯 I, Hannah Hundred, give you permission to edit this for the extra credit */}
          {pokemonName ? <PokemonInfo pokemonName={pokemonName} /> : null}
        </div>
      </div>
    )
  }
}
Usage.title = 'Making HTTP requests with useEffect'

export default Usage

/* eslint no-unused-vars:0 */
