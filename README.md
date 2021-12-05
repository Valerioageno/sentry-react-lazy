# Sentry react lazy

This package create a `<script>` that loads the sentry CDN,
initialize the service and share the SDK around the whole application using the [React Context API](https://reactjs.org/docs/context.html).

## Goal

Enable a satisfying use of [sentry.io](https://sentry.io/welcome/) without load the
entire bundle inside the application which weights about 90kb
minified ([resources](https://bundlephobia.com/package/@sentry/react@6.15.0))

## Using

Install the dependencie

```bash
npm i sentry-react-lazy
```

Wrap the application (or the part where you want use the service) with the `<SentryProvider>` component and
set the configuration settings.

To avoid annoing adBlocking software it can be useful load the CDN
using a tunnel or serving it directly from the same server.
[Check here](https://docs.sentry.io/platforms/javascript/guides/react/troubleshooting/)
the documentation and then just change the url or the config.

```javascript
const sentryConfig = {
  dsn: 'gjrdphgy035yh4509eghfdbdgfbnw40',
  debug: true,
  environment: 'development',
  release: 'my-awesome-app'
}

ReactDOM.render(
  <SentryProvider
    url="https://browser.sentry-cdn.com/6.15.0/bundle.tracing.min.js"
    integrity="sha384-1k7XKRQgqjUbNyG2sI+qsY8HTHMOeLdycMx6hoGuNSANZ3WrMa3LXkr+M4t+SIpF"
    config={sentryConfig}
  >
    <App />
  </SentryProvider>,
  document.getElementById('root')
)
```

Then all exceptions will be monitored so:

```javascript
<button
  onClick={() => {
    throw new Error('Sentry error')
  }}
>
  Button
</button>
```

If you want to use the internal Sentry functions you can just:

```javascript
import { useSentry } from 'sentry-react-lazy'

export default function MyComponent() {
  const Sentry = useSentry()
  // Or destructuring with: const { captureMessage } = useSentry()

  return (
    <div>
      <button onClick={() => Sentry.captureMessage('Sentry message')}>
        Button
      </button>
    </div>
  )
}
```

## Method

Sentry's SDK hooks into your runtime environment and automatically
reports errors, uncaught exceptions, and unhandled rejections as well
as other types of errors depending on the platform. ([doc](https://docs.sentry.io/platforms/javascript/usage/))

If you want report custom exeption it can be also possible use the following functions.

| method     | description      |
| -------------------------- | -- |
| `onLoad(callback)`         | execute the initialization after the CDN loading  |
| `init(config)`             | configure the sentry setup as [doc](https://docs.sentry.io/platforms/javascript/configuration/) (not all fields are available) |
| `captureMessage(msg)`  | capture a custom message    |
| `captureException(err)`| capture the entire exception passing the Error object as argument   |
| `configureScope(callback)`| set the level within the scope ([doc](https://docs.sentry.io/platforms/javascript/usage/set-level/))|
| `withScope(callback)` | override the default level within the event ([doc](https://docs.sentry.io/platforms/javascript/usage/set-level/)) |

Those functions also take as optional argument the scope of the error. ([doc](https://docs.sentry.io/platforms/javascript/usage/set-level/))

## Performance monitoring

Performance monitoring is available using the right CDN.

In order to use the automatic integration `new TracingIntegrations.BrowserTracing()` is needed to set the `performance`
prop in the `<SentryProvider>`. Custom options must be passed as `tracingOptions` prop as expected by the the original
[doc](https://docs.sentry.io/platforms/javascript/performance/instrumentation/automatic-instrumentation/#configuration-options).

```javascript
<SentryProvider
  url="https://browser.sentry-cdn.com/6.15.0/bundle.tracing.min.js"
  integrity="sha384-1k7XKRQgqjUbNyG2sI+qsY8HTHMOeLdycMx6hoGuNSANZ3WrMa3LXkr+M4t+SIpF"
  config={sentryConfig}
  performance
  tracingOptions={{tracingOrigins: ['localhost', 'my-site-url.com', /^\//]}}
>
  <App />
</SentryProvider>
```

It can be possible also create your [custom integration](https://docs.sentry.io/platforms/javascript/performance/instrumentation/custom-instrumentation/)
without donwload any other package.

## How to start contributing

1. `git clone git@github.com:Valerioageno/sentry-react-lazy.git`
2. remove the extension .example from `playground/.env.example` and set your own DSN from [sentry.io](https://sentry.io)
3. `npm run i-all`
4. `npm run dev`
5. enjoy

Any helps or suggestions will be appreciated.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more information.
