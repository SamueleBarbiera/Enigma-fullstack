import { useMutation, useQueryClient } from '@tanstack/react-query'
import Import from '@repositories/import'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

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
            onError: (error: Error) => {
                toast.error(t(`common:${error.message}`))
            },
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.PRODUCTS])
            },
        }
    )
}
