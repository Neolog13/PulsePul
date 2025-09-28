import { useParams } from 'react-router-dom'
import type { ViewMeasRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from '../ViewMeasPage/index.module.scss'


export const ViewMeasPage = () => {
  const { date } = useParams() as ViewMeasRouteParams

  const { data, error, isLoading, isFetching, isError } = trpc.getMeas.useQuery({
    date,
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
     <div>
      <h1 className={css.title}>{data.measurement.date}</h1>
      <div className={css.sap}>{data.measurement.sap}</div>
      <div className={css.dap}>{data.measurement.dap}</div>
      <div className={css.pulse}>{data.measurement.pulse}</div>
    </div>   



    // <div>
    //   <h1>{data.measurement.date}</h1>
    //   <div>{data.measurement.sap}</div>
    //   <div>{data.measurement.dap}</div>
    //   <div>{data.measurement.pulse}</div>
    // </div>
  )
}
