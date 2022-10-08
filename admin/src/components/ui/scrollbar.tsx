import cn from 'classnames'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import 'overlayscrollbars/css/OverlayScrollbars.css'

type ScrollbarProps = {
    options?: unknown
    children: unknown
    style?: React.CSSProperties
    className?: string
}

const Scrollbar: React.FC<ScrollbarProps> = ({ options, children, style, className, ...props }: ScrollbarProps) => {
    return (
        <OverlayScrollbarsComponent
            options={{
                className: cn('os-theme-thin-dark', className),
                scrollbars: {
                    autoHide: 'scroll',
                },
                ...options,
            }}
            style={style}
            {...props}
        >
            {children}
        </OverlayScrollbarsComponent>
    )
}

export default Scrollbar
