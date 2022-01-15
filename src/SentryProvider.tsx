import {
  createContext,
  ReactElement,
  useContext,
  useLayoutEffect,
  useState
} from 'react'
import type { EventHint, Scope, Options } from '@sentry/types'
import { SentryType, TracingOptions, SeverityLevels } from './types'

declare global {
  interface Window {
    Sentry: SentryType
  }
  interface HTMLScriptElement {
    onreadystatechange: () => void
  }
}

const SentryContext = createContext<SentryType>({
  captureMessage: window?.Sentry?.captureMessage,
  captureException: window?.Sentry?.captureException,
  configureScope: window?.Sentry?.configureScope,
  Severity: {
    Critical: 'critical',
    Debug: 'debug',
    Error: 'error',
    Fatal: 'fatal',
    Info: 'info',
    Log: 'log',
    Warning: 'warning'
  },
  withScope: window?.Sentry?.withScope,
  Integrations: {},
  setContext: window?.Sentry?.setContext,
  Scope: undefined
})

interface ContextProps {
  children: ReactElement
  url: string
  config: Options
  integrity?: string
  performance?: boolean
  tracingOptions?: TracingOptions
  scope?: boolean
}

export function SentryProvider({
  children,
  url,
  config,
  integrity,
  performance = false,
  tracingOptions
}: ContextProps) {
  const [Sentry, setSentry] = useState<SentryType>({
    captureMessage: (
      message: string,
      level?: SeverityLevels,
      hint?: EventHint,
      scope?: Scope
    ) => window?.Sentry?.captureMessage(message, level, hint, scope),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    captureException: (exception: any, hint?: EventHint, scope?: Scope) =>
      window?.Sentry?.captureException(exception, hint, scope),
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
        if (window.Sentry.Scope) {
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
