import { TRPCError } from '@trpc/server'
import { measurements } from '../../lib/measurements'
import { trpc } from '../../lib/trpc'
import { zCreateMeasurementTrpcInput } from './input'

export const createMeasurementTrpcRoute = trpc.procedure.input(zCreateMeasurementTrpcInput).mutation(({ input }) => {
  const existingMeasurement = measurements.find((m) => m.date === input.date && m.time === input.time)

  if (existingMeasurement) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: `Measurement for ${input.date} at ${input.time} already exists`,
    })
  }

  const newMeasurement = {
    date: input.date,
    time: input.time,
    sap: input.sap,
    dap: input.dap,
    pulse: input.pulse,
  }

  measurements.unshift(newMeasurement)

  measurements.sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date)
    return dateCompare !== 0 ? dateCompare : b.time.localeCompare(a.time)
  })

  return {
    success: true,
    measurement: newMeasurement,
  }
})
