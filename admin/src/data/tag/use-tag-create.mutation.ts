import { CreateTagInput } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import Tag from '@repositories/tag'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export interface ITagCreateVariables {
    variables: { input: CreateTagInput }
}

export const useCreateTagMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation(({ variables: { input } }: ITagCreateVariables) => Tag.create(API_ENDPOINTS.TAGS, input), {
        onSuccess: async () => {
            await router.push(ROUTES.TAGS)
        },
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.TAGS])
        },
    })
}
