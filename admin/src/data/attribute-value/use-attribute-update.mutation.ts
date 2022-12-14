import { AttributeValueUpdateInput } from '@ts-types/generated'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import AttributeValue from '@repositories/attribute-value'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { useTranslation } from 'next-i18next'
import { AxiosError } from 'axios'

export interface IAttributeValueUpdateVariables {
    variables: {
        id: number | string
        input: AttributeValueUpdateInput
    }
}

export const useUpdateAttributeValueMutation = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation(
        ({ variables: { id, input } }: IAttributeValueUpdateVariables) =>
            AttributeValue.update(`${API_ENDPOINTS.ATTRIBUTE_VALUES}/${id}`, input),
        {
            onSuccess: () => {
                //toast.success(t('common:successfully-updated'))
            },
            // Always refetch after error or success:
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.ATTRIBUTE_VALUES])
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
