// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useLocalStorageState} from "../utils"


function Greeting({initialName = ""}) {
  // 🐨 initialize the state to the value from localStorage
  
  const [name,setName]=useLocalStorageState("name",initialName);
  console.log("name",name);
  
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  
  
  function handleChange(event) {
    debugger
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
  return <Greeting  />
}

export default App
