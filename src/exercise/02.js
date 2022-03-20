// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting() {

  function useLocalStorageState(initialState = '', storageKey){
    const [state, setState] = React.useState(() => {
      let item = window.localStorage.getItem(storageKey);
      if(!item){
        return JSON.parse(JSON.stringify(initialState))
      }
      return JSON.parse(item);
    });

    React.useEffect(() => {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    }, [state, storageKey])

    return [state, setState];

  }

const [name, setName] = useLocalStorageState('', 'name');

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
