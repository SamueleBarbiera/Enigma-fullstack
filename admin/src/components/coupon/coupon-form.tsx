import Input from '@components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker } from '@components/ui/date-picker'
import Button from '@components/ui/button'
import TextArea from '@components/ui/text-area'
import Description from '@components/ui/description'
import Card from '@components/common/card'
import Label from '@components/ui/label'
import { useRouter } from 'next/router'
import ValidationError from '@components/ui/form-validation-error'
import { Coupon, CouponType, CouponInput, Image, Scalars } from '@ts-types/generated'
import { useCreateCouponMutation } from '@data/coupon/use-coupon-create.mutation'
import { useUpdateCouponMutation } from '@data/coupon/use-coupon-update.mutation'
import { useTranslation } from 'next-i18next'
import FileInput from '@components/ui/file-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { couponValidationSchema } from './coupon-validation-schema'
import { AxiosError } from 'axios'

interface FormValues {
    image: Image
    deleted_at: Date
    is_valid: boolean
    id: string
    code: string
    description: string
    type: string
    amount: number
    active_from: Date
    expire_at: Date
    created_at: Date
    updated_at: Date
}

const defaultValues: Coupon = {
    image: {
        thumbnail: '',
        original: '',
        id: 0,
    },
    deleted_at: '',
    is_valid: true,
    id: '',

    code: '',
    description: '',
    type: '',
    amount: 0,
    created_at: new Date(),
    updated_at: new Date(),
    active_from: new Date(),
    expire_at: new Date(),
}

interface IProps {
    initialValues?: Coupon | null
}

export default function CreateOrUpdateCouponForm({ initialValues }: IProps) {
    const router = useRouter()
    const { t } = useTranslation()
    const {
        register,
        handleSubmit,
        control,
        watch,
        setError,

        formState: { errors },
    } = useForm<FormValues>({
        //@ts-ignore
        defaultValues: initialValues
            ? {
                  ...initialValues,
                  active_from: new Date(initialValues.active_from as string | number | Date),
                  expire_at: new Date(initialValues.expire_at as string | number | Date),
              }
            : defaultValues,
        resolver: yupResolver(couponValidationSchema),
    })

    const { mutate: createCoupon, isLoading: creating } = useCreateCouponMutation()
    const { mutate: updateCoupon, isLoading: updating } = useUpdateCouponMutation()

    const [active_from, expire_at] = watch(['active_from', 'expire_at'])
    const couponType = watch('type')

    const onSubmit = (values: FormValues) => {
        // @ts-ignore
        const input: CouponInput = {
            code: values.code,
            type: CouponType.FixedCoupon,
            description: values.description,
            amount: values.amount,
            active_from: new Date(values.active_from).toISOString(),
            expire_at: new Date(values.expire_at).toISOString(),
            image: {
                thumbnail: values.image.thumbnail,
                original: values.image.original,
                id: values.image.id.toString(),
            },
        }
        if (initialValues) {
            updateCoupon(
                {
                    variables: {
                        id: initialValues.id,
                        input,
                    },
                },
                // {
                //     onError: (error: any) => {
                //         Object.keys(error?.response?.data).forEach((field: any) => {
                //             setError(field, {
                //                 type: 'manual',
                //                 message: error?.response?.data[field][0],
                //             })
                //         })
                //     },
                // }
                {
                    onError: (error) => {
                        if (error instanceof AxiosError) {
                            setError('description', {
                                type: 'manual',
                                message: error.message,
                            })

                            console.log(`❌ Error message: ${error.message}`)
                        }
                    },
                }
            )
        } else {
            createCoupon(
                {
                    variables: {
                        input,
                    },
                },
                // {
                //     onError: (error: any) => {
                //         Object.keys(error?.response?.data).forEach((field: any) => {
                //             setError(field, {
                //                 type: 'manual',
                //                 message: error?.response?.data[field][0],
                //             })
                //         })
                //     },
                // }
                {
                    onError: (error) => {
                        if (error instanceof AxiosError) {
                            setError('description', {
                                type: 'manual',
                                message: error.message,
                            })

                            console.log(`❌ Error message: ${error.message}`)
                        }
                    },
                }
            )
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('form:input-label-image')}
                    details={t('form:coupon-image-helper-text')}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <FileInput name="image" control={control} multiple={false} />
                </Card>
            </div>

            <div className="my-5 flex flex-wrap sm:my-8">
                <Description
                    title={t('form:input-label-description')}
                    details={`${initialValues ? t('form:item-description-edit') : t('form:item-description-add')} ${t(
                        'form:coupon-form-info-help-text'
                    )}`}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <Input
                        label={t('form:input-label-code')}
                        {...register('code')}
                        error={t(
                            errors.code?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                        )}
                        variant="outline"
                        className="mb-5"
                    />

                    <TextArea
                        label={t('form:input-label-description')}
                        {...register('description')}
                        variant="outline"
                        className="mb-5"
                    />
                    {couponType !== CouponType.FreeShippingCoupon && (
                        <Input
                            label={`${t('form:input-label-amount')}`}
                            {...register('amount')}
                            type="number"
                            error={t(
                                errors.amount?.message as
                                    | string
                                    | TemplateStringsArray
                                    | (string | TemplateStringsArray)[]
                            )}
                            variant="outline"
                            className="mb-5"
                        />
                    )}
                    <div className="flex flex-col sm:flex-row">
                        <div className="mb-5 w-full p-0 sm:mb-0 sm:w-1/2 sm:pe-2">
                            <Label>{t('form:coupon-active-from')}</Label>

                            <Controller
                                control={control}
                                name="active_from"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        selected={new Date(value)}
                                        selectsStart
                                        minDate={new Date()}
                                        maxDate={new Date(expire_at)}
                                        startDate={new Date(active_from)}
                                        endDate={new Date(expire_at)}
                                        className="border border-border-base"
                                    />
                                )}
                            />
                            <ValidationError
                                message={t(
                                    errors.active_from?.message as
                                        | string
                                        | TemplateStringsArray
                                        | (string | TemplateStringsArray)[]
                                )}
                            />
                        </div>
                        <div className="w-full p-0 sm:w-1/2 sm:ps-2">
                            <Label>{t('form:coupon-expire-at')}</Label>

                            <Controller
                                control={control}
                                name="expire_at"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        selected={new Date(value)}
                                        selectsEnd
                                        startDate={new Date(active_from)}
                                        endDate={new Date(expire_at)}
                                        minDate={new Date(active_from)}
                                        className="border border-border-base"
                                    />
                                )}
                            />
                            <ValidationError
                                message={t(
                                    errors.expire_at?.message as
                                        | string
                                        | TemplateStringsArray
                                        | (string | TemplateStringsArray)[]
                                )}
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <div className="mb-4 text-end">
                {initialValues && (
                    <Button variant="outline" onClick={router.back} className="me-4" type="button">
                        {t('form:button-label-back')}
                    </Button>
                )}

                <Button loading={updating || creating}>
                    {initialValues ? t('form:button-label-update-coupon') : t('form:button-label-add-coupon')}
                </Button>
            </div>
        </form>
    )
}
