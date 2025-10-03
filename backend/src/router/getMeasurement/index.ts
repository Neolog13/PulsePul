import z from 'zod'
import { measurements } from '../../lib/measurements'
import { trpc } from '../../lib/trpc'

export const getMeasurementTrpcRoute = trpc.procedure
  .input(
    z.object({
      date: z.string(),
    })
  )
  .query(({ input }) => {
    const measurement = measurements.find((measurement) => measurement.date === input.date)
    return { measurement: measurement || null }
  })
