const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllMeasurementsRoute = () => '/'

export const viewMeasRouteParams = getRouteParams({ date: true, time: true })
export type ViewMeasRouteParams = typeof viewMeasRouteParams

export const getViewMeasRoutePath = () => '/meas/:date/:time'

export const getViewMeasRoute = ({ date, time }: { date: string; time: string }) => `meas/${date}/${time}`

export const getNewMeasRoute = () => 'meas/new'
