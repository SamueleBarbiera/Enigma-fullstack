import Logo from '@components/ui/logo'
import { useTranslation } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import RegistrationForm from '@components/auth/registration-form'
import { useRouter } from 'next/router'
import { getAuthCredentials, isAuthenticated } from '@utils/auth-utils'
import { ROUTES } from '@utils/routes'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common', 'form'])),
    },
})

export default function RegisterPage() {
    const router = useRouter()
    const { token, permissions } = getAuthCredentials()
    if (isAuthenticated({ token, permissions })) {
        void router.replace(ROUTES.DASHBOARD)
    }
    const { t } = useTranslation('common')
    return (
        <div className="flex h-screen items-center justify-center bg-white sm:bg-gray-100">
            <div className="m-auto w-full max-w-md rounded bg-white p-5 sm:p-8 sm:shadow">
                <div className="mb-2 flex justify-center">
                    <Logo />
                </div>
                <h3 className="mb-6 mt-4 text-center text-base italic text-gray-500">{t('admin-register-title')}</h3>
                <RegistrationForm />
            </div>
        </div>
    )
}
