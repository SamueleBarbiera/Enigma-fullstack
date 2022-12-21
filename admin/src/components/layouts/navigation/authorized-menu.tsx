import cn from 'classnames'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Avatar from '@components/common/avatar'
import Link from '@components/ui/link'
import { siteSettings } from '@settings/site.settings'
import { useTranslation } from 'next-i18next'
import { useMeQuery } from '@data/user/use-me.query'

export default function AuthorizedMenu() {
    const { data } = useMeQuery()
    console.log('🚀 - file: authorized-menu.tsx:12 - AuthorizedMenu - data', data)
    const { t } = useTranslation('common')

    // Again, we're using framer-motion for the transition effect
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center focus:outline-none">
                <Avatar
                    src={data?.profile?.avatar?.thumbnail ?? siteSettings.avatar.placeholder}
                    width={500}
                    height={500}
                    alt="avatar"
                />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    as="ul"
                    className="shadow-700 absolute right-0 mt-1 w-48 origin-top-right rounded bg-white py-4 focus:outline-none"
                >
                    {siteSettings.authorizedLinks.map(({ href, labelTransKey }) => (
                        <Menu.Item key={`${href}${labelTransKey}`}>
                            {({ active }) => (
                                <li className="cursor-pointer border-b border-gray-100 last:border-0">
                                    <Link
                                        href={href}
                                        className={cn(
                                            'block px-4 py-3 text-sm font-semibold capitalize transition duration-200 hover:text-accent',
                                            active ? 'text-accent' : 'text-heading'
                                        )}
                                    >
                                        {t(labelTransKey)}
                                    </Link>
                                </li>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
