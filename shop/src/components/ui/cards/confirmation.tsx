import TrashIcon from '@components/icons/trash'
import Button from '@components/ui/button'
import { useTranslation } from 'next-i18next'
import cn from 'classnames'

type ConfirmationCardProps = {
    onCancel: () => void
    onDelete: () => void
    title?: string
    icon?: any
    description?: string
    cancelBtnClassName?: string
    deleteBtnClassName?: string
    cancelBtnText?: string
    deleteBtnText?: string
    cancelBtnLoading?: boolean
    deleteBtnLoading?: boolean
}

const Confirmation: React.FC<ConfirmationCardProps> = ({
    onCancel,
    onDelete,
    icon,
    title = 'button-delete',
    description = 'delete-item-confirm',
    cancelBtnText = 'button-cancel',
    deleteBtnText = 'button-delete',
    cancelBtnClassName,
    deleteBtnClassName,
    cancelBtnLoading,
    deleteBtnLoading,
}) => {
    const { t } = useTranslation('common')
    return (
        <div className="p-4 pb-6 bg-gray-100  m-auto max-w-sm w-full rounded-md md:rounded-xl sm:w-[24rem]">
            <div className="w-full h-full text-center">
                <div className="flex h-full flex-col justify-between">
                    {icon ? icon : <TrashIcon className="mt-4 w-12 h-12 m-auto text-accent" />}
                    <p className="text-heading text-xl font-bold mt-4">{t(title)}</p>
                    <p className="text-body-dark dark:text-muted leading-relaxed py-2 px-6">{t(description)}</p>
                    <div className="flex items-center justify-between space-x-4 rtl:space-x-reverse w-full mt-8">
                        <div className="w-1/2">
                            <Button
                                onClick={onCancel}
                                loading={cancelBtnLoading}
                                disabled={cancelBtnLoading}
                                className={cn(
                                    'w-full py-2 px-4 bg-heading focus:outline-none hover:bg-gray-600 focus:bg-gray-600 text-light transition ease-in duration-200 text-center text-base font-semibold rounded shadow-md',
                                    cancelBtnClassName
                                )}
                            >
                                {t(cancelBtnText)}
                            </Button>
                        </div>

                        <div className="w-1/2">
                            <Button
                                onClick={onDelete}
                                loading={deleteBtnLoading}
                                disabled={deleteBtnLoading}
                                className={cn(
                                    'w-full py-2 px-4 bg-red-600 focus:outline-none hover:bg-red-700 focus:bg-red-700 text-light transition ease-in duration-200 text-center text-base font-semibold rounded shadow-md',
                                    deleteBtnClassName
                                )}
                            >
                                {t(deleteBtnText)}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirmation
