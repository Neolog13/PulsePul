import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { useFormik } from 'formik'
import { trpc } from '../../lib/trpc'
import { zCreateMeasurementTrpcInput } from '@lena/backend/src/router/createMeasurement/input'
import { useState } from 'react'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'

interface MeasurementFormValues {
  date: string
  time: string
  sap: string
  dap: string
  pulse: string
}

const validateWithZod = (values: MeasurementFormValues) => {
  const result = zCreateMeasurementTrpcInput.safeParse(values)

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
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)

  const createMeasurement = trpc.createMeasurement.useMutation()

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
    onSubmit: async (values) => {
      try {
        await createMeasurement.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => setSuccessMessageVisible(false), 3000)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occured'
        setSubmittingError(message)
        setTimeout(() => setSubmittingError(null), 3000)
      }
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
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit(e)
        }}
      >
        <Input name="date" label="Date" type="date" formik={formik} />
        <Input name="time" label="Time" type="time" formik={formik} />
        <Input name="sap" label="SAP" type="number" formik={formik} onBlur={handleBlur} />
        <Input name="dap" label="DAP" type="number" formik={formik} onBlur={handleBlur} />
        <Input name="pulse" label="Pulse" type="number" formik={formik} onBlur={handleBlur} />
        {!!submittingError && <Alert color="red">{submittingError}</Alert>}
        {successMessageVisible && <Alert color="green">Measurement created successfully!</Alert>}
        {/* <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create measurement'}
        </button> */}
        <Button loading={formik.isSubmitting}>Create measurement</Button>
      </form>
    </Segment>
  )
}
