import logo from '../logo.svg'
import { Link } from 'react-router-dom'
import '../App.css'
import { useSentry } from '../component-lib'
import { useEffect } from 'react'

function Error404() {
  const Sentry = useSentry()

  useEffect(() => {
    Sentry.withScope(function (scope) {
      scope.setLevel('fatal')
      Sentry.setContext('CONTEXT', {
        name: 'Page 404',
        message: 'why they are here?'
      })
      Sentry.captureException('fatal')
    })
  }, [Sentry])

  const base =
    window.location.hostname !== 'localhost' ? '/sentry-react-lazy' : ''

  return (
    <div className="App">
      <header className="App-header">
        <Link to={`${base}/`}>Home</Link>
        <h1>404</h1>
        <img src={logo} className="App-logo" alt="logo" />
        Sentry error sent on page load
      </header>
    </div>
  )
}

export default Error404
