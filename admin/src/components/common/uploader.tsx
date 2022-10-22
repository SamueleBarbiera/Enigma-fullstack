import { UploadIcon } from '@components/icons/upload-icon'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Attachment } from '@ts-types/generated'
import { CloseIcon } from '@components/icons/close-icon'
import Loader from '@components/ui/loader/loader'
import { useTranslation } from 'next-i18next'
import { useUploadMutation } from '@data/upload/use-upload.mutation'
import Image from 'next/image'

const getPreviewImage = (value: Attachment[]) => {
    let images: Attachment[] = []

    images = Array.isArray(value) ? value : []

    return images
}
export default function Uploader(onChange: (arg0: Attachment[]) => void, value: Attachment[], multiple: boolean) {
    const { t } = useTranslation()
    const [files, setFiles] = useState<Attachment[]>(getPreviewImage(value))
    const { mutate: upload, isLoading: loading } = useUploadMutation()
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        multiple,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length) {
                upload(
                    acceptedFiles, // it will be an array of uploaded attachments
                    {
                        onSuccess: (data) => {
                            let mergedData
                            if (multiple) {
                                mergedData = files.concat(data)
                                setFiles(files.concat(data))
                            } else {
                                mergedData = data[0]
                                setFiles(data)
                            }
                            if (onChange) {
                                onChange(mergedData)
                            }
                        },
                    }
                )
            }
        },
    })

    const handleDelete = (image: string) => {
        const images = files.filter((file) => file.thumbnail !== image)
        setFiles(images)
        onChange(images)
    }
    const thumbs = files.map((file, idx) => {
        if (file.id) {
            return (
                <div
                    className="relative mt-2 inline-flex flex-col overflow-hidden rounded border border-border-200 me-2"
                    key={idx}
                >
                    <div className="flex h-16 w-16 min-w-0 items-center justify-center overflow-hidden bg-gray-300">
                        <Image layout="fill" src={file.original ?? ''} alt={''} />
                    </div>
                    {multiple ? (
                        <button
                            className="absolute top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-light shadow-xl outline-none end-1"
                            onClick={() => handleDelete(file.thumbnail!)}
                        >
                            <CloseIcon width={10} height={10} />
                        </button>
                    ) : null}
                </div>
            )
        }
    })

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.thumbnail!))
        },
        [files]
    )

    return (
        <section className="upload">
            <div
                {...getRootProps({
                    className:
                        'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-gray-500 focus:outline-none',
                })}
            >
                <input {...getInputProps()} />
                <UploadIcon className="text-muted-light" />
                <p className="mt-4 text-center text-sm text-body">
                    <span className="font-semibold text-accent">{t('text-upload-highlight')}</span>{' '}
                    {t('text-upload-message')} <br />
                    <span className="text-xs text-body">{t('text-img-format')}</span>
                </p>
            </div>

            {(!!thumbs.length || loading) && (
                <aside className="mt-2 flex flex-wrap">
                    {!!thumbs.length && thumbs}
                    {loading && (
                        <div className="mt-2 flex h-16 items-center ms-2">
                            <Loader simple={true} className="h-6 w-6" />
                        </div>
                    )}
                </aside>
            )}
        </section>
    )
}
