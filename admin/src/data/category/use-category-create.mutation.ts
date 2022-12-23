import { CreateCategory } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import Category from '@repositories/category'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

export interface ICategoryCreateVariables {
    variables: { input: CreateCategory }
}

export const useCreateCategoryMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const { t } = useTranslation()
    return useMutation(
        ({ variables: { input } }: ICategoryCreateVariables) => Category.create(API_ENDPOINTS.CATEGORIES, input),
        {
            onSuccess: async () => {
                await router.push(ROUTES.CATEGORIES)
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
