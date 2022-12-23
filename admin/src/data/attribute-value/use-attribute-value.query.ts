import AttributeValue from '@repositories/attribute-value'
import { useQuery } from '@tanstack/react-query'
import { AttributeValueCreateInput, AttributeValue as TAttributeValue } from '@ts-types/generated'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const fetchAttributeValue = async (id: string) => {
    const { data } = await AttributeValue.find(`${API_ENDPOINTS.ATTRIBUTE_VALUES}/${id}`)
    return { attributeValue: data }
}

type Props = {
    attributeValue: AttributeValueCreateInput
}

export const useAttributeValueQuery = (id: string) => {
    return useQuery<Props, Error>([API_ENDPOINTS.ATTRIBUTE_VALUES, id], () => fetchAttributeValue(id))
}
