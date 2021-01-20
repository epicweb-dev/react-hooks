// DOM Side-Effects
// http://localhost:3000/isolated/final/02.extra-4.tsx

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function UsernameForm({
  initialUsername = '',
  onSubmitUsername,
}: {
  initialUsername?: string
  onSubmitUsername: (username: string) => void
}) {
  const [username, setUsername] = useLocalStorageState(
    'username',
    initialUsername,
  )
  const [touched, setTouched] = React.useState(false)

  const usernameIsLowerCase = username === username.toLowerCase()
  const usernameIsLongEnough = username.length >= 3
  const usernameIsShortEnough = username.length <= 10
  const formIsValid =
    usernameIsShortEnough && usernameIsLongEnough && usernameIsLowerCase

  const displayErrorMessage = touched && !formIsValid

  // 🐨 Add a useRef here. Call the ref `usernameInputRef`
  // 🦺 useRef is a generic function and the type you pass is the type of value
  // you intend to store in the ref. Since we plan to store the <input /> in this
  // ref, you'll use HTMLInputElement

  // 🐨 Add a useEffect here. Whenever the `displayErrorMessage` state changes,
  // we want to call `focus()` on usernameInputRef.current if
  // displayErrorMessage is true.
  // 💰 You'll want to add `displayErrorMessage` in the effect dependencies array,
  //
  // 🦉 you'll get a linting warning if you try to include `usernameInputRef`
  // or `usernameInputRef.current`.
  // 📜 Learn more: https://epicreact.dev/why-you-shouldnt-put-refs-in-a-dependency-array

  let errorMessage = null
  if (!usernameIsLowerCase) {
    errorMessage = 'Username must be lower case'
  } else if (!usernameIsLongEnough) {
    errorMessage = 'Username must be at least 3 characters long'
  } else if (!usernameIsShortEnough) {
    errorMessage = 'Username must be no longer than 10 characters'
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTouched(true)
    if (!formIsValid) return

    onSubmitUsername(username)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.currentTarget.value)
  }

  function handleBlur() {
    setTouched(true)
  }

  return (
    <form name="usernameForm" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input
          // 🐨 set usernameInputRef as a ref prop here
          id="usernameInput"
          type="text"
          value={username}
          onChange={handleChange}
          onBlur={handleBlur}
          pattern="[a-z]{3,10}"
          required
          aria-describedby={displayErrorMessage ? 'error-message' : undefined}
        />
      </div>
      {displayErrorMessage ? (
        <div role="alert" id="error-message">
          {errorMessage}
        </div>
      ) : null}
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = (username: string) =>
    alert(`You entered: ${username}`)
  return (
    <div style={{width: 400}}>
      <UsernameForm onSubmitUsername={onSubmitUsername} />
    </div>
  )
}

export {App}
