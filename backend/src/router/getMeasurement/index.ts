import z from 'zod'
import { trpc } from '../../lib/trpc'

export const getMeasurementTrpcRoute = trpc.procedure
  .input(
    z.object({
      timestamp: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const measurement = await ctx.prisma.measurement.findFirst({
      where: {
        timestamp: input.timestamp,
      },
    })

    return {
      measurement,
      exists: !!measurement,
    }
  })
