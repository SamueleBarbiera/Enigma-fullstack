import SelectInput from '@components/ui/select-input'
import Label from '@components/ui/label'
import { Control } from 'react-hook-form'
import { useTagsQuery } from '@data/tag/use-tags.query'
import { useTranslation } from 'next-i18next'

interface Props {
    control: Control<any>
    setValue: any
}

const ProductTagInput = ({ control }: Props) => {
    const { t } = useTranslation()
    const { data, isLoading: loading } = useTagsQuery({
        limit: 999,
    })

    return (
        <div>
            <Label>{t('sidebar-nav-item-tags')}</Label>
            <SelectInput
                name="tags"
                isMulti
                control={control}
                getOptionLabel={(option: { name: string }) => option.name}
                getOptionValue={(option: { id: string }) => option.id}
                options={data?.tags.data}
                isLoading={loading}
                isClearable={undefined}
            />
        </div>
    )
}

export default ProductTagInput
