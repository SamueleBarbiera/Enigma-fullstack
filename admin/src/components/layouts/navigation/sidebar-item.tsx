import Link from '@components/ui/link'
import { getIcon } from '@utils/get-icon'
import * as sidebarIcons from '@components/icons/sidebar'
import { useUI } from '@contexts/ui.context'

type ISidebar = {
    href: string
    icon: string
    label: string
}

const SidebarItem = ({ href, icon, label }: ISidebar) => {
    const { closeSidebar } = useUI()
    return (
        <Link href={href} className="flex w-full items-center text-start text-base text-body-dark focus:text-accent">
            {getIcon({
                iconList: sidebarIcons,
                iconName: icon,
                className: 'w-5 h-5 me-4',
            })}
            <span onClick={() => closeSidebar()}>{label}</span>
        </Link>
    )
}

export default SidebarItem
