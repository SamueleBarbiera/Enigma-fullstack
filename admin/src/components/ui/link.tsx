import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { ReactNode } from 'react'

const Link: React.FC<NextLinkProps & { className?: string; children: ReactNode; title?: string }> = ({
    href,
    children,
    ...props
}: NextLinkProps & { className?: string; children: ReactNode; title?: string }) => {
    return (
        <NextLink href={href}>
            <a {...props}>{children}</a>
        </NextLink>
    )
}

export default Link
