import Container from '@components/ui/container'
import { getLayout } from '@components/layout/layout'

import LoginForm from '@components/auth/login-form'
import PageHeader from '@components/ui/page-header'
import { useRouter } from 'next/router'
import { ROUTES } from '@lib/routes'
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { authorizationAtom } from '@store/authorization-atom'
import PageLoader from '@components/ui/page-loader/page-loader'

export { getStaticProps } from '@framework/ssr/common'

export default function SignInPage() {
    const router = useRouter()
    const [isAuthorized] = useAtom(authorizationAtom)

    useEffect(() => {
        ;(async () => {
            if (isAuthorized) {
                return router.push(ROUTES.ACCOUNT)
            }
        })()
    }, [isAuthorized])

    if (isAuthorized) return <PageLoader />

    return (
        <>
            <PageHeader pageHeader="Sign In" />
            <Container>
                <div className="py-16 lg:py-20">
                    <LoginForm layout="page" />
                </div>
            </Container>
        </>
    )
}

SignInPage.getLayout = getLayout
