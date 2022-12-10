import { useMutation, useQueryClient } from '@tanstack/react-query'
import Import from '@repositories/import'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'
import { AxiosError } from 'axios'

type Input = {
    shop_id: string
    csv: any
}
export const useImportVariationOptionsMutation = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation('common')

    return useMutation(
        (input: Input) => {
            return Import.importCsv(API_ENDPOINTS.IMPORT_VARIATION_OPTIONS, input)
        },
        {
            onSuccess: () => {
                toast.success(t('common:variation-options-imported-successfully'))
            },
            onError: (error: AxiosError) => {
                const errorMessage = error.isAxiosError ? error.message : 'Unknown error'
                if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
                toast.error(JSON.stringify(error))
                return errorMessage
            },
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.PRODUCTS])
            },
        }
    )
}
