import React from 'react'
import ReactSelect, { Props } from 'react-select'
import { selectStyles } from './select.styles'

export const Select = React.forwardRef<Props, any>((props, ref) => (
    <ReactSelect styles={selectStyles} {...props} innerRef={ref} />
))
export default Select
