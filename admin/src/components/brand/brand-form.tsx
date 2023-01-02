import Input from '@components/ui/input'
import { useForm } from 'react-hook-form'
import Button from '@components/ui/button'
import Description from '@components/ui/description'
import Card from '@components/common/card'
import { useRouter } from 'next/router'
import { getIcon } from '@utils/get-icon'
import Label from '@components/ui/label'
import * as brandIcons from '@components/icons/brand'
import { Type, TypeSettingsInput } from '@ts-types/generated'
import { useCreateTypeMutation } from '@data/type/use-type-create.mutation'
import { useUpdateTypeMutation } from '@data/type/use-type-update.mutation'
import { brandIconList } from './brand-icons'
import { useTranslation } from 'next-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { typeValidationSchema } from './brand-validation-schema'
import SelectInput from '@components/ui/select-input'

export const updatedIcons = brandIconList.map((item: any) => {
    item.label = (
        <div className="flex items-center space-s-5">
            <span className="flex h-5 w-5 items-center justify-center">
                {getIcon({
                    iconList: brandIcons,
                    iconName: item.value,
                    className: 'max-h-full max-w-full',
                })}
            </span>
            <span>{item.label}</span>
        </div>
    )
    return item
})

type FormValues = {
    name?: string | null
    icon?: any
    settings: TypeSettingsInput
}

type IProps = {
    initialValues?: Type | null
}

export default function CreateOrUpdateTypeForm({ initialValues }: IProps) {
    const router = useRouter()
    const { t } = useTranslation()
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        shouldUnregister: true,
        resolver: yupResolver(typeValidationSchema),
        defaultValues: {
            ...initialValues,
            settings: {
                ...initialValues?.settings,
            },
            icon: initialValues?.icon
                ? brandIconList.find((singleIcon) => singleIcon.value === initialValues?.icon)
                : '',
        },
    })

    const { mutate: createType, isLoading: creating } = useCreateTypeMutation()
    const { mutate: updateType, isLoading: updating } = useUpdateTypeMutation()

    const onSubmit = async (values: FormValues) => {
        const input = {
            name: values.name!,
            icon: values.icon?.value,
            settings: {
                isHome: values?.settings?.isHome,
                productCard: values?.settings?.productCard,
                layoutType: values?.settings?.layoutType,
            },
            data: {},
        }

        if (!initialValues) {
            createType({
                variables: {
                    input,
                },
            })
        } else {
            updateType({
                variables: {
                    id: initialValues.id,
                    input,
                },
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5 flex flex-wrap sm:my-8">
                <Description
                    title={t('form:item-description')}
                    details={`${initialValues ? t('form:item-description-update') : t('form:item-description-add')} ${t(
                        'form:type-description-help-text'
                    )}`}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <Input
                        label={t('form:input-label-name')}
                        {...register('name')}
                        error={t(errors.name?.message!)}
                        variant="outline"
                        className="mb-5"
                    />

                    <div className="mb-5">
                        <Label>{t('form:input-label-select-icon')}</Label>
                        <SelectInput name="icon" control={control} options={updatedIcons} isClearable={true} />
                    </div>
                </Card>
            </div>

            <div className="mb-4 text-end">
                {initialValues && (
                    <Button variant="outline" onClick={router.back} className="me-4" type="button">
                        {t('form:button-label-back')}
                    </Button>
                )}

                <Button loading={creating || updating}>
                    {initialValues ? t('form:button-label-update-group') : t('form:button-label-add-group')}
                </Button>
            </div>
        </form>
    )
}
