// Counter: hooks and simple state
import React from 'react'

// 🐨 Below, fill out the Counter component so that it manages the state of how
// many times the the button is clicked. The text of the button should be the
// number of times the button has been clicked.

function Counter() {
  // 🐨 use React.useState here
  // 🐨 create an increment function that calls the state updater you get from
  //    React.useState to increment the count
  // 🐨 render the count you get from React.useState inside the button and use
  //    your increment function as the onClick handler.
  return <button />
}

// 💯 make the counter accept props called "step" and "initialCount" and make
// the counter increment by the given step and start at the given count

// 💯 You'll need to know the current count to increment it by one. Normally
// it's fine to just reference the `count` variable you have available in your
// closure, but it can be problematic in some situations (async especially).
// State updater functions (like `setName` above) can accept a function which
// will be passed the current state and returns what you want the state to be
// set to:
//
// setCount(currentCount => {
//   // calculate newCount variable
//   return newCount
// })
//
// You can make things work without doing it this way, but as a bonus try to
// figure out how to make that work as well. We'll cover more about why this
// is important when we talk about asynchronously updating the state.

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:

http://ws.kcd.im/?ws=learn%20react%20hooks&e=01&em=
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
Usage.title = 'Counter: hooks and simple state'

export default Usage
