import { getLayout } from '@components/layout/layout'
import Container from '@components/ui/container'

import ShopsPageContent from '@components/shops/shops-page-content'

export { getStaticProps } from '@framework/ssr/shops'

export default function ShopsPage() {
    return (
        <>
            <ShopsPageContent />
            <Container></Container>
        </>
    )
}

ShopsPage.getLayout = getLayout
