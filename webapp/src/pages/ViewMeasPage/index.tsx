import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import type { ViewMeasRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { Segment } from '../../components/Segment'
import css from './index.module.scss'

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
    <Segment title={`Measurement`}>
      <div className={css.timestamp}>Date of measurement: {format(data.measurement.timestamp, 'yyy-MM-dd HH:mm')}</div>
      <div className={css.text}>SAP: {data.measurement.dap} | DAP: {data.measurement.sap} | Pulse: {data.measurement.pulse}</div>
    </Segment>
  )
}
