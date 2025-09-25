const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllMeasurementsRoute = () => '/'

export const viewMeasRouteParams = getRouteParams({ date: true })
export type ViewMeasRouteParams = typeof viewMeasRouteParams
export const getViewMeasRoute = ({ date }: { date: string }) => `/meas/${date}`

// export const viewMeasRouteParams = {date: ':date'}
// export type ViewMeasRouteParams = {date: string}
// export const getViewMeasRoute = ({ date }: { date: string }) => `/meas/${date}`
