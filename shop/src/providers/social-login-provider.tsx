import { useSession } from 'next-auth/client'
import { useSocialLoginMutation } from '@framework/auth/auth.query'
import { useEffect, useRef, useState } from 'react'
import { authorizationAtom } from '@store/authorization-atom'
import Cookies from 'js-cookie'
import { AUTH_TOKEN } from '@lib/constants'
import { useTranslation } from 'next-i18next'
import { useAtom } from 'jotai'

function SocialLoginProvider() {
    const [session, loading] = useSession()
    const { mutate: socialLogin } = useSocialLoginMutation({
        onSuccess: (data: { token: string | object; permissions: string | any[] }) => {
            if (data?.token && data?.permissions?.length) {
                Cookies.set(AUTH_TOKEN, data.token)
                authorize(true)
            } else {
                setErrorMessage(t('forms:error-credential-wrong'))
            }
        },
    })
    const [_, authorize] = useAtom(authorizationAtom)
    const [errorMessage, setErrorMessage] = useState('')
    const { t } = useTranslation('common')

    const [someData, setSomeData] = useState({})
    const componentMounted = useRef(true) // (3) component is mounted

    useEffect(() => {
        // is true when valid social login access token and provider is available in the session
        // but not authorize/logged in

        if (componentMounted.current) {
            if (session?.accessToken && session?.provider) {
                socialLogin({
                    provider: session?.provider as string,
                    access_token: session?.accessToken as string,
                })
            }
            return () => {
                // This code runs when component is unmounted
                componentMounted.current = false // (4) set it to false when we leave the page
            }
        }
    }, [session])

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null

    return <div>{errorMessage}</div>
}

export default SocialLoginProvider
