// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = (key, item) => {
  React.useEffect(() => {
    const stringified = JSON.stringify(item);
    window.localStorage.setItem(key, stringified);
  });
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  const [name, setName] = React.useState(initialName);
  React.useState(() => {
    setName(JSON.parse(window.localStorage.getItem('name')) || initialName);
    console.log('reading localstorage');
  })
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value)
  }
  /*
  React.useEffect(() => {
    window.localStorage.setItem('name', name);
    console.log('writing to localstorage');
  },[name]);
  */
  useLocalStorageState('name', name);

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
