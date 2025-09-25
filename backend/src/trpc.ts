import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'


const measurements = _.times(100, (i) =>({
  date: `date-and-time-${i}`,
  sap: 'number1',
  dap: 'number2',
  pulse: 'number3',
}))



const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getMeasurements: trpc.procedure.query(() => {
    return { measurements: measurements.map((measurement) => _.pick(measurement, ['date', 'sap', 'dap', 'pulse'])) }
  }),
  getMeas: trpc.procedure.input(
    z.object({
      date: z.string(),
    }),
  ).query(({ input }) => {
    const measurement = measurements.find((measurement) => measurement.date === input.date)
      return { measurement: measurement || null }
  })
})

export type TrpcRouter = typeof trpcRouter
