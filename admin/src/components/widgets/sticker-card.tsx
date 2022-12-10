import React from 'react'
import { IosArrowDown } from '@components/icons/ios-arrow-down'
import { IosArrowUp } from '@components/icons/ios-arrow-up'
import { useTranslation } from 'next-i18next'

interface Props {
    titleTransKey: string
    subtitleTransKey: string
    icon: any
    iconBgStyle: React.CSSProperties | undefined
    price: unknown
    indicator: string
    indicatorText: string | undefined
    note: string | undefined
    link: string | undefined
    linkText: string | undefined
}

const StickerCard: React.FC<Props> = ({
    titleTransKey,
    subtitleTransKey,
    icon,
    iconBgStyle,
    price,
    indicator,
    indicatorText,
    note,
    link,
    linkText,
}: Props) => {
    const { t } = useTranslation('widgets')
    return (
        <div className="flex h-full w-full flex-col rounded bg-light p-7">
            <div className="mb-auto flex w-full justify-between pb-8">
                <div className="flex w-full flex-col">
                    <span className="mb-1 text-base font-semibold text-heading">{t(titleTransKey)}</span>
                    <span className="text-xs font-semibold text-body">{t(subtitleTransKey)}</span>
                </div>

                <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 ms-3"
                    style={iconBgStyle}
                >
                    {icon}
                </div>
            </div>

            <span className="mb-2 text-xl font-semibold text-heading">{price}</span>
            {indicator === 'up' && (
                <span className="mb-12 inline-block text-sm font-semibold text-body" style={{ color: '#03D3B5' }}>
                    <IosArrowUp width="9px" height="11px" className="inline-block" /> {indicatorText}
                    <span className="text-sm font-normal text-body"> {note}</span>
                </span>
            )}
            {indicator === 'down' && (
                <span className="mb-12 inline-block text-sm font-semibold text-body" style={{ color: '#FC6687' }}>
                    <IosArrowDown width="9px" height="11px" className="inline-block" /> {indicatorText}
                    <span className="text-sm font-normal text-body"> {note}</span>
                </span>
            )}
            {link && (
                <a
                
                    className="text-xs font-semibold text-purple-700 no-underline"
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                >
                    {linkText}
                </a>
            )}
        </div>
    )
}

export default StickerCard
