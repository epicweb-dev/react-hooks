// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

function useLocalStorageState(
  key,
  defaultValue = '',
  // the = {} fixes the error we would get from destructuring when no argument was passed
  // Check https://jacobparis.com/blog/destructure-arguments for a detailed explanation
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  // Check the example at src/examples/local-state-key-change.js to visualize a key change
  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function Board({squares, onClick}) {
  // 🐨 squares is the state for this component. Add useState for squares
  function renderSquare(i) {
    return (
      <button onClick={() => onClick(i)} className="square">
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [squares, setSquares] = useLocalStorageState('squares', Array(9).fill(null));
  const [history, setHistory] = useLocalStorageState('history',[Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useLocalStorageState('step', 0);
  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);
  const moves = getMoves();

  function selectSquare(square) {
    if(winner || squares[square]) return;
    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
    let  historyCopy = [...history];
    if(currentStep < history.length -1){
      historyCopy = historyCopy.slice(0,  currentStep + 1 );
    }
    historyCopy.push(squaresCopy);
    setHistory(historyCopy);
    setCurrentStep(prevStep => prevStep + 1);
  }


  function getMoves() {
    const movesNames = [];
    for(let i = 0; i < history.length; i++){
      if(i == 0) {
        movesNames.push(`game start ${currentStep === 0 ? '(current)' : ''}`);
        continue;
      }
      movesNames.push(`move #${i}`);
      if(i == currentStep){
        movesNames[i] += '(current)';
      }
    }
    return movesNames.map((name, index) => <li key={name}><button onClick={()=> goToIndex(index)} disabled = {index === currentStep} >Go to {name}</button></li>)
  }

  function goToIndex(index){
    setCurrentStep(index);
    setSquares(history[index]);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setHistory([[Array(9).fill(null)]]);
    setCurrentStep(0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={history[currentStep]} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

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

function App() {
  return <Game />
}

export default App
