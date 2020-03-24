// useCounter: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'

// 🐨 Make a custom hook called useCounter that accepts the step and
// initialCount and returns the count and increment functions

function Counter({step = 1, initialCount = 0}) {
  // 💣 remove this (or move it to your custom hook)
  const [count, setCount] = React.useState(initialCount)
  const increment = () => setCount(c => c + step)
  // 🐨 Use your custom useCounter hook to get `count` and `increment`
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
