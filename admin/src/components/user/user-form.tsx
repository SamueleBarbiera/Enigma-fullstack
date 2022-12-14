import Button from '@components/ui/button'
import Input from '@components/ui/input'
import PasswordInput from '@components/ui/password-input'
import { useForm } from 'react-hook-form'
import Card from '@components/common/card'
import Description from '@components/ui/description'
import { useCreateUserMutation } from '@data/user/use-user-create.mutation'
import { useTranslation } from 'next-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { customerValidationSchema } from './user-validation-schema'
import { Permission } from '@ts-types/generated'

type FormValues = {
    name: string
    email: string
    password: string
    permission: Permission
}

const CustomerCreateForm = () => {
    const { t } = useTranslation()
    const { mutate: registerUser, isLoading: loading } = useCreateUserMutation()

    const {
        register,
        handleSubmit,
        setError,

        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: undefined,
        resolver: yupResolver(customerValidationSchema),
    })

    function onSubmit({ name, email, password, permission }: FormValues) {
        registerUser(
            {
                variables: { permission, name, email, password },
            },
            {
                onError: (error: any) => {
                    Object.keys(error?.response?.data).forEach((field: any) => {
                        setError(field, {
                            type: 'manual',
                            message: error?.response?.data[field][0],
                        })
                    })
                },
            }
        )
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="my-5 flex flex-wrap sm:my-8">
                <Description
                    title={t('form:form-title-information')}
                    details={t('form:customer-form-info-help-text')}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <Input
                        label={t('form:input-label-name')}
                        {...register('name')}
                        type="text"
                        variant="outline"
                        className="mb-4"
                        error={t(
                            errors.name?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                        )}
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
                            errors.password?.message as
                                | string
                                | TemplateStringsArray
                                | (string | TemplateStringsArray)[]
                        )}
                        variant="outline"
                        className="mb-4"
                    />
                </Card>
            </div>

            <div className="mb-4 text-end">
                <Button loading={loading} disabled={loading}>
                    {t('form:button-label-create-customer')}
                </Button>
            </div>
        </form>
    )
}

export default CustomerCreateForm
