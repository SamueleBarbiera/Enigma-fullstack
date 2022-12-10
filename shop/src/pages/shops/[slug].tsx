import Container from '@components/ui/container'
import { getLayout } from '@components/layout/layout'

import ShopsSingleDetails from '@components/shops/shops-single-details'

export { getStaticPaths, getStaticProps } from '@framework/ssr/shop'

export default function ShopDetailsPage({ data }: any) {
    return (
        <div className="border-t border-gray-300">
            {data?.shop && <ShopsSingleDetails data={data.shop} />}
            <Container></Container>
        </div>
    )
}

ShopDetailsPage.getLayout = getLayout
