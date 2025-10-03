import { type FormikProps } from 'formik'
import type React from 'react'

export interface InputProps {
  name: string
  label: string
  type: 'date' | 'time' | 'number'
  formik: FormikProps<any>
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export const Input = ({ name, label, type, formik, onBlur }: InputProps) => {
  const value = formik.values[name]

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e)
    }
    formik.handleBlur(e)
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type={type}
        onChange={(e) => formik.setFieldValue(name, e.target.value)}
        onBlur={handleBlur}
        value={value}
        name={name}
        id={name}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div style={{ color: 'red' }}>{formik.errors[name] as string}</div>
      )}
    </div>
  )
}
