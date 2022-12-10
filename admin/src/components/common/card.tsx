import cn from 'classnames'

interface Props {
    className?: string
    [key: string]: unknown
}

const Card = ({ className, ...props }: Props) => {
    return <div className={cn('rounded bg-light p-5 shadow md:p-8', className)} {...props} />
}

export default Card
