import Input from '@components/ui/input'
import TextArea from '@components/ui/text-area'
import { useForm, FormProvider } from 'react-hook-form'
import Button from '@components/ui/button'
import Description from '@components/ui/description'
import Card from '@components/common/card'
import Label from '@components/ui/label'
import Radio from '@components/ui/radio/radio'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import FileInput from '@components/ui/file-input'
import { productValidationSchema } from './product-validation-schema'
import ProductVariableForm from './product-variable-form'
import ProductSimpleForm from './product-simple-form'
import ProductGroupInput from './product-group-input'
import ProductCategoryInput from './product-category-input'
import orderBy from 'lodash/orderBy'
import sum from 'lodash/sum'
import ProductTypeInput from './product-type-input'
import {
    ProductType,
    Product,
    VariationOption,
    Maybe,
    Variation,
    CreateProduct,
    Attachment,
    AttachmentInput,
} from '@ts-types/generated'
import { useCreateProductMutation } from '@data/product/product-create.mutation'
import { useTranslation } from 'next-i18next'
import { useUpdateProductMutation } from '@data/product/product-update.mutation'
import { useShopQuery } from '@data/shop/use-shop.query'
import ProductTagInput from './product-tag-input'
import Alert from '@components/ui/alert'
import { useState } from 'react'
import { animateScroll } from 'react-scroll'

interface IProps {
    initialValues?: Product | undefined
}

function processOptions(options: Maybe<Variation>) {
    try {
        return JSON.parse(options) as Maybe<Variation>
    } catch (error) {
        return options
    }
}

function calculateMaxMinPrice(variationOptions: Maybe<Maybe<Variation>[]> | undefined) {
    if (!variationOptions || !variationOptions.length) {
        return {
            min_price: null,
            max_price: null,
        }
    }
    const sortedVariationsByPrice = orderBy(variationOptions, ['price'])
    const sortedVariationsBySalePrice = orderBy(variationOptions, ['sale_price'])
    return {
        min_price:
            sortedVariationsBySalePrice[0]!.sale_price! < sortedVariationsByPrice[0]!.price!
                ? Number(sortedVariationsBySalePrice[0]?.sale_price)
                : Number(sortedVariationsByPrice[0]?.price),
        max_price: Number(sortedVariationsByPrice[sortedVariationsByPrice.length - 1]?.price),
    }
}

function calculateQuantity(variationOptions: Maybe<Maybe<Variation>[]> | { quantity: number }[] | undefined) {
    return sum(variationOptions?.map((quantity: unknown) => quantity))
}
export default function CreateOrUpdateProductForm({ initialValues }: IProps) {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { t } = useTranslation()
    const { data: shopData } = useShopQuery(router.query.shop as string, {
        enabled: !!router.query.shop,
    })
    const shopId = shopData?.shop.id

    const methods = useForm<Product>({
        resolver: yupResolver(productValidationSchema),
        shouldUnregister: true,
        defaultValues: initialValues,
    })
    const {
        register,
        handleSubmit,
        control,
        setValue,
        setError,
        watch,
        formState: { errors },
    } = methods

    const { mutate: createProduct, isLoading: creating } = useCreateProductMutation()
    const { mutate: updateProduct, isLoading: updating } = useUpdateProductMutation()

    const productTypeValue = watch('productTypeValue')

    const onSubmit = (values: Product) => {
        const { type } = values
        const inputValues: CreateProduct = {
            description: values.description,
            height: values.height,
            length: values.length,
            name: values.name,
            sku: values.sku,
            status: values.status,
            unit: values.unit,
            width: values.width,
            quantity:
                values.product_type === ProductType.Simple
                    ? values.quantity
                    : calculateQuantity(values.variation_options),
            product_type: values.product_type,
            type_id: type.id,
            ...(initialValues ? { shop_id: initialValues.shop_id } : { shop_id: Number(shopId) }),
            price: Number(values.price),
            sale_price: values.sale_price ? Number(values.sale_price) : null,
            categories: values.categories.map((id) => id),
            tags: values.tags.map((id) => id),
            image: {
                thumbnail: values.image?.thumbnail,
                original: values.image?.original,
                id: values.image?.id,
            },
            gallery: values.gallery?.map(({ thumbnail, original, id }: any) => ({
                thumbnail,
                original,
                id,
            })),
            ...(productTypeValue === ProductType.Variable && {
                variations: values.variations!.flatMap((value) => value?.id),
            }),
            ...(productTypeValue === ProductType.Variable
                ? {
                      variation_options: {
                          upsert: values.variation_options?.map((options, ...rest) => ({
                              ...rest,
                              options: processOptions(options).map(({ name, value }: VariationOption) => ({
                                  name,
                                  value,
                              })),
                          })),
                          delete: initialValues?.variation_options
                              ?.map((initialVariationOption) => {
                                  const find = values.variation_options?.find(
                                      (variationOption) => variationOption?.id === initialVariationOption?.id
                                  )
                                  if (!find) {
                                      return initialVariationOption?.id
                                  }
                              })
                              .filter((item) => item !== undefined),
                      },
                  }
                : {
                      variations: [],
                      variation_options: {
                          upsert: [],
                          delete: initialValues?.variation_options?.map((variation) => variation?.id),
                      },
                  }),
            ...(values.product_type === 'simple'
                ? {
                      max_price: Number(values.price),
                      min_price: Number(values.price),
                  }
                : calculateMaxMinPrice(values.variation_options)),
        }

        if (initialValues) {
            updateProduct(
                {
                    variables: {
                        id: initialValues.id,
                        input: inputValues,
                    },
                },
                {
                    onError: (error) => {
                        setError(error, {
                            type: 'manual',
                            message: error.message,
                        })
                    },
                }
            )
        } else {
            createProduct(
                {
                    ...inputValues,
                },
                {
                    onError: (error) => {
                        if (error.message) {
                            setErrorMessage(error.message)
                            animateScroll.scrollToTop()
                        } else {
                            setError(error, {
                                type: 'manual',
                                message: error.message,
                            })
                        }
                    },
                }
            )
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
                    onClose={() => setErrorMessage(null)}
                />
            ) : null}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                        <Description
                            title={t('form:featured-image-title')}
                            details={t('form:featured-image-help-text')}
                            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                        />

                        <Card className="w-full sm:w-8/12 md:w-2/3">
                            <FileInput name="image" control={control} multiple={false} />
                        </Card>
                    </div>

                    <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                        <Description
                            title={t('form:gallery-title')}
                            details={t('form:gallery-help-text')}
                            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                        />

                        <Card className="w-full sm:w-8/12 md:w-2/3">
                            <FileInput name="gallery" control={control} />
                        </Card>
                    </div>

                    <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                        <Description
                            title={t('form:type-and-category')}
                            details={t('form:type-and-category-help-text')}
                            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                        />

                        <Card className="w-full sm:w-8/12 md:w-2/3">
                            <ProductGroupInput
                                control={control}
                                error={t(
                                    errors.type?.message as
                                        | string
                                        | TemplateStringsArray
                                        | (string | TemplateStringsArray)[]
                                )}
                            />
                            <ProductCategoryInput control={control} setValue={setValue} />
                            <ProductTagInput control={control} setValue={setValue} />
                        </Card>
                    </div>

                    <div className="my-5 flex flex-wrap sm:my-8">
                        <Description
                            title={t('form:item-description')}
                            details={`${
                                initialValues ? t('form:item-description-edit') : t('form:item-description-add')
                            } ${t('form:product-description-help-text')}`}
                            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                        />

                        <Card className="w-full sm:w-8/12 md:w-2/3">
                            <Input
                                label={`${t('form:input-label-name')}*`}
                                {...register('name')}
                                error={t(errors.name?.message ?? '')}
                                variant="outline"
                                className="mb-5"
                            />

                            <Input
                                label={`${t('form:input-label-unit')}*`}
                                {...register('unit')}
                                error={t(errors.unit?.message ?? '')}
                                variant="outline"
                                className="mb-5"
                            />

                            <TextArea
                                label={t('form:input-label-description')}
                                {...register('description')}
                                error={t(errors.description?.message ?? '')}
                                variant="outline"
                                className="mb-5"
                            />

                            <div>
                                <Label>{t('form:input-label-status')}</Label>
                                <Radio
                                    {...register('status')}
                                    label={t('form:input-label-published')}
                                    id="published"
                                    value="publish"
                                    className="mb-2"
                                />
                                <Radio
                                    {...register('status')}
                                    id="draft"
                                    label={t('form:input-label-draft')}
                                    value="draft"
                                />
                            </div>
                        </Card>
                    </div>

                    <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                        <Description
                            title={t('form:form-title-product-type')}
                            details={t('form:form-description-product-type')}
                            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5"
                        />

                        <ProductTypeInput />
                    </div>

                    {/* Simple Type */}
                    {productTypeValue === ProductType.Simple && <ProductSimpleForm initialValues={initialValues} />}

                    {/* Variation Type */}
                    {productTypeValue === ProductType.Variable && (
                        <ProductVariableForm shopId={shopId} initialValues={initialValues} />
                    )}

                    <div className="mb-4 text-end">
                        {initialValues && (
                            <Button variant="outline" onClick={router.back} className="me-4" type="button">
                                {t('form:button-label-back')}
                            </Button>
                        )}
                        <Button loading={updating || creating}>
                            {initialValues ? t('form:button-label-update-product') : t('form:button-label-add-product')}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
