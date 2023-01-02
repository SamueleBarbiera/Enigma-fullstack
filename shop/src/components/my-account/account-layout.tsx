import PageHeader from '@components/ui/page-header'
import Container from '@components/ui/container'
import AccountNav from '@components/my-account/account-nav'
import AccountNavMobile from '@components/my-account/account-nav-mobile'

import { ROUTES } from '@lib/routes'

import { IoHomeOutline } from '@react-icons/all-files/io5/IoHomeOutline'
import { IoCartOutline } from '@react-icons/all-files/io5/IoCartOutline'
import { IoPersonOutline } from '@react-icons/all-files/io5/IoPersonOutline'
import { IoCallOutline } from '@react-icons/all-files/io5/IoCallOutline'
import { IoSettingsOutline } from '@react-icons/all-files/io5/IoSettingsOutline'
import { ReactNode } from 'react'

const accountMenu = [
    {
        slug: ROUTES.ACCOUNT,
        name: 'text-dashboard',
        icon: <IoHomeOutline className="h-[18px] w-[18px] md:h-5 md:w-5" />,
    },
    {
        slug: ROUTES.ACCOUNT_ORDERS,
        name: 'text-orders',
        icon: <IoCartOutline className="h-[18px] w-[18px] md:h-5 md:w-5" />,
    },
    {
        slug: ROUTES.ACCOUNT_ADDRESS,
        name: 'text-account-address',
        icon: <IoPersonOutline className="h-[18px] w-[18px] md:h-5 md:w-5" />,
    },
    {
        slug: ROUTES.ACCOUNT_CONTACT_NUMBER,
        name: 'text-contact-number',
        icon: <IoCallOutline className="h-[18px] w-[18px] md:h-5 md:w-5" />,
    },
    {
        slug: ROUTES.ACCOUNT_CHANGE_PASSWORD,
        name: 'text-change-password',
        icon: <IoSettingsOutline className="h-[18px] w-[18px] md:h-5 md:w-5" />,
    },
]

type Props = {
    children: ReactNode
}

const AccountLayout = ({ children }: Props) => {
    return (
        <>
            <PageHeader pageHeader="text-page-my-account" />
            <Container>
                <div className="mx-auto flex w-full py-16 px-0 md:flex-row  lg:py-20 xl:max-w-screen-xl">
                    <div className="flex w-full flex-col lg:flex-row">
                        <div className="lg:hidden">
                            <AccountNavMobile options={accountMenu} />
                        </div>
                        <div className="hidden flex-shrink-0 pb-2 md:w-2/6 md:pb-0 ltr:md:pr-8 rtl:md:pl-8 lg:block ltr:lg:pr-12 rtl:lg:pl-12 ltr:xl:pr-16 rtl:xl:pl-16 2xl:w-4/12 ltr:2xl:pr-20 rtl:2xl:pl-20">
                            <AccountNav options={accountMenu} />
                        </div>
                        <div className="mt-6 lg:mt-0 lg:w-4/6 2xl:w-8/12">{children}</div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AccountLayout
