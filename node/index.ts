// node/index.ts
import {
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
  method,
} from '@vtex/api'

import { Clients } from './clients'
import { pingOms } from './handlers/ping-oms'
import { getOrder } from './handlers/get-orders'

declare global {
  type Context = ServiceContext<Clients, State>

  type State = RecorderState
}

export default new Service<Clients, State, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000,
      },
    },
  },

  routes: {
    pingOms: method({
      GET: [pingOms],
    }),
    getOrder: method({
      GET: [getOrder],
    }),
  },
})
