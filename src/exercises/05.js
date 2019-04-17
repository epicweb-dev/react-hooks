// Interact with the DOM with useEffect
import React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

// Let's make this Tilt component render a div that's super fancy.

function Tilt({children}) {
  // 🐨 create a ref here with React.useRef()

  // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
  // div look fancy.
  // 💰 like this:
  // const tiltNode = tiltRef.current
  // VanillaTilt.init(tiltNode, {
  //   max: 25,
  //   speed: 400,
  //   glare: true,
  //   'max-glare': 0.5,
  // })
  //
  // 💰 Don't forget to return a cleanup function. VanillaTilt.init will add an
  // object to your DOM node to cleanup:
  // `return () => tiltNode.vanillaTilt.destroy()`
  //
  // 💰 Don't forget to specify your effect's dependencies array! In our case
  // we know that the tilt node will never change, so make it `[]`. Ask me about
  // this for a more in depth explanation.

  // 🐨 add the `ref` prop to the `tilt-root` div here:
  return (
    <div className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

// 💯 Make a custom hook that I can call like this: `useTilt(ref, options)`

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:

http://ws.kcd.im/?ws=learn%20react%20hooks&e=05&em=
*/

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}
Usage.title = 'Interact with the DOM with useEffect'

export default Usage
