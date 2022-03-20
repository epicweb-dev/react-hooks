// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonDataView,PokemonInfoFallback,fetchPokemon,PokemonForm} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'


// class ErrorBoundary extends React.Component {
//     state = { error: null };
//
//     static getDerivedStateFromError(error) {
//         return { error : error };
//     }
//
//
//     render() {
//         let error = this.state.error;
//         if (error) {
//             // this.state.error = null;
//             return <this.props.FallbackComponent error= {error} />
//         }
//
//         return this.props.children;
//     }
// }
function PokemonInfo({pokemonName}) {
    // const [pokemon,setPokemon] = React.useState(null);
    const [error,setError] = React.useState(null);
    const [state,setState] = React.useState({ status :"idle", pokemon : null})

    const {status ,pokemon} = state

    React.useEffect(()=> {
        if (!pokemonName) {return}
        else {
            setState({status:"pending",pokemon: null})
            fetchPokemon(pokemonName).then(
                pokemon => {
                    setState({status:"request successful",pokemon: pokemon})
                },
                error=> {
                    setError(error);
                    setState({status:"request failed", pokemon: null})
                },
            )
        }
    },[pokemonName])

    if (status==='request failed' ){
        // return <div role="alert">
        //     There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        // </div>
        throw error;
    }
    else {
    return status==='idle' ? 'Submit a pokemon' : status==='pending' ?  <PokemonInfoFallback name={pokemonName} /> : <PokemonDataView pokemon={pokemon} />;}

  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
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

  // 💣 remove this
  // return 'TODO'
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

function ErrorFallback({error,resetErrorBoundary}) {

    return (
        <div role="alert">
            There was an error:{' '}
            <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

  // return (
  //   <div className="pokemon-info-app">
  //     <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
  //     <hr />
  //     <div className="pokemon-info">
  //     <ErrorBoundary key={pokemonName} FallbackComponent={ErrorFallback}>
  //         <PokemonInfo pokemonName={pokemonName} />
  //     </ErrorBoundary>
  //     </div>
  //   </div>
  // )
    return (
        <div className="pokemon-info-app">
            <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
            <hr />
            <div className="pokemon-info">
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>setPokemonName("")} resetKeys={[pokemonName]} >
                    <PokemonInfo pokemonName={pokemonName} />
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default App
