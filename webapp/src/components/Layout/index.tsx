import { Link, Outlet } from 'react-router-dom'
import { getAllMeasurementsRoute, getNewMeasRoute } from '../../lib/routes'
import css from './index.module.scss'

export const Layout = () => {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>Measurements</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getAllMeasurementsRoute()}>
              All measurements
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getNewMeasRoute()}>
              Add measurement
            </Link>
          </li>
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}

//     <div>
//       <p>
//         <b className={css.logo}>Measurements</b>
//       </p>
//       <ul>
//         <li>
//           <Link className={css.link} to={getAllMeasurementsRoute()}>All measurements</Link>
//         </li>
//       </ul>
//       <hr />
//       <div>
//         <Outlet />
//       </div>
//     </div>
//   )
// }
