import { useMemo } from 'react'
import Loader from '@components/ui/loader/loader'
import { useLogoutMutation } from '@data/user/use-logout.mutation'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'

function SignOut() {
    const { t } = useTranslation()
    const { mutate: logout } = useLogoutMutation()

    useMemo(() => {
        logout()
    }, [logout])

    return <Loader text={t('common:signing-out-text')} />
}

export default SignOut

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['common'])),
    },
})
