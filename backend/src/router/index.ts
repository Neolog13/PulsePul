import { trpc } from '../lib/trpc'
import { getMeassTrpcRoute } from './getMeasurements'
import { getMeasTrpcRoute } from './getMeasurement'

export const trpcRouter = trpc.router({
  getMeasurement: getMeasTrpcRoute,
  getMeasurements: getMeassTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
