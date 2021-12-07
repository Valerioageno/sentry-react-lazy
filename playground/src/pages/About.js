import logo from '../logo.svg'
import { Link } from 'react-router-dom'
import '../App.css'
import { useSentry } from '../component-lib'
import ApiCall from '../components/ApiCall'

function About() {
  const Sentry = useSentry()

  const base =
    window.location.hostname !== 'localhost' ? '/sentry-react-lazy' : ''

  return (
    <div className="App">
      <header className="App-header">
        <Link to={`${base}/`}>Home</Link>
        <h1>About Page</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => Sentry.captureMessage('hello from button')}>
          Sentry call
        </button>
        <ApiCall />
      </header>
    </div>
  )
}

export default About
