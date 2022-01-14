import type {
  Scope,
  EventHint,
  Options,
  TransactionContext,
  Transaction
} from '@sentry/types'

export type SeverityLevels =
  | 'debug'
  | 'info'
  | 'warning'
  | 'log'
  | 'error'
  | 'fatal'
  | 'critical'

export interface TracingOptions {
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
  routingInstrumentation<T extends Transaction>(
    customStartTransaction: (context: TransactionContext) => T | undefined,
    startTransactionOnPageLoad?: boolean,
    startTransactionOnLocationChange?: boolean
  ): void
}

export interface SentryType {
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
  withScope: (callback: () => void) => void
  Integrations: any
  // TODO: set the correct classes available
  setContext: (str: string, obj: { [k: string]: any }) => void
  Scope?: Scope & { prototype: any } & EventHint
}
