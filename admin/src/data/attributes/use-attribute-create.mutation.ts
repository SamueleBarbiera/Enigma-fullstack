import { AttributeInput } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import Attribute from '@repositories/attribute'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export interface IAttributeCreateVariables {
    variables: {
        input: AttributeInput
    }
}

export const useCreateAttributeMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

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
        }
    )
}
