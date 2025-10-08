import { useParams } from 'react-router-dom'
import type { ViewMeasRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { Segment } from '../../components/Segment'

export const ViewMeasPage = () => {
  const { timestamp } = useParams() as ViewMeasRouteParams

  const { data, error, isLoading, isFetching, isError } = trpc.getMeasurement.useQuery({
    timestamp,
  })

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data?.measurement) {
    return <span>Measurement not found</span>
  }

  return (
    <Segment
      title={`${data.measurement.timestamp}`}
      description={`SAP: ${data.measurement.dap} | DAP: ${data.measurement.sap} | Pulse: ${data.measurement.pulse} `}
    ></Segment>
  )
}
