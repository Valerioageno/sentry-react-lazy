import { createContext, useContext, useLayoutEffect } from 'react'
import { noop } from './helpers'
import type { SentryType, Level, SentryConfigType } from './types'

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
  withScope: noop
})

interface ContextProps {
  children: JSX.Element
  url: string
  config: SentryConfigType
  integrity?: string
}

export function SentryProvider({
  children,
  url,
  config,
  integrity
}: ContextProps): JSX.Element {
  const Sentry: SentryType = {
    onLoad: (callback: () => void) => window?.Sentry.onLoad(callback),
    init: (options: SentryConfigType) => window?.Sentry.init(options),
    captureMessage: (msg: string, lv?: Level) =>
      window?.Sentry.captureMessage(msg, lv ?? 'warning'),
    captureException: (err: any, lv?: Level) =>
      window?.Sentry.captureException(err, lv ?? 'warning'),
    Severity: {
      Critical: 'critical',
      Debug: 'debug',
      Error: 'error',
      Fatal: 'fatal',
      Info: 'info',
      Log: 'log',
      Warning: 'warning'
    },
    configureScope: (callback: () => void) =>
      window?.Sentry.configureScope(callback),
    withScope: (callback: () => void) => window?.Sentry.withScope(callback)
  }

  useLayoutEffect(() => {
    const script: HTMLScriptElement = document.createElement('script')
    script.src = url
    script.crossOrigin = 'anonymous'
    const head = document.getElementsByTagName('head')[0]
    let done = false
    script.onload = checkLoadingAndRun
    script.onreadystatechange = checkLoadingAndRun
    if (integrity) script.integrity = integrity

    function checkLoadingAndRun(this: any) {
      if (
        !done &&
        (!this.readyState ||
          this.readyState === 'loaded' ||
          this.readyState === 'complete')
      ) {
        done = true
        Sentry.onLoad(() => Sentry.init(config))
      }
    }

    head.appendChild(script)
  }, [])

  return (
    <SentryContext.Provider value={Sentry}>{children}</SentryContext.Provider>
  )
}

export function useSentry(): SentryType {
  return useContext<SentryType>(SentryContext)
}
