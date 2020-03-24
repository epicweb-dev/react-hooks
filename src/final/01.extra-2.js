// useState: counter
// 💯 use the function updater
// http://localhost:3000/isolated/final/01.extra-2.js

import React from 'react'

function Counter({step = 1, initialCount = 0}) {
  const [count, setCount] = React.useState(initialCount)
  const increment = () => setCount(c => c + step)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
