import Alert from '@components/ui/alert'
import Button from '@components/ui/button'
import Input from '@components/ui/input'
import PasswordInput from '@components/ui/password-input'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ROUTES } from '@utils/routes'
import { useTranslation } from 'next-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Link from '@components/ui/link'
import { allowedRoles, hasAccess, setAuthCredentials } from '@utils/auth-utils'
import { Permission } from '@ts-types/generated'
import { useRegisterMutation } from '@data/user/use-register.mutation'

interface FormValues {
    name: string
    email: string
    password: string
    permission: Permission
}
const registrationFormSchema = yup.object().shape({
    name: yup.string().required('form:error-name-required'),
    email: yup.string().email('form:error-email-format').required('form:error-email-required'),
    password: yup.string().required('form:error-password-required'),
    permission: yup.string().default('store_owner').oneOf(['store_owner']),
})
const RegistrationForm = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { mutate: registerUser, isLoading: loading } = useRegisterMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormValues>({
        resolver: yupResolver(registrationFormSchema),
        defaultValues: {
            permission: Permission.StoreOwner,
        },
    })
    const router = useRouter()
    const { t } = useTranslation()

    async function onSubmit({ name, email, password, permission }: FormValues) {
        registerUser(
            {
                variables: {
                    name,
                    email,
                    password,
                    permission,
                },
            },

            {
                onSuccess: ({ data }) => {
                    if (data?.token) {
                        if (hasAccess(allowedRoles, data?.permissions)) {
                            setAuthCredentials(data?.token, data?.permissions)
                            void router.push(ROUTES.DASHBOARD)
                            return
                        }
                        setErrorMessage('form:error-enough-permission')
                    } else {
                        setErrorMessage('form:error-credential-wrong')
                    }
                },
                onError: (error) => {
                    Object.keys(error?.response?.data).forEach((field) => {
                        setError(field, {
                            type: 'manual',
                            message: error?.response?.data[field],
                        })
                    })
                },
            }
        )
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Input
                    label={t('form:input-label-name')}
                    {...register('name')}
                    variant="outline"
                    className="mb-4"
                    error={t(errors.name?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[])}
                />
                <Input
                    label={t('form:input-label-email')}
                    {...register('email')}
                    type="email"
                    variant="outline"
                    className="mb-4"
                    error={t(
                        errors.email?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                    )}
                />
                <PasswordInput
                    label={t('form:input-label-password')}
                    {...register('password')}
                    error={t(
                        errors.password?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                    )}
                    variant="outline"
                    className="mb-4"
                />
                <Button className="w-full" loading={loading} disabled={loading}>
                    {t('form:text-register')}
                </Button>

                {errorMessage ? (
                    <Alert
                        message={t(errorMessage)}
                        variant="error"
                        closeable={true}
                        className="mt-5"
                        onClose={() => setErrorMessage(null)}
                    />
                ) : null}
            </form>
            <div className="relative mt-8 mb-6 flex flex-col items-center justify-center text-sm text-heading sm:mt-11 sm:mb-8">
                <hr className="w-full" />
                <span className="absolute -top-2.5 bg-light px-2 -ms-4 start-2/4">{t('common:text-or')}</span>
            </div>
            <div className="text-center text-sm text-body sm:text-base">
                {t('form:text-already-account')}{' '}
                <Link
                    href={ROUTES.LOGIN}
                    className="font-semibold text-accent underline transition-colors duration-200 ms-1 hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-none"
                >
                    {t('form:button-label-login')}
                </Link>
            </div>
        </>
    )
}

export default RegistrationForm
