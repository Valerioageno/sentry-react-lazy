import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SentryProvider } from '../src/SentryProvider'

afterEach(cleanup)

describe('<SentryProvider />', () => {
  test('script tag is rendered', async () => {
    const sentryConfig = {
      dsn: process.env.REACT_APP_SENTRY_DSN ?? '',
      debug: true,
      environment: 'production',
      release: 'test-release',
      sampleRate: 1.0
    }

    render(
      <SentryProvider
        url="https://browser.sentry-cdn.com/6.16.1/bundle.min.js"
        integrity="sha384-WkFzsrcXKeJ3KlWNXojDiim8rplIj1RPsCbuv7dsLECoXY8C6Cx158CMgl+O+QKW"
        config={sentryConfig}
        scope
      >
        <></>
      </SentryProvider>
    )

    const script = document.querySelectorAll(`[data-testid*="sentry"]`)
    expect(script.length).toBe(1)
  })
})
