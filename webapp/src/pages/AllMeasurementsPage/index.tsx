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
          <div className={css.measurement} key={measurement.date}>
            <Segment
              size={2}
              title={
                <Link className={css.measLink} to={getViewMeasRoute({ date: measurement.date })}>
                  {measurement.date}
                </Link>
              }
            />

            <Segment size={2} title={
              <div className={css.measDescription}>
                {`${measurement.sap} ${measurement.dap} ${measurement.pulse}`}
                </div>
            }
                />
          </div>
        ))}
      </div>
    </Segment>

// {/* <Segment
//   title={data.measurements}
//   description={`SAP: ${data.measurements.} | DAP: ${data.measurements} | Pulse: ${data.measurements} `}
// ></Segment> */}



//   <h1>All measurements</h1>
    //   {data.measurements.map((measurement) => (
    //     <div key={measurement.date}>
    //       <h2>
    //         <Link to={getViewMeasRoute({ date: measurement.date })}>{measurement.date}</Link>
    //         </h2>
    //       <p>SAP: {measurement.sap}</p>
    //       <p>DAP: {measurement.dap}</p>
    //       <p>Pulse: {measurement.pulse}</p>
    //     </div>
    //   ))}
    // </div>
  )
}
