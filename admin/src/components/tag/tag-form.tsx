/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import Input from '@components/ui/input'
import { useForm } from 'react-hook-form'
import Button from '@components/ui/button'
import TextArea from '@components/ui/text-area'
import Label from '@components/ui/label'
import Card from '@components/common/card'
import Description from '@components/ui/description'
import * as categoriesIcon from '@components/icons/category'
import { getIcon } from '@utils/get-icon'
import { useRouter } from 'next/router'
import { getErrorMessage } from '@utils/form-error'
import { tagIcons } from './tag-icons'
import { useTranslation } from 'next-i18next'
import SelectInput from '@components/ui/select-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { tagValidationSchema } from './tag-validation-schema'
import { useCreateTagMutation } from '@data/tag/use-tag-create.mutation'
import { useUpdateTagMutation } from '@data/tag/use-tag-update.mutation'
import { ConnectTypeBelongsTo, Maybe } from '@ts-types/generated'

export interface Iitem {
    value: string
    label: string
}

export const updatedIcons: object[] = tagIcons.map((item: Iitem) => {
    return (
        <div className="flex items-center space-s-5" key={item.label}>
            <span className="flex h-5 w-5 items-center justify-center">
                {getIcon({
                    iconList: categoriesIcon,
                    iconName: item.value,
                    className: 'max-h-full max-w-full',
                })}
            </span>
            <span>{item.label}</span>
        </div>
    )
})

interface FormValues {
    name: string
    details: string
    image: { thumbnail: Maybe<string> | undefined; original: Maybe<string> | undefined; id: Maybe<string> | undefined }
    icon: { value: Maybe<string> | undefined }
    type: { id: Maybe<ConnectTypeBelongsTo> | undefined }
    id: string
}

export default function CreateOrUpdateTagForm(initialValues: { icon: unknown; id: string }) {
    const router = useRouter()
    const { t } = useTranslation()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            ...initialValues,
            icon: {
                value: initialValues.icon ? tagIcons.find((singleIcon) => singleIcon.value === initialValues.icon) : '',
            },
        },

        resolver: yupResolver(tagValidationSchema),
    })

    const { mutate: createTag, isLoading: creating } = useCreateTagMutation()
    const { mutate: updateTag, isLoading: updating } = useUpdateTagMutation()

    const onSubmit = (values: FormValues) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (initialValues) {
                updateTag({
                    variables: {
                        id: initialValues.id,
                        input: {
                            name: values.name,
                            details: values.details,
                            image: {
                                thumbnail: values.image.thumbnail,
                                original: values.image.original,
                                id: values.image.id,
                            },
                            icon: values.icon.value,
                            type: values.type.id,
                            id: '',
                        },
                    },
                })
            } else {
                createTag({
                    variables: {
                        name: values.name,
                        details: values.details,
                        image: {
                            thumbnail: values.image.thumbnail,
                            original: values.image.original,
                            id: values.image.id,
                        },
                        icon: values.icon.value,
                        type: values.type.id,
                        id: '',
                    },
                })
            }
        } catch (err) {
            getErrorMessage(err)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5 flex flex-wrap sm:my-8">
                <Description
                    title={t('form:input-label-description')}
                    details={`${initialValues ? t('form:item-description-edit') : t('form:item-description-add')} ${t(
                        'form:tag-description-helper-text'
                    )}`}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <Input
                        label={t('form:input-label-name')}
                        {...register('icon.value')}
                        error={t(
                            errors.name?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                        )}
                        variant="outline"
                        className="mb-5"
                    />

                    <TextArea
                        label={t('form:input-label-details')}
                        {...register('icon.value')}
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
                    {initialValues ? t('form:button-label-update-tag') : t('form:button-label-add-tag')}
                </Button>
            </div>
        </form>
    )
}
