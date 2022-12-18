import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

import { render } from 'react-dom'

import '../css/app.css'
import './bootstrap'

const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'
const stripePromise = loadStripe('pk_test_Jp3kv7BJibBz4ANCtbTISq6q00V7NZXMcQ')

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      // @ts-ignore
      import.meta.glob('./Pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    render(
      <Elements stripe={stripePromise}>
        <App {...props} />
      </Elements>,
      el
    )
  },
})

InertiaProgress.init({ color: '#4B5563' })
