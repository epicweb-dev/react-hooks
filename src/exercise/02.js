// useEffect: persistent state
// http://localhost:3000/isolated/exercise/03.js
// http://localhost:3000/isolated/exercise/02.js
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'

function Counter({step = 1, initialCount = 0}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 Number(window.localStorage.getItem('count') || initialCount)
  const [count, setCount] = React.useState(initialCount)
  const increment = () => setCount(c => c + step)
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `count` in localStorage.
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
