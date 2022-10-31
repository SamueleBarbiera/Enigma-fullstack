import BannerCard from '@components/common/banner-card'
import Container from '@components/ui/container'
import BrandBlock from '@containers/brand-block'
import CategoryBlock from '@containers/category-block'
import CategoryGridBlock from '@containers/category-grid-block'
import { getLayout } from '@components/layout/layout'
import BannerWithProducts from '@containers/banner-with-products'
import NewArrivalsProductFeed from '@components/product/feeds/new-arrivals-product-feed'
import Divider from '@components/ui/divider'

import Support from '@components/common/support'
import Instagram from '@components/common/instagram'
import ProductsFlashSaleBlock from '@containers/product-flash-sale-block'
import ProductsFeatured from '@containers/products-featured'
import BannerSliderBlock from '@containers/banner-slider-block'
import ExclusiveBlock from '@containers/exclusive-block'
import HeroWithCategoryFlash from '@containers/hero-with-category-flash'

import { ROUTES } from '@lib/routes'
import {
    promotionBanner,
    vintageDemoGridBanner as gridBanner,
    vintageDemoProductBanner as productBanner,
    vintageDemoBanner as banner,
} from '@data/static/banners'

export { getStaticProps } from '@framework/ssr/homepage/vintage'

export default function Home() {
    return (
        <>
            <Container>
                <HeroWithCategoryFlash data={gridBanner} />
            </Container>
            <BannerSliderBlock data={promotionBanner} />
            <Container>
                <CategoryBlock sectionHeading="text-shop-by-category" />
                <BannerWithProducts
                    sectionHeading="text-on-selling-products"
                    categorySlug="/search"
                    variant="reverse"
                    data={productBanner}
                />
                <BannerCard
                    data={banner[0]}
                    href={`${ROUTES.COLLECTIONS}/${banner[0]!.slug}`}
                    className="mb-11 md:mb-12 lg:mb-14 2xl:mb-16"
                />
                <ProductsFeatured sectionHeading="text-featured-products" variant="center" />
                <BannerCard
                    data={banner[1]}
                    href={`${ROUTES.COLLECTIONS}/${banner[1]!.slug}`}
                    className="mb-11 md:mb-12 lg:mb-14 2xl:mb-16"
                />
                <ProductsFlashSaleBlock date={'2023-03-01T01:02:03'} />
                <BrandBlock sectionHeading="text-top-brands" />
                <ExclusiveBlock />
                <NewArrivalsProductFeed />
                <BannerCard
                    data={banner[2]}
                    href={`${ROUTES.COLLECTIONS}/${banner[2]!.slug}`}
                    className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
                />
                <CategoryGridBlock sectionHeading="text-featured-categories" />
                <Support />
                <Instagram />
            </Container>
            <Divider className="mb-0" />
        </>
    )
}

Home.getLayout = getLayout
