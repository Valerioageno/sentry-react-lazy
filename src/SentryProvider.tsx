import { createContext, useContext, useLayoutEffect, useState } from 'react'
import { SentryType, ContextProps } from './types'

declare global {
  interface Window {
    Sentry: SentryType
  }
  interface HTMLScriptElement {
    onreadystatechange: () => void
  }
}

const SentryContext = createContext<SentryType>({
  captureMessage: (message, level?, hint?, scp?) =>
    window?.Sentry?.captureMessage(message, level, hint, scp),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  captureException: (exception, hint?, scp?) =>
    window?.Sentry?.captureException(exception, hint, scp),
  configureScope: (callback) => window?.Sentry?.configureScope(callback),
  Severity: {
    Critical: 'critical',
    Debug: 'debug',
    Error: 'error',
    Fatal: 'fatal',
    Info: 'info',
    Log: 'log',
    Warning: 'warning'
  },
  withScope: (callback) => window?.Sentry?.withScope(callback),
  Integrations: {},
  setContext: (str, obj) => window?.Sentry?.setContext(str, obj),
  setUser: (user) => window?.Sentry?.setUser(user),
  setTag: (key, value) => window?.Sentry?.setTag(key, value),
  addBreadcrumb: (bc, maxBc) => window?.Sentry?.addBreadcrumb(bc, maxBc),
  Scope: undefined
})

export function SentryProvider({
  children,
  url,
  config,
  integrity,
  performance = false,
  tracingOptions,
  scope
}: ContextProps): JSX.Element {
  const [Sentry, setSentry] = useState<SentryType>({
    captureMessage: (message, level?, hint?, scp?) =>
      window?.Sentry?.captureMessage(message, level, hint, scp),
    captureException: (exception, hint?, scp?) =>
      window?.Sentry?.captureException(exception, hint, scp),
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
    setContext: (str, obj) => window?.Sentry?.setContext(str, obj),
    setUser: (user) => window?.Sentry?.setUser(user),
    setTag: (key, value) => window?.Sentry?.setTag(key, value),
    addBreadcrumb: (bc, maxBc) => window?.Sentry?.addBreadcrumb(bc, maxBc),
    Scope: undefined
  })

  useLayoutEffect(() => {
    const script: HTMLScriptElement = document.createElement('script')
    script.src = url
    script.crossOrigin = 'anonymous'
    script.type = 'application/javascript'
    script.dataset.testid = 'sentry'
    if (integrity) script.integrity = integrity
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
            // eslint-disable-next-line no-lonely-if
            if (config.debug) {
              console.warn(
                "The performance integration needs the right CDN. Please check https://docs.sentry.io/platforms/javascript/install/cdn/#performance-bundle. Performance won't be analyzed."
              )
            }
          }
        }
        done = true
        if (window?.Sentry?.onLoad)
          window.Sentry.onLoad(
            () => window?.Sentry?.init && window.Sentry.init(config)
          )
        if (scope && window?.Sentry.Scope) {
          setSentry({
            ...Sentry,
            Scope: new window.Sentry.Scope.prototype.constructor()
          })
        }
      }
    }

    script.onload = checkLoadingAndRun
    script.onreadystatechange = checkLoadingAndRun

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
