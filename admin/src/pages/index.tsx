import dynamic from 'next/dynamic'
import type { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { allowedRoles, getAuthCredentials, hasAccess, isAuthenticated } from '@utils/auth-utils'
import { SUPER_ADMIN } from '@utils/constants'
import { ROUTES } from '@utils/routes'
import AppLayout from '@components/layouts/app'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const AdminDashboard = dynamic(() => import('@components/dashboard/admin'))
const OwnerDashboard = dynamic(() => import('@components/dashboard/owner'))

export default function Dashboard() {
    const router = useRouter()
    const { token, permissions } = getAuthCredentials() // Authentication
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (isAuthenticated({ token, permissions }) && hasAccess(allowedRoles, permissions)) {
            setLoggedIn(true)
        } else {
            void router.replace(ROUTES.LOGIN)
        }
    }, [permissions, router, token])

    // until UseEffect handle its operation
    return <>{!loggedIn ? null : permissions?.includes(SUPER_ADMIN) ? <AdminDashboard /> : <OwnerDashboard />}</>
}

Dashboard.Layout = AppLayout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common', 'table', 'widgets'])),
        },
    }
}
