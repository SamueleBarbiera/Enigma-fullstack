import Link from '@components/ui/link'
import { getLayout } from '@components/layout/layout'
import AccountLayout from '@components/my-account/account-layout'
import { ROUTES } from '@lib/routes'
import { useTranslation } from 'next-i18next'
import useUser from '@framework/auth/use-user'

export { getStaticProps } from '@framework/ssr/common'

export default function AccountPage() {
    const { t } = useTranslation('common')
    const { me } = useUser()

    const currentUserIdentity = me?.name ?? me?.email

    return (
        <AccountLayout>
            <>
                {' '}
                <h2 className="mb-3 text-lg font-bold text-heading md:text-xl xl:mb-5 xl:text-2xl">
                    {t('text-dashboard')}
                </h2>
                <div className="text-sm leading-7 md:text-base md:leading-loose">
                    <p className="capitalize">
                        {t('text-hello')} <span className="font-bold">{currentUserIdentity}</span> (not{' '}
                        <span className="font-bold">{currentUserIdentity}</span>?{' '}
                        <Link
                            href={`${ROUTES.LOGOUT}`}
                            className="cursor-pointer font-bold underline focus:outline-none"
                        >
                            {t('text-logout')}
                        </Link>
                        )
                    </p>
                    <br />
                    {t('text-account-dashboard')}{' '}
                    <Link href={ROUTES.ACCOUNT_ORDERS} className="font-semibold text-heading underline">
                        {t('text-recent-orders')}
                    </Link>
                    , {t('text-manage-your')}{' '}
                    <Link href={ROUTES.ACCOUNT_ADDRESS} className="font-semibold text-heading underline">
                        {t('text-account-address')}
                    </Link>{' '}
                    {t('text-and')}{' '}
                    <Link href={ROUTES.ACCOUNT_CONTACT_NUMBER} className="font-semibold text-heading underline">
                        {t('text-contact-number')}
                    </Link>{' '}
                    {t('text-and')}{' '}
                    <Link href={ROUTES.ACCOUNT_CHANGE_PASSWORD} className="font-semibold text-heading underline">
                        {t('text-change-your-password')}
                    </Link>
                </div>
            </>
        </AccountLayout>
    )
}

AccountPage.authenticate = true
AccountPage.getLayout = getLayout
