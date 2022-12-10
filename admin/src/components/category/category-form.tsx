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
import { AttachmentInput, Category, CreateCategory } from '@ts-types/generated'
import { useUpdateCategoryMutation } from '@data/category/use-category-update.mutation'
import { useCreateCategoryMutation } from '@data/category/use-category-create.mutation'
import { categoryIcons } from './category-icons'
import { useTranslation } from 'next-i18next'
import FileInput from '@components/ui/file-input'
import SelectInput from '@components/ui/select-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { categoryValidationSchema } from './category-validation-schema'

export const updatedIcons = categoryIcons.map((item: any) => {
    item.label = (
        <div className="flex items-center space-s-5">
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
    return item
})

type FormValues = {
    name: string
    details: string
    parent: any
    image: AttachmentInput[]
    icon: any
}

const defaultValues = {
    image: [],
    name: '',
    details: '',
    parent: '',
    icon: '',
}

type IProps = {
    initialValues?: any | null
}
export default function CreateOrUpdateCategoriesForm({ initialValues }: IProps) {
    const router = useRouter()
    const { t } = useTranslation()
    const {
        register,
        handleSubmit,
        control,

        formState: { errors },
    } = useForm<CreateCategory>({
        defaultValues: initialValues
            ? {
                  ...initialValues,
                  icon: initialValues?.icon
                      ? categoryIcons.find((singleIcon) => singleIcon.value === initialValues?.icon!)
                      : '',
              }
            : defaultValues,
        resolver: yupResolver(categoryValidationSchema),
    })

    const { mutate: createCategory, isLoading: creating } = useCreateCategoryMutation()
    const { mutate: updateCategory, isLoading: updating } = useUpdateCategoryMutation()

    const onSubmit = async (values: CreateCategory) => {
        const input = {
            name: values.name,
            details: values.details,
            image: values?.image,
            banner_image: {
                thumbnail: values?.image?.thumbnail,
                original: values?.image?.original,
                id: values?.image?.id,
            },
            icon: values.icon?.toString() || '',
            parent: values?.parent ?? null,
        }
        if (initialValues) {
            updateCategory({
                variables: {
                    id: initialValues?.id,
                    input: {
                        ...input,
                    },
                },
            })
        } else {
            createCategory({
                variables: {
                    input,
                },
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('form:input-label-image')}
                    details={t('form:category-image-helper-text')}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <FileInput name="image" control={control} />
                </Card>
            </div>

            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('form:input-label-banner-image')}
                    details={t('form:category-banner-image-helper-text')}
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
                        'form:category-description-helper-text'
                    )}`}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <Input
                        label={t('form:input-label-name')}
                        {...register('name')}
                        error={t(errors.name?.message!)}
                        variant="outline"
                        className="mb-5"
                    />

                    <TextArea
                        label={t('form:input-label-details')}
                        {...register('details')}
                        variant="outline"
                        className="mb-5"
                    />

                    <div className="mb-5">
                        <Label>{t('form:input-label-select-icon')}</Label>
                        <SelectInput
                            name="icon"
                            control={control}
                            options={updatedIcons}
                            isClearable={true}
                            getOptionLabel={undefined}
                            getOptionValue={undefined}
                            isMulti={undefined}
                            isLoading={false}
                        />
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
                    {initialValues ? t('form:button-label-update-category') : t('form:button-label-add-category')}
                </Button>
            </div>
        </form>
    )
}
