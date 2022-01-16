import type {
  Scope,
  EventHint,
  Options,
  TransactionContext,
  Transaction,
  User
} from '@sentry/types'

export type ContextProps = {
  children: JSX.Element
  url: string
  config: Options
  integrity?: string
  performance?: boolean
  tracingOptions?: TracingOptions
  scope?: boolean
}

export type SeverityLevels =
  | 'debug'
  | 'info'
  | 'warning'
  | 'log'
  | 'error'
  | 'fatal'
  | 'critical'

export type TracingOptions = {
  tracingOrigins?: string[]
  beforeNavigate?: (
    context: TransactionContext
  ) => TransactionContext | undefined
  _metricOptions?: Partial<{ _reportAllChanges: boolean }>
  shouldCreateSpanForRequest?: () => void
  idleTimeout?: number
  startTransactionOnLocationChange?: boolean
  startTransactionOnPageLoad?: boolean
  maxTransactionDuration?: number
  markBackgroundTransactions?: boolean
  routingInstrumentation?: <T extends Transaction>(
    customStartTransaction: (context: TransactionContext) => T | undefined,
    startTransactionOnPageLoad?: boolean,
    startTransactionOnLocationChange?: boolean
  ) => void
}

export type SentryType = {
  onLoad?: (callback: () => void) => void
  init?: (options: Options) => void
  captureMessage: (
    message: string,
    level?: SeverityLevels,
    hint?: EventHint,
    scope?: Scope
  ) => string | undefined
  captureException: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exception: any,
    hint?: EventHint,
    scope?: Scope
  ) => string | undefined
  configureScope: (callback: () => void) => void
  Severity: { [key: string]: SeverityLevels }
  withScope: (callback: (scope: Scope) => void) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Integrations: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setContext: (name: string, context: { [key: string]: any } | null) => void
  setUser: (user: User) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Scope?: Scope & { prototype: any } & EventHint
}
