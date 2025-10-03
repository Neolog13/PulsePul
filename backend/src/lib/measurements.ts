import _ from 'lodash'

export const measurements = _.times(100, (i) => ({
  date: `date-and-time-${i}`,
  sap: 'number1',
  dap: 'number2',
  pulse: 'number3',
}))
