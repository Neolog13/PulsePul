import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { useFormik } from 'formik'
import { z } from 'zod'

interface MeasurementFormValues {
  date: string
  time: string
  sap: string
  dap: string
  pulse: string
}

const measurementSchema = z.object({
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
})

const validateWithZod = (values: MeasurementFormValues) => {
  const result = measurementSchema.safeParse(values)

  if (!result.success) {
    const errors: Record<string, string> = {}

    for (const issue of result.error.issues) {
      const path = issue.path[0] as string
      if (path && !errors[path]) {
        errors[path] = issue.message
      }
    }

    return errors
  }

  return {}
}

export const NewMeasPage = () => {
  const formik = useFormik<MeasurementFormValues>({
    initialValues: {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      sap: '',
      dap: '',
      pulse: '',
    },
    validate: validateWithZod,
    onSubmit: (values) => {
      console.log('Submitted', values)
    },
  })

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'sap' || name === 'dap' || name === 'pulse') {
      const normalizedValue = value.replace(/^0+(\d+)$/, '$1') || (value === '' ? '' : '0')

      if (normalizedValue !== value) {
        formik.setFieldValue(name, normalizedValue)
      }
    }

    formik.handleBlur(e)
  }

  return (
    <Segment title="New Measurement">
      <form onSubmit={formik.handleSubmit}>
        <Input name="date" label="Date" type="date" formik={formik} />
        <Input name="time" label="Time" type="time" formik={formik} />
        <Input name="sap" label="SAP" type="number" formik={formik} onBlur={handleBlur} />
        <Input name="dap" label="DAP" type="number" formik={formik} onBlur={handleBlur} />
        <Input name="pulse" label="Pulse" type="number" formik={formik} onBlur={handleBlur} />
        <button type="submit">Create measurement</button>
      </form>
    </Segment>
  )
}
