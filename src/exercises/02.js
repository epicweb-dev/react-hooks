// Counter: custom hooks
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

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:
http://ws.kcd.im/?ws=React%20Hooks&e=Counter%3A%20custom%20hooks&em=
*/

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return <Counter />
}
Usage.title = 'Counter: custom hooks'

export default Usage
