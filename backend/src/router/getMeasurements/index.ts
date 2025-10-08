import { trpc } from '../../lib/trpc'

export const getMeasurementsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const measurements = await ctx.prisma.measurement.findMany({
    select: {
      id: true,
      date: true,
      time: true,
      sap: true,
      dap: true,
      pulse: true,
    }
  })
  return { measurements }
})
