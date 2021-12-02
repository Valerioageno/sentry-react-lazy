import logo from './logo.svg'
import './App.css'
import { useSentry } from './component-lib'
import { useEffect } from 'react'

function App() {
  const Sentry = useSentry()

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
        <button onClick={() => Sentry.captureMessage('hello from button')}>
          Button
        </button>
      </header>
    </div>
  )
}

export default App
