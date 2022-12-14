import React, { InputHTMLAttributes } from 'react'
import styles from './checkbox.module.css'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    label?: string
    name: string
    error?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, Props>(({ className, label, name, error, ...rest }, ref) => {
    return (
        <div className={className}>
            <div className="flex items-center">
                <input id={name} name={name} type="checkbox" ref={ref} className={styles.checkbox} {...rest} />

                <label htmlFor={name} className="text-sm text-body">
                    {label}
                </label>
            </div>

            {error && <p className="my-2 text-end text-xs text-red-500">{error}</p>}
        </div>
    )
})

export default Checkbox
