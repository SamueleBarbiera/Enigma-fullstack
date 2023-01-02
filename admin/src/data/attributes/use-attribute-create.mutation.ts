import { AttributeInput as atr, AttributeInput } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import Attribute from '@repositories/attribute'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-toastify'

export interface IAttributeCreateVariables {
    variables: {
        input: atr
    }
}

export const useCreateAttributeMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const { t } = useTranslation()

    return useMutation(
        ({ variables: { input } }: IAttributeCreateVariables) => Attribute.create(API_ENDPOINTS.ATTRIBUTES, input),
        {
            onSuccess: async () => {
                await router.push(`/${router.query.shop as string}${ROUTES.ATTRIBUTES}`)
            },
            // Always refetch after error or success:
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.ATTRIBUTES])
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
