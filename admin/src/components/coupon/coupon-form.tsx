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
import { useSettings } from '@contexts/settings.context'
import { Coupon, CouponType, Maybe } from '@ts-types/generated'
import { useCreateCouponMutation } from '@data/coupon/use-coupon-create.mutation'
import { useUpdateCouponMutation } from '@data/coupon/use-coupon-update.mutation'
import { useTranslation } from 'next-i18next'
import FileInput from '@components/ui/file-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { couponValidationSchema } from './coupon-validation-schema'

interface FormValues {
    code?: string | undefined
    type?: CouponType | undefined
    description?: string | undefined
    amount?: number | undefined
    image?:
        | {
              thumbnail?: string
              original?: string
              id?: string
          }
        | undefined
    active_from?: string | undefined
    expire_at?: string | undefined
}

const defaultValues: FormValues = {
    image: undefined,
    amount: 0,
    active_from: '',
    expire_at: '',
    code: '',
    description: '',
    type: undefined,
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
    } = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(couponValidationSchema),
    })
    const { currency } = useSettings()
    const { mutate: createCoupon, isLoading: creating } = useCreateCouponMutation()
    const { mutate: updateCoupon, isLoading: updating } = useUpdateCouponMutation()
    const [active_from, expire_at] = watch(['active_from', 'expire_at'])

    const onSubmit = (values: FormValues) => {
        const input = {
            code: values.code,
            type: CouponType.FixedCoupon,
            description: values.description,
            amount: values.amount,
            active_from: values.active_from,
            expire_at: values.expire_at,
            image: {
                thumbnail: values.image?.thumbnail,
                original: values.image?.original,
                id: values.image?.id,
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
                {
                    onError: (error) => {
                        Object.keys(error?.response?.data).forEach((field) => {
                            setError(field, {
                                type: 'manual',
                                message: error?.response?.data[field][0],
                            })
                        })
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
                {
                    onError: (error) => {
                        Object.keys(error.response?.data).forEach((field: any) => {
                            setError(field, {
                                type: 'manual',
                                message: error?.response?.data[field][0],
                            })
                        })
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
                        {...register('image')}
                        error={t(errors.image?.message ?? 'error')}
                        variant="outline"
                        className="mb-5"
                    />

                    <TextArea
                        label={t('form:input-label-description')}
                        {...register('description')}
                        variant="outline"
                        className="mb-5"
                    />
                    <Input
                        label={`${t('form:input-label-amount')}(${currency ?? ''})`}
                        {...register('amount')}
                        type="number"
                        error={t(
                            errors.description?.message as
                                | string
                                | TemplateStringsArray
                                | (string | TemplateStringsArray)[]
                        )}
                        variant="outline"
                        className="mb-5"
                    />

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
                                        selected={value}
                                        selectsStart
                                        minDate={new Date()}
                                        maxDate={expire_at}
                                        startDate={active_from}
                                        endDate={expire_at}
                                        className="border border-border-base"
                                    />
                                )}
                            />
                            <ValidationError message={t(errors.active_from?.message ?? 'error')} />
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
                                        selected={value}
                                        selectsEnd
                                        startDate={active_from}
                                        endDate={expire_at}
                                        minDate={active_from}
                                        className="border border-border-base"
                                    />
                                )}
                            />
                            <ValidationError message={t(errors.expire_at?.message ?? 'error')} />
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
