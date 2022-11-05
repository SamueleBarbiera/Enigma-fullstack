import cn from 'classnames'

interface Props {
    className?: string
    text?: string
    showText?: boolean
    simple?: boolean
}

const Spinner = (props: Props) => {
    const { className = 'w-6 h-6', showText = true, text = 'Loading...', simple } = props
    return (
        <>
            <div
                className={cn('flex w-full flex-col items-center justify-center', className)}
                style={{ height: 'calc(100vh - 200px)' }}
            >
                <div className={'animate-spin'} />

                {showText && <h3 className="text-lg font-semibold italic text-body">{text}</h3>}
            </div>
        </>
    )
}

export default Spinner
