import { type FormikProps } from 'formik'
import type React from 'react'
import css from './index.module.scss'
import cn from 'classnames'

export interface InputProps {
  name: string
  label: string
  type: 'date' | 'time' | 'number'
  formik: FormikProps<any>
  maxWidth?: number
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export const Input = ({ name, label, type, formik, maxWidth, onBlur }: InputProps) => {
  const value = formik.values[name]
  const disabled = formik.isSubmitting
  const invalid = formik.errors[name]
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e)
    }
    formik.handleBlur(e)
  }

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={cn({
          [css.input]: true,
          [css.invalid]: invalid,
        })}
        style={{ maxWidth }}
        type={type}
        onChange={(e) => formik.setFieldValue(name, e.target.value)}
        onBlur={handleBlur}
        value={value}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />
      {formik.touched[name] && invalid && <div className={css.error}>{formik.errors[name] as string}</div>}
    </div>
  )
}
