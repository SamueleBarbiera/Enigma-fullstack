import cn from 'classnames'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import 'overlayscrollbars/css/OverlayScrollbars.css'

type ScrollbarProps = {
    options?: unknown
    children: React.ReactNode
    style?: React.CSSProperties
    className?: string
}

const Scrollbar = ({ options, children, style, className, ...props }: ScrollbarProps) => {
    return (
        <OverlayScrollbarsComponent
            options={{
                className: cn('os-theme-thin-dark', className),
                scrollbars: {
                    autoHide: 'scroll',
                },
            }}
            style={style}
            {...props}
        >
            {children}
        </OverlayScrollbarsComponent>
    )
}

export default Scrollbar
