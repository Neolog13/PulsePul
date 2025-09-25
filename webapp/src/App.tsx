import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from './lib/trpc'
import { AllMeasurementsPage } from './pages/AllMeasurementsPage'
import { getAllMeasurementsRoute, getViewMeasRoute, viewMeasRouteParams } from './lib/routes'
import { ViewMeasPage } from './pages/ViewMeasPage'
import { Layout } from './components/Layout'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={getAllMeasurementsRoute()} element={<AllMeasurementsPage />} />
          <Route path={getViewMeasRoute(viewMeasRouteParams)} element={<ViewMeasPage />} />"
        </Route>
      </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
