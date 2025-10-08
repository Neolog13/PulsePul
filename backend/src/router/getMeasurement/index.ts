import z from 'zod'
import { trpc } from '../../lib/trpc'

export const getMeasurementTrpcRoute = trpc.procedure
  .input(
    z.object({
      date: z.string(),
      time: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const measurement = await ctx.prisma.measurement.findFirst({
      where: {
        date: input.date,
        time: input.time,
      },
    })
    
    return { 
      measurement,
      exists: !!measurement
    }
  })