# Sentry react lazy

This package create a `<script>` that load the sentry CDN, initialize the service and share the SDK around the whole application using the [React Context API](https://reactjs.org/docs/context.html).

## Goal 

Enable a satisfying use of [sentry.io](https://sentry.io/welcome/) without load the entire bundle inside the application which weights about 90kb minified ([resources](https://bundlephobia.com/package/@sentry/react@6.15.0))

## Using
Install the dependencie
```bash
npm i sentry-react-lazy
```

Wrap the application (or the part where you want use the service) with the `<SentryProvider>` component and set the configuration settings.

To avoid annoing adBlocking software it can be useful load the CDN using a tunnel or serving it directly from the same server. [Check here](https://docs.sentry.io/platforms/javascript/guides/react/troubleshooting/) the documentation and then just change the url or the config.

```javascript
const sentryConfig = {
  dsn: "gjrdphgy035yh4509eghfdbdgfbnw40",
  debug: true,
  environment: "development",
  release: "my-awesome-app"
}

ReactDOM.render(
    <SentryProvider 
      url="https://browser.sentry-cdn.com/6.15.0/bundle.tracing.min.js"
      config={sentryConfig}
    >
      <App />
    </SentryProvider>,
  document.getElementById('root')
);
```

Then all exception will be monitored so:

```javascript
<button onClick={() => {throw new Error('Sentry error')}}>Button</button>
```

If you want to use the internal Sentry function you can just:

```javascript
import { useSentry } from 'sentry-react-lazy'

export default function MyComponent() {
    const { Sentry } = useSentry()

    return (
        <div>
            <button onClick={() => Sentry.captureMessage('Sentry message')}>Button</button>
        </div>
    )
}
```

## How to start contributing

1. `git clone git@github.com:Valerioageno/sentry-react-lazy.git`
2. remove the extension .example from `playground/.env.example` and set your own DSN from [sentry.io](https://sentry.io)
3. `npm run i-all`
4. `npm run dev`
5. enjoy

Any helps or suggestions will be appreciated.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more information.