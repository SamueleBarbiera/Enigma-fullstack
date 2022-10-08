import { AddStaffInput } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import Shop from '@repositories/shop'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export interface IAddStaffVariables {
    variables: AddStaffInput
}

export const useAddStaffMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation(({ variables }: IAddStaffVariables) => Shop.addStaff(API_ENDPOINTS.ADD_STAFF, variables), {
        onSuccess: async () => {
            await router.push(`/${router.query.shop as string}${ROUTES.STAFFS}`)
        },
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.STAFFS])
        },
    })
}
