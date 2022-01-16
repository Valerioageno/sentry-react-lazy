import logo from './logo.svg'
import './App.css'
import { useSentry } from './component-lib'
import { Severity } from '@sentry/types'
import { useEffect } from 'react'

function App() {
  const Sentry = useSentry()

  // Mega request
  useEffect(() => {
    if (Sentry.Scope) {
      Sentry.setContext('character', {
        name: 'Mighty Fighter',
        age: 19,
        attack_type: 'melee'
      })

      Sentry.setUser({
        id: 'id000',
        username: 'sentry'
      })

      Sentry.setTag('customTag', 'testTag')

      Sentry.addBreadcrumb({
        type: 'test',
        level: Severity.Fatal,
        category: 'test'
      })

      Sentry.configureScope((scope) => scope.setTransactionName('UserListView'))

      Sentry.Scope.setTags({
        section: 'articles',
        category: 'post'
      })

      // Sentry.captureMessage('custom message')
      Sentry.captureException(new Error('something went wrong'), Sentry.Scope)
    }
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
