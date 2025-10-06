import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createMeasurementTrpcRoute } from './createMeasurement'
import { getMeasurementTrpcRoute } from './getMeasurement'
import { getMeasurementsTrpcRoute } from './getMeasurements'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop('/')}TrpcRoute,`)
  createMeasurement: createMeasurementTrpcRoute,
  getMeasurement: getMeasurementTrpcRoute,
  getMeasurements: getMeasurementsTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
