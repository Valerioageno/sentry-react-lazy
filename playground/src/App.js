import { Routes, Route } from 'react-router-dom'
import Error404 from './pages/404'
import About from './pages/About'
import Home from './pages/Home'

const App = () => {
  const base =
    window.location.hostname !== 'localhost' ? '/sentry-react-lazy' : ''

  return (
    <div className="App">
      <Routes>
        <Route path={`${base}/`} element={<Home />} />
        <Route path={`${base}/about`} element={<About />} />
        <Route path={`${base}/*`} element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
