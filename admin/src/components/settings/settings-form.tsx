import Input from '@components/ui/input'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import Button from '@components/ui/button'
import {
    ContactDetailsInput,
    DeliveryTime,
    Maybe,
    SettingsOptions,
    SettingsOptionsInput,
    Shipping,
    ShippingInput,
    ShopSocialInput,
    Tax,
    TaxInput,
} from '@ts-types/generated'
import Description from '@components/ui/description'
import Card from '@components/common/card'
import Label from '@components/ui/label'
import { CURRENCY } from './currency'
import { siteSettings } from '@settings/site.settings'
import ValidationError from '@components/ui/form-validation-error'
import { useUpdateSettingsMutation } from '@data/settings/use-settings-update.mutation'
import { useTranslation } from 'next-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { settingsValidationSchema } from './settings-validation-schema'
import FileInput from '@components/ui/file-input'
import SelectInput from '@components/ui/select-input'
import TextArea from '@components/ui/text-area'
import { getFormattedImage } from '@utils/get-formatted-image'
import Alert from '@components/ui/alert'
import { getIcon } from '@utils/get-icon'
import * as socialIcons from '@components/icons/social'
import omit from 'lodash/omit'

type FormValues = {
    siteTitle: string
    siteSubtitle: string
    currency: any
    minimumOrderAmount: number
    logo: any
    taxClass: Tax
    shippingClass: Shipping
    signupPoints: number
    currencyToWalletRatio: number
    contactDetails: ContactDetailsInput
    deliveryTime: Maybe<DeliveryTime>[]
    seo: {
        metaTitle: string
        metaDescription: string
        ogTitle: string
        ogDescription: string
        ogImage: any
        twitterHandle: string
        twitterCardType: string
        metaTags: string
        canonicalUrl: string
    }
    google: {
        isEnable: boolean
        tagManagerId: string
    }
    facebook: {
        isEnable: boolean
        appId: string
        pageId: string
    }
}

const socialIcon = [
    {
        value: 'FacebookIcon',
        label: 'Facebook',
    },
    {
        value: 'InstagramIcon',
        label: 'Instagram',
    },
    {
        value: 'TwitterIcon',
        label: 'Twitter',
    },
    {
        value: 'YouTubeIcon',
        label: 'Youtube',
    },
]

export const updatedIcons = socialIcon.map((item: any) => {
    item.label = (
        <div className="flex items-center text-body space-s-4">
            <span className="flex h-4 w-4 items-center justify-center">
                {getIcon({
                    iconList: socialIcons,
                    iconName: item.value,
                    className: 'w-4 h-4',
                })}
            </span>
            <span>{item.label}</span>
        </div>
    )
    return item
})

type IProps = {
    settings?: Maybe<SettingsOptionsInput> | null
    taxClasses?:TaxInput | null
    shippingClasses?: ShippingInput | null
}

export default function SettingsForm({ settings, taxClasses, shippingClasses }: IProps) {
    const { t } = useTranslation()
    const { mutate: updateSettingsMutation, isLoading: loading } = useUpdateSettingsMutation()
    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors },
    } = useForm<FormValues>({
        shouldUnregister: true,
        resolver: yupResolver(settingsValidationSchema),
        // @ts-ignore
        defaultValues: {
            ...settings,
            contactDetails: {
                ...settings?.contactDetails,
                socials: settings?.contactDetails?.socials
                    ? settings?.contactDetails?.socials.map((social: any) => ({
                          icon: updatedIcons?.find((icon) => icon?.value === social?.icon),
                          url: social?.url,
                          label: social?.label,
                      }))
                    : [],
            },
            // @ts-ignore
            deliveryTime: settings?.deliveryTime ? settings?.deliveryTime : [],
            logo: settings?.logo ?? '',
            currency: settings?.currency ? CURRENCY.find((item) => item.code == settings?.currency) : '',
            // @ts-ignore
            taxClass: !!taxClasses?.length ? taxClasses?.find((tax: Tax) => tax.id == settings?.taxClass) : '',
            // @ts-ignore
            shippingClass: !!shippingClasses?.length
            // @ts-ignore
                ? shippingClasses?.find((shipping: Shipping) => shipping.id == settings?.shippingClass)
                : '',
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'deliveryTime',
    })

    const {
        fields: socialFields,
        append: socialAppend,
        remove: socialRemove,
    } = useFieldArray({
        control,
        name: 'contactDetails.socials',
    })

    async function onSubmit(values: FormValues) {
        const contactDetails = {
            ...values?.contactDetails,
            location: { ...omit(values?.contactDetails?.location, '__typename') },
            socials: values?.contactDetails?.socials
                ? values?.contactDetails?.socials?.map((social: any) => ({
                      icon: social?.icon?.value,
                      url: social?.url,
                      label: social?.label,
                  }))
                : [],
        }
        updateSettingsMutation({
            variables: {
                input: {
                    options: {
                        ...values,
                        // @ts-ignore
                        signupPoints: Number(values.signupPoints),
                        currencyToWalletRatio: Number(values.currencyToWalletRatio),
                        minimumOrderAmount: Number(values.minimumOrderAmount),
                        currency: values.currency?.code,
                        taxClass: values?.taxClass?.id,
                        shippingClass: values?.shippingClass?.id,
                        logo: values?.logo,
                        contactDetails,
                        //@ts-ignore
                        seo: {
                            ...values?.seo,
                            ogImage: getFormattedImage(values?.seo?.ogImage),
                        },
                    },
                },
            },
        })
    }

    const logoInformation = (
        <span>
            {t('form:logo-help-text')} <br />
            {t('form:logo-dimension-help-text')} &nbsp;
            <span className="font-bold">
                {siteSettings.logo.width}x{siteSettings.logo.height} {t('common:pixel')}
            </span>
        </span>
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('form:input-label-logo')}
                    details={logoInformation}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <FileInput name="logo" control={control} multiple={false} />
                </Card>
            </div>

            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('form:form-title-information')}
                    details={t('form:site-info-help-text')}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <Input
                        label={t('form:input-label-site-title')}
                        {...register('siteTitle')}
                        error={t(errors.siteTitle?.message!)}
                        variant="outline"
                        className="mb-5"
                    />
                    <Input
                        label={t('form:input-label-site-subtitle')}
                        {...register('siteSubtitle')}
                        error={t(errors.siteSubtitle?.message!)}
                        variant="outline"
                        className="mb-5"
                    />

                    <div className="mb-5">
                        <Label>{t('form:input-label-currency')}</Label>
                        <SelectInput
                            name="currency"
                            control={control}
                            getOptionLabel={(option: any) => option.name}
                            getOptionValue={(option: any) => option.code}
                            options={CURRENCY}
                            isMulti={undefined}
                            isClearable={undefined}
                            isLoading={false}
                        />
                        <ValidationError
                            message={t(
                                errors.currency?.message as
                                    | string
                                    | TemplateStringsArray
                                    | (string | TemplateStringsArray)[]
                            )}
                        />
                    </div>

                    <Input
                        label={`${t('form:input-label-min-order-amount')}`}
                        {...register('minimumOrderAmount')}
                        type="number"
                        error={t(errors.minimumOrderAmount?.message!)}
                        variant="outline"
                        className="mb-5"
                    />

                    <div className="mb-5">
                        <Label>{t('form:input-label-tax-class')}</Label>
                        <SelectInput
                            name="taxClass"
                            control={control}
                            getOptionLabel={(option: any) => option.name}
                            getOptionValue={(option: any) => option.id}
                            options={taxClasses!}
                            isMulti={undefined}
                            isClearable={undefined}
                            isLoading={false}
                        />
                    </div>

                    <div>
                        <Label>{t('form:input-label-shipping-class')}</Label>
                        <SelectInput
                            name="shippingClass"
                            control={control}
                            getOptionLabel={(option: any) => option.name}
                            getOptionValue={(option: any) => option.id}
                            options={shippingClasses!}
                            isMulti={undefined}
                            isClearable={undefined}
                            isLoading={false}
                        />
                    </div>
                </Card>
            </div>
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title="SEO"
                    details={t('form:tax-form-seo-info-help-text')}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <Input
                        label={t('form:input-label-meta-title')}
                        {...register('seo.metaTitle')}
                        variant="outline"
                        className="mb-5"
                    />
                    <TextArea
                        label={t('form:input-label-meta-description')}
                        {...register('seo.metaDescription')}
                        variant="outline"
                        className="mb-5"
                    />
                    <Input
                        label={t('form:input-label-meta-tags')}
                        {...register('seo.metaTags')}
                        variant="outline"
                        className="mb-5"
                    />
                    <Input
                        label={t('form:input-label-canonical-url')}
                        {...register('seo.canonicalUrl')}
                        variant="outline"
                        className="mb-5"
                    />
                    <Input
                        label={t('form:input-label-og-title')}
                        {...register('seo.ogTitle')}
                        variant="outline"
                        className="mb-5"
                    />
                    <TextArea
                        label={t('form:input-label-og-description')}
                        {...register('seo.ogDescription')}
                        variant="outline"
                        className="mb-5"
                    />
                    <div className="mb-5">
                        <Label>{t('form:input-label-og-image')}</Label>
                        <FileInput name="seo.ogImage" control={control} multiple={false} />
                    </div>
                    <Input
                        label={t('form:input-label-twitter-handle')}
                        {...register('seo.twitterHandle')}
                        variant="outline"
                        className="mb-5"
                        placeholder="your twitter username (exp: @username)"
                    />
                    <Input
                        label={t('form:input-label-twitter-card-type')}
                        {...register('seo.twitterCardType')}
                        variant="outline"
                        className="mb-5"
                        placeholder="one of summary, summary_large_image, app, or player"
                    />
                </Card>
            </div>

            <div className="my-5 flex flex-wrap border-b border-dashed border-gray-300 pb-8 sm:my-8">
                <Description
                    title={t('form:shop-settings')}
                    details={t('form:shop-settings-helper-text')}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <div className="mb-5">
                        <Label>{t('form:input-label-autocomplete')}</Label>
                    </div>
                    <Input
                        label={t('form:input-label-contact')}
                        {...register('contactDetails.contact')}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.contactDetails?.contact?.message!)}
                    />

                    <Input
                        label={t('form:input-label-email')}
                        {...register('contactDetails.email')}
                        variant="outline"
                        className="mb-5"
                        type="email"
                        error={t(errors.contactDetails?.email?.message!)}
                    />

                    <Input
                        label={t('form:input-label-website')}
                        {...register('contactDetails.website')}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.contactDetails?.website?.message!)}
                    />

                    {/* Social and Icon picker */}
                    <div>
                        {socialFields.map((item: ShopSocialInput & { id: string }, index: number) => (
                            <div
                                className="border-b border-dashed border-border-200 py-5 first:mt-5 first:border-t last:border-b-0 md:py-8 md:first:mt-10"
                                key={item.id}
                            >
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-8">
                                    <div className="sm:col-span-1 2xl:col-span-2">
                                        <Label className="whitespace-nowrap">
                                            {t('form:input-label-select-platform')}
                                        </Label>
                                        <SelectInput
                                            name={`contactDetails.socials.${index}.icon` as const}
                                            control={control}
                                            options={updatedIcons}
                                            isClearable={true}
                                            defaultValue={item?.icon!}
                                            getOptionLabel={undefined}
                                            getOptionValue={undefined}
                                            isMulti={undefined}
                                            isLoading={false}
                                        />
                                    </div>
                                    <Input
                                        className="sm:col-span-1 2xl:col-span-3"
                                        label={t('form:input-label-social-url')}
                                        variant="outline"
                                        {...register(`contactDetails.socials.${index}.url` as const)}
                                        defaultValue={item.url!} // make sure to set up defaultValue
                                    />
                                    <Input
                                        className="sm:col-span-1 2xl:col-span-2"
                                        label={t('form:input-label-social')}
                                        variant="outline"
                                        {...register(`contactDetails.socials.${index}.label`)}
                                    />
                                    <button
                                        onClick={() => {
                                            socialRemove(index)
                                        }}
                                        type="button"
                                        className="text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none sm:col-span-1 sm:mt-5 2xl:col-span-1"
                                    >
                                        {t('form:button-label-remove')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button
                        type="button"
                        onClick={() => socialAppend({ icon: '', url: '' })}
                        className="w-full sm:w-auto"
                    >
                        {t('form:button-label-add-social')}
                    </Button>
                </Card>
            </div>

            <div className="mb-4 text-end">
                <Button loading={loading} disabled={loading}>
                    {t('form:button-label-save-settings')}
                </Button>
            </div>
        </form>
    )
}
