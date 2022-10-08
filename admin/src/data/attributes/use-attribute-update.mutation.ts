import { AttributeInput } from '@ts-types/generated'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import Attribute from '@repositories/attribute'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { useTranslation } from 'next-i18next'

export interface IAttributeUpdateVariables {
    variables: {
        id: number | string
        input: AttributeInput
    }
}

export const useUpdateAttributeMutation = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation(
        ({ variables: { id, input } }: IAttributeUpdateVariables) =>
            Attribute.update(`${API_ENDPOINTS.ATTRIBUTES}/${id}`, input),
        {
            onSuccess: () => {
                toast.success(t('common:successfully-updated'))
            },
            // Always refetch after error or success:
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.ATTRIBUTES])
            },
        }
    )
}
