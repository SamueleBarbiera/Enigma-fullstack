import { UpdateTagInput } from '@ts-types/generated'
import { MutationFunction, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import Tag from '@repositories/tag'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { useTranslation } from 'next-i18next'
import { AxiosError } from 'axios'
export interface ITagUpdateVariables {
    variables: {
        id: string
        input: UpdateTagInput
    }
}

export const useUpdateTagMutation = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation(
        (variables: { id: string; input: UpdateTagInput }) => {
            return Tag.update(`${API_ENDPOINTS.TAGS}/${variables.id}`, variables.input)
        },
        {
            onSuccess: () => {
                toast.success(t('common:successfully-updated'))
            },
            // Always refetch after error or success:
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.TAGS])
            },
            onError: (error: AxiosError) => {
                const errorMessage = error.isAxiosError ? error.message : 'Unknown error'
                if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
                toast.error(JSON.stringify(error))
                return errorMessage
            },
        }
    )
}
