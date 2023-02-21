// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'


//making a custom react hook with the react.useEffect() for extra credit 3.
//all of the getting and setting logic us done in this custom hook.

function useLocalStorageState(key, defaultValue = ''){
  const [state, setState] = React.useState(() => window.localStorage.getItem(key) ?? defaultValue)
  React.useEffect(() => {window.localStorage.setItem(key, state)}, [key, state])

  return [state, setState]


}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName

  //change the argument to the local stored name.
  //const [name, setName] = React.useState(initialName)
  
  //const [name, setName] = React.useState(window.localStorage.getItem('name') ?? initialName)

  //Extra credit 1 implementing the Lazy state initialization.

  //const [name, setName] = React.useState(() => window.localStorage.getItem('name') ?? initialName)
  //extra credit implementation of th cutom hook.
  const [name, setName] = useLocalStorageState('name', initialName)

  // 🐨 Here's where you'll use `React.useEffect`.

  //impleneting the React.useEffect to get the value from local storage and keep local
  //storage updated as the 'name' is updated.

  //extra credit 2, sdding the dependencies array to the useEffect second parameter.
React.useEffect(() => {
  window.localStorage.setItem('name', name)
}, [name]
)
// the name dependencies makes sure to call only when the name is changed.

  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)


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
