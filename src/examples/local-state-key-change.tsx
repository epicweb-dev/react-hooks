// Synchronizing Side-Effects
// flexible localStorage hook - changing the key in localStorage
// http://localhost:3000/isolated/examples/local-state-key-change.tsx

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function App({initialName = ''}: {initialName?: string}) {
  const [key, setKey] = React.useState('name')
  const [name, setName] = useLocalStorageState(key, initialName)

  function handleClick() {
    if (key === 'name') {
      setKey('firstName')
    } else if (key === 'firstName') {
      setKey('Name')
    } else {
      setKey('name')
    }
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Change key!
      </button>
      <form>
        <label htmlFor="name">Name: </label>
        <input
          value={name}
          onChange={event => setName(event.currentTarget.value)}
          id="name"
        />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

export {App}
