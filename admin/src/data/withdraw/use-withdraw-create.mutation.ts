import { CreateWithdrawInput } from '@ts-types/generated'
import Withdraw from '@repositories/withdraw'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export interface IWithdrawCreateVariables {
    variables: {
        input: CreateWithdrawInput
    }
}

export const useCreateWithdrawMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation(
        ({ variables: { input } }: IWithdrawCreateVariables) => Withdraw.create(API_ENDPOINTS.WITHDRAWS, input),
        {
            onSuccess: async () => {
                await router.push(`/${router.query.shop as string}/withdraws`)
            },
            // Always refetch after error or success:
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.WITHDRAWS])
            },
        }
    )
}
