import RCPagination, { PaginationProps } from 'rc-pagination'
import { ArrowNext } from '@components/icons/arrow-next'
import { ArrowPrev } from '@components/icons/arrow-prev'
import 'rc-pagination/assets/index.css'

const Pagination: React.FC<PaginationProps> = (props) => {
    console.log("🚀 - file: pagination.tsx:7 - props", props)
    return <RCPagination nextIcon={<ArrowNext />} prevIcon={<ArrowPrev />} {...props} />
}

export default Pagination
