import _ from 'lodash'
import { measurements } from '../../lib/measurements'
import { trpc } from '../../lib/trpc'

export const getMeasurementsTrpcRoute = trpc.procedure.query(() => {
  return { measurements: measurements.map((measurement) => _.pick(measurement, ['date', 'sap', 'dap', 'pulse'])) }
})
