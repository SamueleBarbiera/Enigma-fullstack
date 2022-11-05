import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink = ({ children, activeClassName, href, ...props }) => {
    console.log(
        '🚀 - file: active-link.tsx - line 6 - ActiveLink - children, activeClassName, href, ...props',
        children,
        ',',
        activeClassName,
        ',',
        href,
        ',',
        props
    )
    const { pathname } = useRouter()
    // const child = Children.only(children)
    // const childClassName = children.props.className ?? ''

    const className = pathname === href ? `${''} ${activeClassName}`.trim() : ''

    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    )
}

export default ActiveLink
