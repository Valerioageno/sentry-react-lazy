import logo from './logo.svg'
import './App.css'
import { useSentry } from './component-lib'

function App() {
  const Sentry = useSentry()

  function error() {
    Sentry.configureScope((scope) => {
      scope.setLevel(Sentry.Severity.Log)
    })
    try {
      throw new Error()
    } catch (error) {
      Sentry.withScope((scope) => {
        scope.setFingerprint([error, String('error with scope after change')])
        Sentry.captureMessage('custom message')
      })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => error()}>Button</button>
      </header>
    </div>
  )
}

export default App
