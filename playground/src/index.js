import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { SentryProvider } from './component-lib'
import { BrowserRouter } from 'react-router-dom'

const sentryConfig = {
  dsn: process.env.REACT_APP_SENTRY_DSN,
  debug: true,
  environment: 'development',
  release: 'test',
  sampleRate: 1.0,
  tracesSampleRate: 1.0
}

ReactDOM.render(
  <React.StrictMode>
    <SentryProvider
      url="https://browser.sentry-cdn.com/6.16.0/bundle.tracing.min.js"
      integrity="sha384-nOg4TW2SG7+ChoY+hVJJjLwLlnood85Xw4eFnH7/3VUmhvQCBlXO4KHlLkV/4JmG"
      config={sentryConfig}
      performance
      tracingOptions={{
        tracingOrigins: ['localhost', 'Valerioageno.github.io', /^\//]
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SentryProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
