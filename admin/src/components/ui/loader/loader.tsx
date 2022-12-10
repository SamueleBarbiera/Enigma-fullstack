import styles from './loader.module.css'
import cn from 'classnames'

interface Props {
    className?: string
    text?: string
    showText?: boolean
    simple?: boolean
}

const Loader = (props: Props) => {
    const { className, showText = true, text, simple = true } = props
    return (
        <>
            <div className={cn('flex h-screen w-full flex-col items-center justify-center')}>
                <div className="relative flex">
                    <div
                        className={cn('flex w-full flex-col items-center justify-center')}
                        style={{ height: 'calc(100vh - 200px)' }}
                    >
                        <div className={styles.loading} />

                        <h3 className="text-lg font-semibold italic text-body"> {text}</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loader
