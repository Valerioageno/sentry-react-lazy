import { createContext, useContext, useLayoutEffect } from 'react'
import { noop } from './helpers'
import type {
  SentryType,
  Level,
  SentryConfigType,
  TracingOptions
} from './types'

declare global {
  interface Window {
    Sentry: SentryType
  }
  interface HTMLScriptElement {
    onreadystatechange: () => void
  }
}

const SentryContext = createContext<SentryType>({
  onLoad: noop,
  init: noop,
  captureMessage: noop,
  captureException: noop,
  configureScope: noop,
  Severity: {},
  withScope: noop,
  Integrations: {},
  setContext: noop
})

interface ContextProps {
  children: JSX.Element
  url: string
  config: SentryConfigType
  integrity?: string
  performance?: boolean
  tracingOptions?: TracingOptions
}

export function SentryProvider({
  children,
  url,
  config,
  integrity,
  performance = false,
  tracingOptions
}: ContextProps): JSX.Element {
  const Sentry: SentryType = {
    onLoad: (callback) => window?.Sentry?.onLoad(callback),
    init: (options) => window?.Sentry?.init(options),
    captureMessage: (msg, lv?: Level) =>
      window?.Sentry?.captureMessage(msg, lv ?? 'warning'),
    captureException: (err, lv?: Level) =>
      window?.Sentry?.captureException(err, lv ?? 'warning'),
    configureScope: (callback) => window?.Sentry?.configureScope(callback),
    withScope: (callback) => window?.Sentry?.withScope(callback),
    Severity: {
      Critical: 'critical',
      Debug: 'debug',
      Error: 'error',
      Fatal: 'fatal',
      Info: 'info',
      Log: 'log',
      Warning: 'warning'
    },
    Integrations: {},
    setContext: (str, obj) => window?.Sentry?.setContext(str, obj)
  }

  useLayoutEffect(() => {
    const script: HTMLScriptElement = document.createElement('script')
    script.src = url
    script.crossOrigin = 'anonymous'
    script.type = 'application/javascript'
    const head = document.getElementsByTagName('head')[0]
    let done = false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function checkLoadingAndRun(this: any) {
      if (
        !done &&
        (!this.readyState ||
          this.readyState === 'loaded' ||
          this.readyState === 'complete')
      ) {
        if (performance) {
          if (window.Sentry.Integrations.BrowserTracing) {
            const BrowserTracing =
              new window.Sentry.Integrations.BrowserTracing.prototype.constructor(
                tracingOptions
              )
            // eslint-disable-next-line no-param-reassign
            config.integrations = [BrowserTracing]
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            config.debug
              ? console.warn(
                  "The performance integration needs the right CDN. Please check https://docs.sentry.io/platforms/javascript/install/cdn/#performance-bundle. Performance won't be analyzed."
                )
              : null
          }
        }
        done = true
        Sentry.onLoad(() => Sentry.init(config))
      }
    }

    script.onload = checkLoadingAndRun
    script.onreadystatechange = checkLoadingAndRun
    if (integrity) script.integrity = integrity

    head.appendChild(script)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config])

  return (
    <SentryContext.Provider value={Sentry}>{children}</SentryContext.Provider>
  )
}

export function useSentry(): SentryType {
  return useContext<SentryType>(SentryContext)
}
