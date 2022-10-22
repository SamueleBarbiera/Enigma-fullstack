import Analytics from '@repositories/analytics'
import { useQuery } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const fetchAnalytics = async () => {
    return await Analytics.analytics(API_ENDPOINTS.ANALYTICS)
}

export const useAnalyticsQuery = () => {
    return useQuery([API_ENDPOINTS.ANALYTICS], fetchAnalytics)
}
