import { useMutation, useQueryClient } from '@tanstack/react-query'
import Attachment from '@repositories/upload'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

export const useUploadMutation = () => {
    const queryClient = useQueryClient()
    return useMutation((input: any) => Attachment.upload(API_ENDPOINTS.ATTACHMENTS, input), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.SETTINGS])
        },
        onError: (error: AxiosError) => {
            const errorMessage = error.isAxiosError ? error.message : 'Unknown error'
            if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
            toast.error(errorMessage)
            return errorMessage
        },
    })
}
