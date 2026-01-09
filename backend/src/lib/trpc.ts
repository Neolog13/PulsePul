import { initTRPC } from '@trpc/server'
import { type Express } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import type { TrpcRouter } from '../router'
import superjson from 'superjson'
import type { AppContext } from './ctx'

export const trpc = initTRPC.context<AppContext>().create({
  transformer: superjson,
})

export const applyTrpcToExpressApp = (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  )
}
