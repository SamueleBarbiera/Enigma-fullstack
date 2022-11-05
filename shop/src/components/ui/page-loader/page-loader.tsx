import cn from 'classnames'
import styles from './page-loader.module.css'

const PageLoader = () => {
    return (
        <div className={cn('flex h-screen w-full flex-col items-center justify-center')}>
            <div className="relative flex">
                <div
                    className={cn('flex w-full flex-col items-center justify-center')}
                    style={{ height: 'calc(100vh - 200px)' }}
                >
                    <div className={styles.loading} />

                    <h3 className="text-lg font-semibold italic text-body"> {'Loading...'}</h3>
                </div>
            </div>
        </div>
    )
}

export default PageLoader
