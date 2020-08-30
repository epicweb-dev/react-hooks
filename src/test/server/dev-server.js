import {setupWorker} from 'msw'
import {handlers} from './server-handlers'
import {homepage} from '../../../package.json'

const fullUrl = new URL(homepage)

const server = setupWorker(...handlers)

server.start({
  quiet: true,
  serviceWorker: {
    url: fullUrl.pathname + 'mockServiceWorker.js',
  },
})

export * from 'msw'
export {server}
