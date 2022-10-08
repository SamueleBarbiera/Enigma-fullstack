import { CreateTypeInput } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import Type from '@repositories/type'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export interface ITypeCreateVariables {
    variables: {
        input: CreateTypeInput
    }
}

export const useCreateTypeMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation(({ variables: { input } }: ITypeCreateVariables) => Type.create(API_ENDPOINTS.TYPES, input), {
        onSuccess: async () => {
            await router.push(ROUTES.BRANDS)
        },
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.TYPES])
        },
    })
}
