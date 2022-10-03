import cn from 'classnames'
import styles from './page-loader.module.css'
import { useTranslation } from 'next-i18next'

const PageLoader = () => {
    const { t } = useTranslation('common')
    return (
        <div className={cn('flex h-screen w-full flex-col items-center justify-center')}>
            <div className="relative flex">
                <div
                    className={cn('flex w-full flex-col items-center justify-center')}
                    style={{ height: 'calc(100vh - 200px)' }}
                >
                    <div className={styles.loading} />

                    <h3 className="text-lg font-semibold italic text-body"> {t('text-loading')}</h3>
                </div>
            </div>
        </div>
    )
}

export default PageLoader
