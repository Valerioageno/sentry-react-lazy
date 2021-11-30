import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SentryProvider } from './component-lib'

const sentryConfig = {
  dsn: "",
  debug: true,
  environment: "development",
  release: "test"
}

ReactDOM.render(
  <React.StrictMode>
    <SentryProvider 
      url="https://browser.sentry-cdn.com/6.15.0/bundle.tracing.min.js"
      config={sentryConfig}
    >
      <App />
    </SentryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
