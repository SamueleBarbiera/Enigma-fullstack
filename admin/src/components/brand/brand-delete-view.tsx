import ConfirmationCard from '@components/common/confirmation-card'
import { useModalAction, useModalState } from '@components/ui/modal/modal.context'
import { useDeleteTypeMutation } from '@data/type/use-type-delete.mutation'

const TypeDeleteView = () => {
    const { mutate: deleteType, isLoading: loading } = useDeleteTypeMutation()

    const data = useModalState()
    const { closeModal } = useModalAction()
    function handleDelete() {
        deleteType(data.data as string)
        closeModal()
    }
    return <ConfirmationCard onCancel={closeModal} onDelete={handleDelete} deleteBtnLoading={loading} />
}

export default TypeDeleteView
