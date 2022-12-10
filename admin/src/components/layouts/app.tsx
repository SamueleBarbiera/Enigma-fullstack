import { SUPER_ADMIN } from '@utils/constants'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { allowedRoles, getAuthCredentials, hasAccess, isAuthenticated } from '@utils/auth-utils'
import { useEffect, useState } from 'react'
import { ROUTES } from '@utils/routes'

const AdminLayout = dynamic(() => import('@components/layouts/admin'))
const OwnerLayout = dynamic(() => import('@components/layouts/owner'))

export default function AppLayout(props: any) {
    console.log('🚀 - file: app.tsx - line 12 - AppLayout - props', props)
    const router = useRouter()
    // Authentication
    const { token, permissions } = getAuthCredentials()
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (isAuthenticated({ token, permissions }) && hasAccess(allowedRoles, permissions)) {
            setLoggedIn(true)
        } else {
            void router.replace(ROUTES.LOGIN)
        }
    }, [permissions, router, token])

    // until UseEffect handle its operation

    return (
        <>
            {!loggedIn ? null : permissions?.includes(SUPER_ADMIN) ? (
                <AdminLayout {...props} />
            ) : (
                <OwnerLayout {...props} />
            )}
        </>
    )
}
