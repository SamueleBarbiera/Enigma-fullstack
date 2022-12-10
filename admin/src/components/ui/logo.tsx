import Image from 'next/image'
import Link from '@components/ui/link'
import cn from 'classnames'
import { siteSettings } from '@settings/site.settings'
import { useSettings } from '@contexts/settings.context'

const Logo: React.FC<React.AnchorHTMLAttributes<unknown>> = ({
    className,
    ...props
}: React.AnchorHTMLAttributes<unknown>) => {
    const setting = useSettings()
    return (
        <Link href={siteSettings.logo.href} className={cn('inline-flex', className)} {...props}>
            <span
                className="relative overflow-hidden"
                style={{
                    width: siteSettings.logo.width,
                    height: siteSettings.logo.height,
                }}
            >
                <Image
                    width={130}
                    height={30}
                    src={setting.logo?.original ?? siteSettings.logo.url}
                    alt={setting.siteTitle ?? siteSettings.logo.alt}
                    loading="lazy"
                />
            </span>
        </Link>
    )
}

export default Logo
