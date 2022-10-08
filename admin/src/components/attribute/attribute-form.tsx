import Input from '@components/ui/input'
import { useFieldArray, useForm } from 'react-hook-form'
import Button from '@components/ui/button'
import Description from '@components/ui/description'
import Card from '@components/common/card'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Attribute, AttributeValueInput } from '@ts-types/generated'
import { useShopQuery } from '@data/shop/use-shop.query'
import { useCreateAttributeMutation } from '@data/attributes/use-attribute-create.mutation'
import { useUpdateAttributeMutation } from '@data/attributes/use-attribute-update.mutation'
import { useState } from 'react'
import Alert from '@components/ui/alert'
import { animateScroll } from 'react-scroll'
import { attributeValidationSchema } from '@components/attribute/attribute-validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'

interface FormValues {
    name?: string | null
    values: AttributeValueInput
}

interface IProps {
    initialValues?: Attribute | null
}
export default function CreateOrUpdateAttributeForm({ initialValues }: IProps) {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string>('')

    const {
        query: { shop },
    } = router
    const { t } = useTranslation()
    const { data: shopData } = useShopQuery(shop as string, { enabled: !!shop })
    const shopId = shopData?.shop.id
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: initialValues ? initialValues : { name: '', values: [] },
        resolver: yupResolver(attributeValidationSchema),
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'values' as never,
    })

    const { mutate: createAttribute, isLoading: creating } = useCreateAttributeMutation()
    const { mutate: updateAttribute, isLoading: updating } = useUpdateAttributeMutation()
    const onSubmit = (values: FormValues) => {
        if (!initialValues) {
            createAttribute(
                {
                    variables: {
                        input: {
                            name: values.name ?? '',
                            shop_id: Number(shopId),
                            values: values.values,
                        },
                    },
                },
                {
                    onError: (error) => {
                        setErrorMessage(error?.toString() ?? '')
                        animateScroll.scrollToTop()
                    },
                }
            )
        } else {
            updateAttribute({
                variables: {
                    id: initialValues.id,
                    input: {
                        name: values.name ?? '',
                        shop_id: Number(initialValues.shop_id),
                        values: values.values.map(({ id, value, meta }: AttributeValueInput) => ({
                            id: Number(id),
                            value,
                            meta,
                        })),
                    },
                },
            })
        }
    }
    return (
        <>
            {errorMessage ? (
                <Alert
                    message={t(`common:${errorMessage}`)}
                    variant="error"
                    closeable={true}
                    className="mt-5"
                    onClose={() => setErrorMessage('')}
                />
            ) : null}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                    <Description
                        title={t('common:attribute')}
                        details={`${
                            initialValues ? t('form:item-description-update') : t('form:item-description-add')
                        } ${t('form:form-description-attribute-name')}`}
                        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                    />

                    <Card className="w-full sm:w-8/12 md:w-2/3">
                        <Input
                            label={t('form:input-label-name')}
                            {...register('name')}
                            error={t(
                                errors.name?.message as
                                    | string
                                    | TemplateStringsArray
                                    | (string | TemplateStringsArray)[]
                            )}
                            variant="outline"
                            className="mb-5"
                        />
                    </Card>
                </div>

                <div className="my-5 flex flex-wrap sm:my-8">
                    <Description
                        title={t('common:attribute-values')}
                        details={`${
                            initialValues ? t('form:item-description-update') : t('form:item-description-add')
                        } ${t('form:form-description-attribute-value')}`}
                        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                    />

                    <Card className="w-full sm:w-8/12 md:w-2/3">
                        <div>
                            {fields.map((item, index) => (
                                <div
                                    className="border-b border-dashed border-border-200 py-5 last:border-0 md:py-8"
                                    key={item.id}
                                >
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
                                        <Input
                                            className="sm:col-span-2"
                                            label={t('form:input-label-value-star')}
                                            variant="outline"
                                            {...register(`values.value`)}
                                            defaultValue={item.id} // make sure to set up defaultValue
                                            error={t(errors.values?.value?.message ?? '')}
                                        />
                                        <Input
                                            className="sm:col-span-2"
                                            label={t('form:input-label-meta')}
                                            variant="outline"
                                            {...register(`values.meta`)}
                                            defaultValue={item.id} // make sure to set up defaultValue
                                        />
                                        <button
                                            onClick={() => remove(index)}
                                            type="button"
                                            className="text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none sm:col-span-1 sm:mt-4"
                                        >
                                            {t('form:button-label-remove')}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            type="button"
                            onClick={() => append({ value: '', meta: '' })}
                            className="w-full sm:w-auto"
                        >
                            {t('form:button-label-add-value')}
                        </Button>

                        {errors.values?.message ? (
                            <Alert message={t(errors.values.message)} variant="error" className="mt-5" />
                        ) : null}
                    </Card>
                </div>

                <div className="mb-4 text-end">
                    {initialValues && (
                        <Button variant="outline" onClick={router.back} className="me-4" type="button">
                            {t('form:button-label-back')}
                        </Button>
                    )}

                    <Button loading={creating || updating}>
                        {initialValues ? t('form:item-description-update') : t('form:item-description-add')}{' '}
                        {t('common:attribute')}
                    </Button>
                </div>
            </form>
        </>
    )
}
