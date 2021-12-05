// TODO: Switch to enum
export type Level =
  | 'debug'
  | 'info'
  | 'warning'
  | 'log'
  | 'error'
  | 'fatal'
  | 'critical'

export interface TracingOptions {
  tracingOrigins?: string[]
  // TODO: Check the exact types beforeNavigate()
  beforeNavigate?: () => void
  shouldCreateSpanForRequest?: () => void
  idleTimeout?: number
  startTransactionOnLocationChange?: boolean
  startTransactionOnPageLoad?: boolean
  maxTransactionDuration?: boolean
  markBackgroundTransactions?: boolean
}
export interface SentryType {
  onLoad: (callback: () => void) => void
  init: (options: SentryConfigType) => void
  captureMessage: (msg: string, lv?: Level) => void
  captureException: (err: any, lv?: Level) => void
  configureScope: (callback: () => void) => void
  Severity: { [key: string]: Level }
  withScope: (callback: () => void) => void
  Integrations: any
  // TODO: set the correct classes available
}

export interface SentryConfigType {
  dsn: string
  debug: boolean
  release: string
  environment: string
  tunnel?: string
  sampleRate?: number
  maxBreadcrumbs?: number
  attachStacktrace?: string
  denyUrls?: string[]
  allowUrls?: string[]
  autoSessionTracking?: boolean
  initialScope?: { [key: string]: any }
  maxValueLength?: number
  normalizeDepth?: number
  // TODO: Integration configurations - https://docs.sentry.io/platforms/javascript/configuration/options/#integration-configuration
  integrations?: any
  defaultIntegrations?: boolean

  // TODO: Hooks - https://docs.sentry.io/platforms/javascript/configuration/options/#hooks

  // TODO: transport - https://docs.sentry.io/platforms/javascript/configuration/options/#transport-options
  tracesSampleRate?: number
  tracesSampler?: () => void
}
