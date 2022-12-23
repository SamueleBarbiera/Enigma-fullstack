import { AddStaffInput } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import Shop from '@repositories/shop'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

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
        onError: (error: AxiosError) => {
            const errorMessage = error.isAxiosError ? error.message : 'any error'
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request)
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error)
            }

            if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
            toast.error(JSON.stringify(error))
            return errorMessage
        },
    })
}
