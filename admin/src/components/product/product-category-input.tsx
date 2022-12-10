import SelectInput from '@components/ui/select-input'
import Label from '@components/ui/label'
import { Control } from 'react-hook-form'
import { useCategoriesQuery } from '@data/category/use-categories.query'
import { useTranslation } from 'next-i18next'

interface Props {
    control: Control<any>
    setValue: any
}

const ProductCategoryInput = ({ control }: Props) => {
    const { t } = useTranslation('common')

    const { data, isLoading: loading } = useCategoriesQuery({
        limit: 999,
    })

    return (
        <div className="mb-5">
            <Label>{t('form:input-label-categories')}</Label>
            <SelectInput
                name="categories"
                isMulti
                control={control}
                getOptionLabel={(option: { name: string }) => option.name}
                getOptionValue={(option: { id: string }) => option.id}
                options={data?.categories.data}
                isLoading={loading}
                isClearable={undefined}
            />
        </div>
    )
}

export default ProductCategoryInput
