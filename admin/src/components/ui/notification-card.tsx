import Image from 'next/image'

type NotificationCardType = {
    src?: string
    text?: string | React.ReactNode
    time?: string
}

const NotificationCard: React.FC<NotificationCardType> = ({ src, text, time }: NotificationCardType) => {
    return (
        <a href="#" className="flex items-start border-b border-border-200 bg-light px-4 pt-4 pb-3 hover:bg-gray-50">
            <Image
                className="h-8 w-8 rounded-full object-cover me-3"
                src={src ?? ''}
                width={40}
                height={40}
                alt="avatar"
            />

            <div className="-mt-1 flex flex-col">
                <p className="mb-1 text-sm text-body">{text}</p>
                <span className="text-sm text-muted">{time}</span>
            </div>
        </a>
    )
}

export default NotificationCard
