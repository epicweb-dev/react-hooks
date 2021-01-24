// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, defaultValue, {serialize = JSON.stringify, deserialize = JSON.parse} = {}) {
  const [state, setState] = React.useState(
    () => {
      const valueInStorage = window.localStorage.getItem(key);
      if(valueInStorage) {
        try {
          return deserialize(valueInStorage);
        } catch (error) {
          window.localStorage.removeItem(key);
        }
      }
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      // return defaultValue;
    }
  )

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if(prevKey !== key) {
      window.localStorage.removeItem(prevKey);
      prevKey.current = key;
    }
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  // const [name, setName] = React.useState(() => {
  //   // lazy initialzation 
  //   return window.localStorage.getItem('name') || initialName;
  // });

  // // 🐨 Here's where you'll use `React.useEffect`.
  // // The callback should set the `name` in localStorage.
  // // 💰 window.localStorage.setItem('name', name)
  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name]);

  const [name, setName] = useLocalStorageState('name', initialName);

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" placeholder={name}/>
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
