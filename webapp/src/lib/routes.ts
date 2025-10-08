const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllMeasurementsRoute = () => '/'

export const viewMeasRouteParams = getRouteParams({ timestamp: true })
export type ViewMeasRouteParams = typeof viewMeasRouteParams

export const getViewMeasRoutePath = () => '/meas/:timestamp'

export const getViewMeasRoute = ({ timestamp }: { timestamp: string }) => `meas/${timestamp}`

export const getNewMeasRoute = () => 'meas/new'
