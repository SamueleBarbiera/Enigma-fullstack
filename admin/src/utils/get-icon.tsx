import { ReactElement, JSXElementConstructor, ReactFragment } from 'react'

interface Props {
    iconName: string
    [key: string]: any
    iconList: {
        [x: string]: any
        iconList?:
            | typeof import('../components/icons/category')
            | typeof import('../components/icons/type')
            | typeof import('../components/icons/brand')
            | typeof import('../components/icons/tag')
            | typeof import('../components/icons/sidebar')
            | typeof import('../components/icons/social')

        className?: string
    }
    rest?: undefined[]
}
export const getIcon = ({ iconList, iconName, ...rest }: Props) => {
 
    const TagName = iconList[iconName]
    return TagName ? <TagName {...rest} /> : <p className="text-sm text-red-500">{iconName} is not a valid icon</p>
}
