import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink = ({ children, activeClassName, href, ...props }) => {
    const { pathname } = useRouter()
    const className = pathname === href ? `${''} ${activeClassName}`.trim() : ''

    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    )
}

export default ActiveLink
