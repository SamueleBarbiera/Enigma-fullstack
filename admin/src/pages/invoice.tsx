import InvoicePdf from '@components/order/invoice-pdf'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useOrderQuery } from '@data/order/use-order.query'
import { PDFViewer } from '@react-pdf/renderer'

const InvoicePage = () => {
    const { data, isLoading: loading, error } = useOrderQuery('1')
    if (loading) return <Loader showText={false} />
    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'any error'
        if (error instanceof Error) console.log(`❌ Error message: ${errorMessage}`)
        return <ErrorMessage message={errorMessage} />
    }
    return (
        <PDFViewer style={{ width: '100vw', height: '100vh' }}>
            <InvoicePdf order={data} />
        </PDFViewer>
    )
}

export default InvoicePage
