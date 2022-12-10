import OwnerDashboard from '@components/dashboard/owner'
import AdminLayout from '@components/layouts/admin'
import { adminOnly } from '@utils/auth-utils'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common'])),
    },
})

export default function MyShopsPage() {
    return <OwnerDashboard />
}

MyShopsPage.authenticate = {
    permissions: adminOnly,
}

MyShopsPage.Layout = AdminLayout
