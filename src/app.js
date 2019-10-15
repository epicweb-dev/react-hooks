import React from 'react'
import {Router, Link} from '@reach/router'
import {createBrowserHistory} from 'history'
import preval from 'preval.macro'
import pkg from '../package.json'

const {title} = pkg

if (!title) {
  throw new Error('The package.json must have a title!')
}

const exerciseInfo = preval`module.exports = require('./load-exercises')`

for (const infoKey in exerciseInfo) {
  const info = exerciseInfo[infoKey]
  info.exercise.Component = React.lazy(() => import(`./exercises/${infoKey}`))
  info.final.Component = React.lazy(() =>
    import(`./exercises-final/${infoKey}`),
  )
}

const history = createBrowserHistory()

function ComponentContainer({label, ...props}) {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2 style={{textAlign: 'center'}}>{label}</h2>
      <div
        style={{
          flex: 1,
          padding: 20,
          border: '1px solid',
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...props}
      />
    </div>
  )
}

function ExtraCreditLinks({exerciseId}) {
  const {extraCreditTitles} = exerciseInfo[exerciseId]
  if (!extraCreditTitles) {
    return null
  }

  return (
    <div style={{gridColumn: 'span 2'}}>
      {`Extra Credits: `}
      {Object.entries(extraCreditTitles).map(([id, title]) => (
        <span key={id}>
          <a href={`/isolated/exercises-final/${exerciseId}-extra.${id}`}>
            {title}
          </a>
          {' | '}
        </span>
      ))}
    </div>
  )
}

function ExerciseContainer({exerciseId}) {
  const {
    exercise: {Component: Exercise},
    final: {Component: Final},
  } = exerciseInfo[exerciseId]
  return (
    <div
      style={{
        padding: '20px 20px 40px 20px',
        minHeight: '100%',
        display: 'grid',
        gridGap: '20px',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '30px 1fr 30px',
      }}
    >
      <h1 style={{gridColumn: 'span 2', textAlign: 'center'}}>{Final.title}</h1>
      <ComponentContainer
        label={<Link to={`/${exerciseId}/exercise`}>Exercise</Link>}
      >
        <Exercise />
      </ComponentContainer>
      <ComponentContainer
        label={<Link to={`/${exerciseId}/final`}>Final Version</Link>}
      >
        <Final />
      </ComponentContainer>
      <NavigationFooter exerciseId={exerciseId} type="page" />
      <ExtraCreditLinks exerciseId={exerciseId} />
    </div>
  )
}

function NavigationFooter({exerciseId, type}) {
  const current = exerciseInfo[exerciseId]
  let suffix = ''
  let info = current.final
  if (type === 'exercise') {
    suffix = '/exercise'
    info = current.exercise
  } else if (type === 'final') {
    suffix = '/final'
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gridColumn: 'span 2',
      }}
    >
      <div style={{flex: 1}}>
        {info.previous ? (
          <Link to={`/${info.previous}${suffix}`}>
            {exerciseInfo[info.previous].title}{' '}
            <span role="img" aria-label="previous">
              👈
            </span>
          </Link>
        ) : null}
      </div>
      <div style={{flex: 1, textAlign: 'center'}}>
        <Link to="/">Home</Link>
      </div>
      <div style={{flex: 1, textAlign: 'right'}}>
        {info.next ? (
          <Link to={`/${info.next}${suffix}`}>
            <span role="img" aria-label="next">
              👉
            </span>{' '}
            {exerciseInfo[info.next].title}
          </Link>
        ) : null}
      </div>
    </div>
  )
}

function FullPage({type, exerciseId}) {
  const page = exerciseInfo[exerciseId]
  const {Component, isolatedPath} = exerciseInfo[exerciseId][type]
  return (
    <div>
      <div
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Link to={`/${exerciseId}`}>
          <span role="img" aria-label="back">
            👈
          </span>
          Exercise Page
        </Link>
        <a href={isolatedPath}>isolated</a>
      </div>
      <div style={{textAlign: 'center'}}>
        <h1>{page.title}</h1>
      </div>
      <div
        style={{
          flex: 1,
          padding: 20,
          margin: 20,
          border: '1px solid',
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Component />
      </div>
      <NavigationFooter exerciseId={exerciseId} type={type} />
    </div>
  )
}

function Isolated({loader}) {
  const Component = React.useMemo(() => React.lazy(loader), [loader])
  return (
    <div
      style={{
        padding: 30,
        height: '100%',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <Component />
      </div>
    </div>
  )
}

function Home() {
  return (
    <div style={{maxWidth: 800, margin: '50px auto 0px auto'}}>
      <h1 style={{textAlign: 'center'}}>{title}</h1>
      <div>
        {Object.entries(exerciseInfo).map(([filename, {title}]) => {
          return (
            <div key={filename} style={{margin: 10}}>
              {filename}
              {'. '}
              <Link to={`/${filename}`}>{title}</Link>{' '}
              <small>
                <Link to={`/${filename}/exercise`}>(exercise)</Link>{' '}
                <Link to={`/${filename}/final`}>(final)</Link>
              </small>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div
      style={{
        height: '100%',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        Sorry... nothing here. To open one of the exercises, go to{' '}
        <code>{`/exerciseId`}</code>, for example:{' '}
        <Link to="/01">
          <code>{`/01`}</code>
        </Link>
      </div>
    </div>
  )
}

function Routes() {
  return (
    <Router>
      <Home path="/" />
      <ExerciseContainer path="/:exerciseId" />
      <FullPage path="/:exerciseId/exercise" type="exercise" />
      <FullPage path="/:exerciseId/final" type="final" />
      <NotFound default />
    </Router>
  )
}

// The reason we don't put the Isolated components as regular routes
// and do all this complex stuff instead is so the React DevTools component
// tree is as small as possible to make it easier for people to figure
// out what is relevant to the example.
function App() {
  const [location, setLocation] = React.useState(history.location)
  React.useEffect(() => {
    return history.listen(l => setLocation(l))
  }, [])
  const {pathname} = location
  let ui = <Routes />
  if (pathname.startsWith('/isolated')) {
    const moduleName = pathname.split('/').slice(-1)[0]
    if (pathname.includes('/exercises-final/')) {
      ui = <Isolated loader={() => import(`./exercises-final/${moduleName}`)} />
    } else if (pathname.includes('/exercises/')) {
      ui = <Isolated loader={() => import(`./exercises/${moduleName}`)} />
    }
  }
  return (
    <React.Suspense
      fallback={<div className="totally-centered">Loading...</div>}
    >
      {ui}
    </React.Suspense>
  )
}

export default App
