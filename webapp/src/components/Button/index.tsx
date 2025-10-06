import cn from 'classnames'
import css from './index.module.scss'
import type { ReactNode } from 'react'

export const Button = ({ children, loading = false }: { children: ReactNode; loading?: boolean }) => {
  return (
    <button className={cn({ [css.button]: true, [css.disabled]: loading })} type="submit" disabled={loading}>
      {loading ? 'Submitting...' : children}
    </button>
  )
}
