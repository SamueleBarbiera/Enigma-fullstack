import Input from '@components/ui/input'
import Description from '@components/ui/description'
import Card from '@components/common/card'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'next-i18next'

interface IProps {
    initialValues: any
}

export default function ProductSimpleForm({ initialValues }: IProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const { t } = useTranslation()

    return (
        <div className="my-5 flex flex-wrap sm:my-8">
            <Description
                title={t('form:form-title-simple-product-info')}
                details={`${initialValues ? t('form:item-description-edit') : t('form:item-description-add')} ${t(
                    'form:form-description-simple-product-info'
                )}`}
                className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
                <Input
                    label={`${t('form:input-label-price')}*`}
                    {...register('price')}
                    type="number"
                    error={t(
                        errors.price?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                    )}
                    variant="outline"
                    className="mb-5"
                />
                <Input
                    label={t('form:input-label-sale-price')}
                    type="number"
                    {...register('sale_price')}
                    error={t(
                        errors.sale_price?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                    )}
                    variant="outline"
                    className="mb-5"
                />

                <Input
                    label={`${t('form:input-label-quantity')}*`}
                    type="number"
                    {...register('quantity')}
                    error={t(
                        errors.quantity?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                    )}
                    variant="outline"
                    className="mb-5"
                />

                <Input
                    label={`${t('form:input-label-sku')}*`}
                    {...register('sku')}
                    error={t(errors.sku?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[])}
                    variant="outline"
                    className="mb-5"
                />

                <Input
                    label={t('form:input-label-width')}
                    {...register('width')}
                    error={t(
                        errors.width?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                    )}
                    variant="outline"
                    className="mb-5"
                />
                <Input
                    label={t('form:input-label-height')}
                    {...register('height')}
                    error={t(
                        errors.height?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                    )}
                    variant="outline"
                    className="mb-5"
                />
                <Input
                    label={t('form:input-label-length')}
                    {...register('length')}
                    error={t(
                        errors.length?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                    )}
                    variant="outline"
                    className="mb-5"
                />
            </Card>
        </div>
    )
}
