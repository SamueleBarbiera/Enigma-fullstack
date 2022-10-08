import Input from '@components/ui/input'
import { Control, useForm } from 'react-hook-form'
import Button from '@components/ui/button'
import Description from '@components/ui/description'
import Card from '@components/common/card'
import { useUpdateUserMutation } from '@data/user/use-user-update.mutation'
import TextArea from '@components/ui/text-area'
import { useTranslation } from 'next-i18next'
import FileInput from '@components/ui/file-input'
import pick from 'lodash/pick'

interface FormValues {
    name: string
    profile: {
        id: string
        bio: string
        contact: string
        avatar: {
            thumbnail: string
            original: string
            id: string
        }
    }
}

export default function ProfileUpdate(me: { id: number; profile: { id: string } }) {
    const { t } = useTranslation()
    const { mutate: updateUser, isLoading: loading } = useUpdateUserMutation()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            ...(me && pick(me, ['name', 'profile.bio', 'profile.contact', 'profile.avatar'])),
        },
    })

    function onSubmit(values: FormValues) {
        const { name, profile } = values
        updateUser({
            variables: {
                id: me.id,
                input: {
                    name: name,
                    profile: {
                        id: me.profile.id,
                        bio: profile.bio,
                        contact: profile.contact,
                        avatar: {
                            thumbnail: profile.avatar.thumbnail,
                            original: profile.avatar.original,
                            id: profile.avatar.id,
                        },
                    },
                },
            },
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('form:input-label-avatar')}
                    details={t('form:avatar-help-text')}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <FileInput name="profile.avatar" control={control} multiple={false} />
                </Card>
            </div>

            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('form:form-title-information')}
                    details={t('form:profile-info-help-text')}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />

                <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
                    <Input
                        label={t('form:input-label-name')}
                        {...register('name')}
                        error={t(
                            errors.name?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                        )}
                        variant="outline"
                        className="mb-5"
                    />
                    <TextArea
                        label={t('form:input-label-bio')}
                        {...register('profile.bio')}
                        error={t(
                            errors.profile?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                        )}
                        variant="outline"
                        className="mb-6"
                    />
                    <Input
                        label={t('form:input-label-contact')}
                        {...register('profile.contact')}
                        error={t(
                            errors.profile?.message as string | TemplateStringsArray | (string | TemplateStringsArray)[]
                        )}
                        variant="outline"
                        className="mb-5"
                    />
                </Card>

                <div className="w-full text-end">
                    <Button loading={loading} disabled={loading}>
                        {t('form:button-label-save')}
                    </Button>
                </div>
            </div>
        </form>
    )
}
