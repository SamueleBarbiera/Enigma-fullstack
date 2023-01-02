import Input from '@components/ui/input'
import Description from '@components/ui/description'
import Card from '@components/common/card'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { watch } from 'fs'
import { cartesian } from '@utils/cartesian'
import { isEmpty } from 'lodash'
import { useAttributesQuery } from '@data/attributes/use-attributes.query'
import { Product } from '@ts-types/generated'
import Label from '@components/ui/label'
import SelectInput from '@components/ui/select-input'
import Title from '@components/ui/title'
import { TitleAndOptionsInput } from './product-variable-form'
import Button from '@components/ui/button'

type IProps = {
    initialValues?: Product | null
    shopId: string | undefined
}

function filteredAttributes(attributes, variations) {
   let res = []
    res = attributes.filter((el: any) => {
        return !variations?.find((element: any) => {
            return element?.attribute?.slug === el?.slug
        })
    })
    return res
}

function getCartesianProduct(values: any) {
    const formattedValues = values
        ?.map((v: any) => v.value?.map((a: any) => ({ name: v.attribute.name, value: a.value })))
        .filter((i: any) => i !== undefined)
    if (isEmpty(formattedValues)) return []
    return cartesian(...formattedValues)
}

export default function ProductSimpleForm({ shopId, initialValues }: IProps) {
    const { data, isLoading } = useAttributesQuery({
        shop_id: initialValues ? Number(initialValues.shop_id) : Number(shopId),
    })

    const {
        register,
        watch,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useFormContext()
    const { t } = useTranslation()
    // This field array will keep all the attribute dropdown fields
    const { fields, append, remove } = useFieldArray({
        shouldUnregister: true,
        control,
        name: 'variations',
    })
    const cartesianProduct = getCartesianProduct(getValues('variations'))
    const variations = watch('variations')

    const attributes = data

    return (
        <div className="my-5 flex flex-wrap sm:my-8">
            <Description
                title={t('form:form-title-simple-product-info')}
                details={`${initialValues ? t('form:item-description-edit') : t('form:item-description-add')} ${t(
                    'form:form-description-simple-product-info'
                )}`}
                className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />

            <Card className="p-8 w-full sm:w-8/12 md:w-2/3">
                <div>
                    {fields?.map((field: any, index: number) => {
                        return (
                            <div
                                key={field.id}
                                className="border-b border-dashed border-border-200 p-5 last:border-0 md:p-8"
                            >
                                <div className="grid grid-cols-fit gap-5">
                                    <div className="mt-5">
                                        <Label>{t('form:input-label-attribute-name')}*</Label>
                                        <SelectInput
                                            name={`variations[${index}].attribute`}
                                            control={control}
                                            defaultValue={field.attribute}
                                            getOptionLabel={(option: any) => option.name}
                                            getOptionValue={(option: any) => option.id}
                                            options={filteredAttributes(attributes, variations)!}
                                            isLoading={isLoading}
                                        />
                                    </div>

                                    <div className="col-span-2 mt-5">
                                        <Label>{t('form:input-label-attribute-value')}*</Label>
                                        <SelectInput
                                            isMulti
                                            name={`variations[${index}].value`}
                                            control={control}
                                            defaultValue={field.value}
                                            getOptionLabel={(option: any) => option.value}
                                            getOptionValue={(option: any) => option.id}
                                            options={watch(`variations[${index}].attribute`)?.values}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <Button
                    //disabled={fields.length === attributes?.length}
                    onClick={(e: any) => {
                        e.preventDefault()
                        append({ attribute: '', value: [] })
                    }}
                    type="button"
                >
                    {t('form:button-label-add-option')}
                </Button>
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
