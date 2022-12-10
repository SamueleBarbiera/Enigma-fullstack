import { CoreApi } from '@framework/utils/core-api'
import { API_ENDPOINTS } from '@framework/utils/endpoints'
import { useQuery } from '@tanstack/react-query'
import { SettingsType } from '@framework/types'
import { InitialValue } from '@contexts/settings.context'

const SettingsService = new CoreApi(API_ENDPOINTS.SETTINGS)

export const fetchSettings = async () => {
    const { data } = await SettingsService.findAll()
    return { settings: data }
}
type SettingsResponse = {
    settings: InitialValue
}
export const useSettingsQuery = () => {
    return useQuery<SettingsResponse, Error>([API_ENDPOINTS.SETTINGS], fetchSettings)
}
