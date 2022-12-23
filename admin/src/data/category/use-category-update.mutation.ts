import { UpdateCategory } from '@ts-types/generated'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import Category from '@repositories/category'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { useTranslation } from 'next-i18next'
import { AxiosError } from 'axios'

export interface ICategoryUpdateVariables {
    variables: {
        id: string
        input: UpdateCategory
    }
}

export const useUpdateCategoryMutation = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation(
        ({ variables: { id, input } }: ICategoryUpdateVariables) =>
            Category.update(`${API_ENDPOINTS.CATEGORIES}/${id}`, input),
        {
            onSuccess: () => {
                //toast.success(t('common:successfully-updated'))
            },
            // Always refetch after error or success:
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.CATEGORIES])
            },
            onError: (error: AxiosError) => {
                const errorMessage = error.isAxiosError ? error.message : 'any error'
                if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
                toast.error(JSON.stringify(error))
                return errorMessage
            },
        }
    )
}
