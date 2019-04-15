// Tic Tac Toe: Advanced State
import React from 'react'

// If you'd rather practice refactoring a class component to a function
// component with hooks, then go ahead and do 04.classes.js instead.

// We're going to build tic-tac-toe! If you've gone through React's official
// tutorial, this was lifted from that (except that example still uses classes).
//
// You're going to need two bits of state:
// squares - The state of the board in a single-dimensional array:
// [
//   'X', 'O', 'X',
//   'X', 'O', 'O',
//   'X', 'X', 'O'
// ]
// (Naturally this will start out as an empty array.)
//
// xIsNext - Whether the "X" player is next. This will allow you to know who it
// was that clicked on a square and allow you to display who the next player is.

function Board() {
  // 🐨 Use React.useState for both the elements of state you need
  // 💰 To create an empty array with 9 slots, you can use: `Array(9).fill(null)`

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `5`.
  // eslint-disable-next-line no-unused-vars
  function selectSquare(square) {
    // 🐨 first determine if there's already a winner, return early if there is.
    // 💰 there's a `calculateWinner` function already written for you at the
    //    bottom of this file. Fee free to use `calculateWinner(squares)`.
    //
    // 🐨 If there's already a value at the square index, then return early.
    // 💰 you can combine this check with the previous using `||`.
    //
    // 🦉 It's typically a bad idea to manipulate state in React
    // 🐨 make a copy of the squares array (💰 `[...squares]` will do it!)
    // 🐨 Set the value of the square that was selected
    // 💰 `squaresCopy[square] = xIsNext ? 'X' : 'O'`
    //
    // 🐨 toggle the xIsNext state
    // 🐨 set the squares to your copy
  }

  // let's calculate the status we'll display at the top of the board.
  // 🐨 determine whether there's a winner (💰 `calculateWinner(squares)`).
  //
  // We can have the following statuses:
  // `Winner: ${winner}`
  // `Scratch: Cat's game` (💰 if every square in squares is truthy and there's no winner, then it's a scratch)
  // `Next player: ${xIsNext ? 'X' : 'O'}`
  //
  // 🐨 assign a `status` variable to one of these, and render it above the
  //    board in a div with the className "status"
  //
  // 🐨 return your JSX with this basic structure:
  // return (
  //   <div>
  //     <div className="status">{/* put the status here */}</div>
  //     {/* you'll need 3 board-rows and each will have 3 squares */}
  //     <div className="board-row">
  //       <button className="square" onClick={() => selectSquare(0)}>
  //         {squares[0]}
  //       </button>
  //       {/* etc... */}
  //     </div>
  //     {/* etc... */}
  //   </div>
  // )
  return 'todo'
}

// 💯 See if you can figure out a nice way to avoid all the repetition in the square buttons

// 💯 Open /isolated/exercises-final/09-extra-0 and see that the extra version
//    supports keeping a history of the game and allows you to go backward and
//    forward in time. See if you can implement that! (Tip, in the final
//    example, we separate the state management from the board and that helps).

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:

http://ws.kcd.im/?ws=learn%20react%20hooks&e=04&em=
*/

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function Usage() {
  return <Game />
}
Usage.title = 'Tic Tac Toe: Advanced State'

export default Usage
