import ConfirmationCard from '@components/common/confirmation-card'
import { useModalAction, useModalState } from '@components/ui/modal/modal.context'
import { useDeleteAttributeMutation } from '@data/attributes/use-attribute-delete.mutation'

const AttributeDeleteView = () => {
    const { mutate: deleteAttributeByID, isLoading: loading } = useDeleteAttributeMutation()

    const { data } = useModalState()
    const { closeModal } = useModalAction()
    function handleDelete() {
        deleteAttributeByID(data.data as string)
        closeModal()
    }
    return <ConfirmationCard onCancel={closeModal} onDelete={handleDelete} deleteBtnLoading={loading} />
}

export default AttributeDeleteView
