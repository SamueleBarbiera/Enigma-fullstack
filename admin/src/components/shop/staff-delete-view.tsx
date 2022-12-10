import ConfirmationCard from '@components/common/confirmation-card'
import { useModalAction, useModalState } from '@components/ui/modal/modal.context'
import { useRemoveStaffMutation } from '@data/shop/use-staff-delete.mutation'
import { getErrorMessage } from '@utils/form-error'

const StaffDeleteView = () => {
    const { mutate: removeStaffByID, isLoading: loading } = useRemoveStaffMutation()

    const { data } = useModalState()
    const { closeModal } = useModalAction()
    function handleDelete() {
        try {
            removeStaffByID(data as string)
            closeModal()
        } catch (error) {
            console.log('🚀 - file: staff-delete-view.tsx - line 16 - handleDelete - error', error)
            closeModal()
            getErrorMessage(error)
        }
    }
    return <ConfirmationCard onCancel={closeModal} onDelete={handleDelete} deleteBtnLoading={loading} />
}

export default StaffDeleteView
