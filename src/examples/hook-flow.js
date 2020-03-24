// Hook flow
// https://github.com/donavon/hook-flow
// http://localhost:3000/isolated/examples/hook-flow.js

import React from 'react'

function Child() {
  console.log('%c    Child: render start', 'color: MediumSpringGreen')

  const [count, setCount] = React.useState(() => {
    console.log('%c    Child: useState callback', 'color: tomato')
    return 0
  })

  React.useEffect(() => {
    console.log('%c    Child: useEffect no deps', 'color: LightCoral')
    return () => {
      console.log('%c    Child: useEffect no deps cleanup', 'color: LightCoral')
    }
  })

  React.useEffect(() => {
    console.log('%c    Child: useEffect empty deps', 'color: MediumTurquoise')
    return () => {
      console.log(
        '%c    Child: useEffect empty deps cleanup',
        'color: MediumTurquoise',
      )
    }
  }, [])

  React.useEffect(() => {
    console.log('%c    Child: useEffect with dep', 'color: HotPink')
    return () => {
      console.log('%c    Child: useEffect with dep cleanup', 'color: HotPink')
    }
  }, [count])

  const element = (
    <button onClick={() => setCount(previousCount => previousCount + 1)}>
      {count}
    </button>
  )

  console.log('%c    Child: render end', 'color: MediumSpringGreen')

  return element
}

function App() {
  console.log('%cApp: render start', 'color: MediumSpringGreen')

  const [showChild, setShowChild] = React.useState(() => {
    console.log('%cApp: useState callback', 'color: tomato')
    return false
  })

  React.useEffect(() => {
    console.log('%cApp: useEffect no deps', 'color: LightCoral')
    return () => {
      console.log('%cApp: useEffect no deps cleanup', 'color: LightCoral')
    }
  })

  React.useEffect(() => {
    console.log('%cApp: useEffect empty deps', 'color: MediumTurquoise')
    return () => {
      console.log(
        '%cApp: useEffect empty deps cleanup',
        'color: MediumTurquoise',
      )
    }
  }, [])

  React.useEffect(() => {
    console.log('%cApp: useEffect with dep', 'color: HotPink')
    return () => {
      console.log('%cApp: useEffect with dep cleanup', 'color: HotPink')
    }
  }, [showChild])

  const element = (
    <>
      <label>
        <input
          type="checkbox"
          checked={showChild}
          onChange={e => setShowChild(e.target.checked)}
        />{' '}
        show child
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 30,
          width: 30,
          border: 'solid',
        }}
      >
        {showChild ? <Child /> : null}
      </div>
    </>
  )

  console.log('%cApp: render end', 'color: MediumSpringGreen')

  return element
}

export default App
