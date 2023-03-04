// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info

//going now for extra credit 3

import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
  PokemonForm
} from '../pokemon'

//import {PokemonForm} from '../pokemon'

//extra credit 4 using the errorBoundery class.

//implementation of the ErrorBoundery class:
class ErrorBoundery extends React.Component{
  state = {error: null}
  static getDerivedStateFromError(error){
    return {error}
  }
  render(){
    const {error} = this.state
    if(error){
      return <this.props.FallbackComponent error={error} />
    }
    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)

  //state for status for extra credit 2.

  //pertinent chages for extra credit 3 using just one useState.

  //const [status, setStatus] = React.useState('idle')

  //const [pokemon, setPokemon] = React.useState(null)
  //const [error, setError] = React.useState(null)

  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null
  })

  const {status, pokemon, error}  = state

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.

  React.useEffect(()=>{
    if(!pokemonName){return} //early return if no pokemon name.


    setState({status: 'pending'})
    //setStatus('pending')
    
    //setPokemon(null) //clearing the pokemon state by setting to null.
    //setError(null)

    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({status:'resolved', pokemon})
        //setPokemon(pokemon)
        //setStatus('resolved')
      },
      error => {
        setState({status:'rejected', error  })
        
        //setError(error)
        //setStatus('rejected')
      },
      )
  }, [pokemonName]) //dependencies array set for pokemonName change.

  /* Another promise error handling implementtion. For reference.
  fetchPokemon(pokemonName)
  .then(pokemon => setPokemon(pokemon))
  .catch(error => setError(error))
  */
  

  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  

  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  //handling the error for extra credit 1

  if(status === 'rejected'){
      //missed the return, error statement entered yet didn't return the desired tag.
    return(
    <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
    )
  }
    else if(status === 'idle'){
    return 'Submit a pokemon'
  } else if(status === 'pending'){
    return <PokemonInfoFallback name={pokemonName} />
  } else if(status === 'resolved'){
    return <PokemonDataView pokemon={pokemon} />
  }

  // 💣 remove this
  //return 'TODO'
}

//using the new error class with a function
function ErrorFallback({error}){
  return(
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>

    </div>
  )
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
        <ErrorBoundery key={pokemonName} FallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundery>
      </div>
    </div>
  )// adding the key to the ErrorBoundery as to reset and rerender the children that has been 
  //passed down.
}

export default App
