// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

//to use the prop it mast be passed in the greeting parameter.
function Greeting({initialName}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  
  //changes de name declaraton to use the react use state and set a blank 
  //string for the initial state.

  //extra credit setting the default initial state to Kody in the greeting prop and calling it.

  const [name, setName] = React.useState(initialName)


  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value)
  }

  //for the extra credit the value prop is placed with the value of the use state to the name variable.
  //uses the default state name 'Kody' but once there is a change the value is updated.
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Kody"/>
}

export default App
