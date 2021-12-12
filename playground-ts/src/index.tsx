import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { SentryProvider, SentryConfigType } from './component-lib'

const sentryConfig: SentryConfigType = {
  dsn: process.env.REACT_APP_SENTRY_DSN ?? '',
  debug: true,
  environment: 'development',
  release: 'test-ts',
  sampleRate: 1.0
}

ReactDOM.render(
  <React.StrictMode>
    <SentryProvider
      url="https://browser.sentry-cdn.com/6.16.1/bundle.min.js"
      integrity="sha384-WkFzsrcXKeJ3KlWNXojDiim8rplIj1RPsCbuv7dsLECoXY8C6Cx158CMgl+O+QKW"
      config={sentryConfig}
      scope
    >
      <App />
    </SentryProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
