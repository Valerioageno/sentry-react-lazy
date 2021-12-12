import { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { useSentry } from './component-lib'

function App() {
  const Sentry = useSentry()

  useEffect(() => {
    const scope = Sentry.Scope
    if (scope) {
      scope.setTag('menin', 'belin')
      Sentry.captureException('belin', scope)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Sentry.Scope])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
