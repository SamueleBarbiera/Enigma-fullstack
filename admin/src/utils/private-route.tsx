import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { getAuthCredentials, hasAccess } from './auth-utils'
import Loader from '@components/ui/loader/loader'
import AccessDeniedPage from '@components/common/access-denied'
import { ROUTES } from './routes'

const PrivateRoute: React.FC<{ children: any; authProps: any }> = ({ children, authProps }) => {
    const router = useRouter()
    const { token, permissions } = getAuthCredentials()
    const isUser = !!token
    useMemo(() => {
        if (!isUser) void router.replace(ROUTES.LOGIN) // If not authenticated, force log in
    }, [isUser, router])
    const hasPermission =
        Array.isArray(permissions) && !!permissions.length && hasAccess(authProps.permissions, permissions)

    return (
        <>
            {isUser && hasPermission ? (
                <>{children}</>
            ) : isUser && !hasPermission ? (
                <AccessDeniedPage />
            ) : (
                // Session is being fetched, or no user. If no user, useMemo() will redirect.
                <Loader showText={false} />
            )}
        </>
    )
}

export default PrivateRoute
