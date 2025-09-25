import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from './lib/trpc'
import { AllMeasurementsPage } from './pages/AllMeasurementsPage'
import * as routes from './lib/routes'
import { ViewMeasPage } from './pages/ViewMeasPage'
import { Layout } from './components/Layout'
import './styles/global.scss'
import { NewMeasPage } from './pages/newMeasurement'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllMeasurementsRoute()} element={<AllMeasurementsPage />} />
            <Route path={routes.getNewMeasRoute()} element={<NewMeasPage />} />
            <Route path={routes.getViewMeasRoute(routes.viewMeasRouteParams)} element={<ViewMeasPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
