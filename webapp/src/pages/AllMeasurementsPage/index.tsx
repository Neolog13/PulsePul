import { getViewMeasRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { Link } from 'react-router-dom'
import css from './index.module.scss'
import { Segment } from '../../components/Segment'

export const AllMeasurementsPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getMeasurements.useQuery()
  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data) {
    return <span>No data available</span>
  }

  return (
    <Segment title="All measurements">
      <div className={css.measurements}>
        {data.measurements.map((measurement) => (
          <div className={css.measurement} key={`${measurement.timestamp}`}>
            <Segment
              size={2}
              title={
                <Link className={css.measLink} to={getViewMeasRoute({ timestamp: measurement.timestamp })}>
                  {`${measurement.timestamp}`}
                </Link>
              }
            />

            <Segment
              size={2}
              title={
                <div className={css.measDescription}>
                  {`${measurement.sap} ${measurement.dap} ${measurement.pulse}`}
                </div>
              }
            />
          </div>
        ))}
      </div>
    </Segment>
  )
}
