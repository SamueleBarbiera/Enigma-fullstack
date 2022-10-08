import ConfirmationCard from '@components/common/confirmation-card'
import { useModalAction, useModalState } from '@components/ui/modal/modal.context'
import { useDeleteCouponMutation } from '@data/coupon/use-coupon-delete.mutation'

const CouponDeleteView = () => {
    const { mutate: deleteCoupon, isLoading: loading } = useDeleteCouponMutation()
    const data = useModalState()
    const closeModal = useModalAction()
    function handleDelete() {
        deleteCoupon(data.data as string)
        closeModal.closeModal()
    }
    return <ConfirmationCard onCancel={closeModal.closeModal} onDelete={handleDelete} deleteBtnLoading={loading} />
}

export default CouponDeleteView
