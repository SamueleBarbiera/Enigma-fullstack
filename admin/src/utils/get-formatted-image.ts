import { Attachment } from '@ts-types/generated'
import { Maybe } from 'yup/lib/types'

export interface IImage {
    id: string
    thumbnail: string
    original: string
}
export function getFormattedImage(image: Maybe<Attachment> | undefined) {
    if (!image) return null
    const { /*__typename,*/ ...rest } = image
    return { ...rest }
}
