// Set State Callback
// Why you should use the callback form when you rely on the previous state value
// http://localhost:3000/isolated/examples/set-state-callback.tsx

import * as React from 'react'

function App() {
  const [buggyCount, setBuggyCount] = React.useState(0)
  const [workingCount, setWorkingCount] = React.useState(0)

  function buggyIncrement() {
    // this one incorrectly only updates once every two seconds
    setTimeout(() => {
      setBuggyCount(buggyCount + 1)
    }, 2000)
  }

  function workingIncrement() {
    // this one correctly updates every click,
    // it just takes two seconds before the update is performed
    setTimeout(() => {
      setWorkingCount(previousWorkingCount => previousWorkingCount + 1)
    }, 2000)
  }

  // to observe the bug, hit the buttons rapidly and note their differences...
  return (
    <div>
      <button onClick={buggyIncrement}>Buggy: {buggyCount}</button>
      <button onClick={workingIncrement}>Working: {workingCount}</button>
    </div>
  )
}

export {App}
