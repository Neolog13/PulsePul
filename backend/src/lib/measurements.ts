import _ from 'lodash'

export const measurements = _.times(100, (i) => {
  const date = new Date()
  date.setDate(date.getDate() - i) // Каждое измерение на день раньше
  
  return {
    date: date.toISOString().split('T')[0],
    time: `${_.random(8, 20).toString().padStart(2, '0')}:${_.random(0, 59).toString().padStart(2, '0')}`,
    sap: _.random(100, 180).toString(),
    dap: _.random(60, 100).toString(), 
    pulse: _.random(60, 100).toString(),
  }
})