// Avoid unnecessary re-renders with React.memo
import React from 'react'

// 🐨 Wrap the "Upper" component here in React.memo
function Upper({text}) {
  const [count, setCount] = React.useState(0)
  console.info('rendered', text) // don't change this line... (it's used in the tests)
  return (
    <div>
      Uppercase version: {text.toUpperCase()}{' '}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:

http://ws.kcd.im/?ws=learn%20react%20hooks&e=07&em=
*/

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  const [first, setFirstName] = React.useState('')
  const [last, setLastName] = React.useState('')
  return (
    <div>
      <label htmlFor="first-name-input">First Name</label>
      <input
        id="first-name-input"
        onChange={e => setFirstName(e.target.value)}
      />
      <Upper text={first} />
      <hr />
      <label htmlFor="last-name-input">Last Name</label>
      <input id="last-name-input" onChange={e => setLastName(e.target.value)} />
      <Upper text={last} />
    </div>
  )
}
Usage.title = 'Avoid unnecessary re-renders with React.memo'

export default Usage
