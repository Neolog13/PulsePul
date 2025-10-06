import z from 'zod'

export const zCreateMeasurementTrpcInput = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  sap: z
    .string()
    .min(1, 'SAP is required')
    .regex(/^\d+$/, 'SAP must be a whole number')
    .refine((val) => {
      const normalizedValue = val.replace(/^0+(\d+)$/, '$1') || '0'
      const numericValue = Number(normalizedValue)
      return numericValue > 0
    }, 'SAP must be greater than 0')
    .refine((val) => {
      const normalizedValue = val.replace(/^0+(\d+)$/, '$1') || '0'
      const numericValue = Number(normalizedValue)
      return String(numericValue).length >= 2
    }, 'SAP must be at least 2 digits')
    .refine((val) => {
      const normalizedValue = val.replace(/^0+(\d+)$/, '$1') || '0'
      const numericValue = Number(normalizedValue)
      return numericValue >= 20 && numericValue <= 300
    }, 'SAP must be between 20 and 300'),
  // .transform((val) => {
  //   const normalizedValue = val.replace(/^0+(\d+)$/, '$1') || '0'
  //   return Number(normalizedValue)
  // }),
  dap: z
    .string()
    .min(1, 'DAP is required')
    .regex(/^\d+$/, 'DAP must be a whole number')
    .refine((val) => {
      const normalizedValue = val.replace(/^0+(\d+)$/, '$1') || '0'
      const numericValue = Number(normalizedValue)
      return numericValue > 0
    }, 'DAP must be greater than 0')
    .refine((val) => {
      const normalizedValue = val.replace(/^0+(\d+)$/, '$1') || '0'
      const numericValue = Number(normalizedValue)
      return String(numericValue).length >= 2
    }, 'DAP must be at least 2 digits')
    .refine((val) => {
      const normalizedValue = val.replace(/^0+(\d+)$/, '$1') || '0'
      const numericValue = Number(normalizedValue)
      return numericValue >= 30 && numericValue <= 150
    }, 'DAP must be between 30 and 150'),
  // .transform((val) => {
  //   const normalizedValue = val.replace(/^0+(\d+)$/, '$1') || '0'
  //   return Number(normalizedValue)
  // }),
  pulse: z
    .string()
    .min(1, 'Pulse is required')
    .regex(/^\d+$/, 'Pulse must be a whole number')
    .refine((val) => {
      const normalizedValue = val.replace(/^0+(\d+)$/, '$1') || '0'
      const numericValue = Number(normalizedValue)
      return numericValue > 0
    }, 'Pulse must be greater than 0')
    .refine((val) => {
      const normalizedValue = val.replace(/^0+(\d+)$/, '$1') || '0'
      const numericValue = Number(normalizedValue)
      return String(numericValue).length >= 2
    }, 'Pulse must be at least 2 digits')
    .refine((val) => {
      const normalizedValue = val.replace(/^0+(\d+)$/, '$1') || '0'
      const numericValue = Number(normalizedValue)
      return numericValue >= 30 && numericValue <= 300
    }, 'Pulse must be between 30 and 300'),
  // .transform((val) => {
  //   const normalizedValue = val.replace(/^0+(\d+)$/, '$1') || '0'
  //   return Number(normalizedValue)
  // }),
})
