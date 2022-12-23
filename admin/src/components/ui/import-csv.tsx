import { UploadIcon } from '@components/icons/upload-icon'
import { useDropzone } from 'react-dropzone'

interface Import {
    onDrop: (acceptedFiles: string | any[]) => void
    loading: boolean
    title: string
}

export default function ImportCsv({ onDrop, loading, title }: Import) {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            '.csv': ['.csv'],
        },
        multiple: false,
        onDrop,
    })

    return (
        <section className="upload">
            <div
                {...getRootProps({
                    className:
                        'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none p-5',
                })}
            >
                <input {...getInputProps()} />
                {loading && (
                    <span
                        className="h-[30px] w-[30px] animate-spin rounded-full border-2 border-t-2 border-transparent ms-2"
                        style={{
                            borderTopColor: 'rgb(var(--color-accent))',
                        }}
                    />
                )}
                {!loading && <UploadIcon className="text-muted-light" />}
                <p className="mt-4 text-center text-sm text-body">
                    <span className="font-semibold text-accent">{title}</span>
                </p>
            </div>
        </section>
    )
}
