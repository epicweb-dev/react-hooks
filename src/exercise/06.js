// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info

import { PokemonForm, fetchPokemon , PokemonInfoFallback, PokemonDataView} from '../pokemon';
import {ErrorBoundary} from 'react-error-boundary';

function ErrorFallback({error, resetErrorBoundary}) {
  console.log('errorrrr fallback!!!')
  return (
    <div role="alert">
      {console.log('blabla')}
      <div>There was an error:</div>
      <div>{error.message}</div>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { error: null };
//   }
//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return {  error };
//   }
//
//   componentDidCatch(error, errorInfo) {
//     console.log(error, errorInfo);
//   }
//
//   render() {
//     if (this.state.error) {
//       // You can render any custom fallback UI
//       return <div>
//         <div>There was an error:</div>
//         <div>{this.state.error.message}</div>
//       </div>;
//     }
//
//     return this.props.children;
//   }
// }
//


const statuses = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected'
}

function PokemonInfo({pokemonName}) {
  const [info, setInfo ] = React.useState({status: statuses.idle, pokemon: null, error: null})

  React.useEffect(() => {
    if(!pokemonName) return;
    const newInfo = {...info};
    newInfo.status = statuses.pending;
    setInfo(newInfo);
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        const newInfo = {...info};
        newInfo.pokemon = pokemonData;
        newInfo.status = statuses.resolved;
        setInfo(newInfo);
      })
      .catch(error => {
        const newInfo = {...info};
        newInfo.error = error;
        newInfo.status = statuses.rejected;
        setInfo(newInfo);


      });
  }, [pokemonName])

  switch(info.status){

    case(statuses.pending):
      return <PokemonInfoFallback name={pokemonName} />;

    case(statuses.resolved):
      return <PokemonDataView pokemon={info.pokemon} />;

    case(statuses.rejected):
      throw new Error(info.error.message);

    default: return 'Submit a pokemon';

  }



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
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => setPokemonName('')} resetKeys={[pokemonName]}>
        <PokemonInfo pokemonName={pokemonName}/>
        </ErrorBoundary>
      </div>
    </div>

  )
}

export default App
