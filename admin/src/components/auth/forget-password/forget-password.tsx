import React, { useState } from 'react'
import Alert from '../../../components/ui/alert'
import { useForgetPasswordMutation } from '@data/user/use-forget-password.mutation'
import { useVerifyForgetPasswordTokenMutation } from '@data/user/use-verify-forget-password-token.mutation'
import { useResetPasswordMutation } from '@data/user/use-reset-password.mutation'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import { useTranslation } from 'next-i18next'
const EnterEmailView = dynamic(() => import('./enter-email-view'))
const EnterTokenView = dynamic(() => import('./enter-token-view'))
const EnterNewPasswordView = dynamic(() => import('./enter-new-password-view'))
import Link from '@components/ui/link'

const ForgotPassword: React.FC = () => {
    const { t } = useTranslation()
    const { mutate: forgetPassword, isLoading } = useForgetPasswordMutation()
    const { mutate: verifyToken, isLoading: verifying } = useVerifyForgetPasswordTokenMutation()
    const { mutate: resetPassword, isLoading: resetting } = useResetPasswordMutation()
    const [errorMsg, setErrorMsg] = useState<string | null | undefined>('')
    const [verifiedEmail, setVerifiedEmail] = useState('')
    const [verifiedToken, setVerifiedToken] = useState('')

    function handleEmailSubmit({ email }: { email: string }) {
        forgetPassword(
            {
                variables: {
                    input: {
                        email,
                    },
                },
            },
            {
                onSuccess: ({ data }) => {
                    if (data?.data) {
                        setVerifiedEmail(email)
                    } else {
                        setErrorMsg(data?.profile?.id)
                    }
                },
            }
        )
    }
    function handleTokenSubmit({ token }: { token: string }) {
        verifyToken(
            {
                variables: {
                    input: {
                        email: verifiedEmail,
                        token,
                    },
                },
            },
            {
                onSuccess: ({ data }) => {
                    if (data?.data) {
                        setVerifiedToken(token)
                    } else {
                        setErrorMsg(data?.name)
                    }
                },
            }
        )
    }
    function handleResetPassword({ password }: { password: string }) {
        resetPassword(
            {
                variables: {
                    input: {
                        email: verifiedEmail,
                        token: verifiedToken,
                        password,
                    },
                },
            },
            {
                onSuccess: ({ data }) => {
                    if (data?.data) {
                        Router.push('/')
                    } else {
                        setErrorMsg(data?.name)
                    }
                },
            }
        )
    }

    return (
        <>
            {errorMsg && (
                <Alert
                    variant="error"
                    message={t(`common:${errorMsg}`)}
                    className="mb-6"
                    closeable={true}
                    onClose={() => setErrorMsg('')}
                />
            )}
            {!verifiedEmail && <EnterEmailView loading={isLoading} onSubmit={handleEmailSubmit} />}
            {verifiedEmail && !verifiedToken && <EnterTokenView loading={verifying} onSubmit={handleTokenSubmit} />}
            {verifiedEmail && verifiedToken && (
                <EnterNewPasswordView loading={resetting} onSubmit={handleResetPassword} />
            )}
            <div className="relative mt-8 mb-6 flex flex-col items-center justify-center text-sm text-heading sm:mt-11 sm:mb-8">
                <hr className="w-full" />
                <span className="absolute -top-2.5 bg-light px-2 -ms-4 start-2/4">{t('common:text-or')}</span>
            </div>

            <div className="text-center text-sm text-body sm:text-base">
                {t('form:text-back-to')}{' '}
                <Link
                    href="/login"
                    className="font-semibold text-accent underline transition-colors duration-200 ms-1 hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-none"
                >
                    {t('form:link-login')}
                </Link>
            </div>
        </>
    )
}

export default ForgotPassword
