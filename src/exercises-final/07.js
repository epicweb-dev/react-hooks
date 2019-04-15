// Avoid unnecessary re-renders with React.memo
import React from 'react'

const Upper = React.memo(function Upper({children}) {
  const [count, setCount] = React.useState(0)
  console.info('rendered', children)
  return (
    <div>
      Uppercase version: {children.toUpperCase()}{' '}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
})

function App() {
  const [first, setFirstName] = React.useState('')
  const [last, setLastName] = React.useState('')
  return (
    <div>
      <label htmlFor="first-name-input">First Name</label>
      <input
        id="first-name-input"
        onChange={e => setFirstName(e.target.value)}
      />
      <Upper>{first}</Upper>
      <hr />
      <label htmlFor="last-name-input">Last Name</label>
      <input id="last-name-input" onChange={e => setLastName(e.target.value)} />
      <Upper>{last}</Upper>
    </div>
  )
}

function Usage() {
  return <App />
}
Usage.title = 'Avoid unnecessary re-renders with React.memo'

export default Usage
