import { DehydratedState } from '@tanstack/react-query'
import { UserConfig } from 'next-i18next'

export interface MyApp {
    _nextI18Next: NextI18Next
    dehydratedState: DehydratedState
}

export interface NextI18Next {
    ns: string[]
    initialI18nStore: InitialI18nStore
    initialLocale: string
    userConfig: UserConfig
}

export interface InitialI18nStore {
    it: It
}

export interface It {
    common: unknown
    menu: unknown
    forms: unknown
    footer: unknown
}

export interface Common {
    'error-heading': string
    'error-sub-heading': string
    'support-heading': string
    'support-sub-heading': string
    'app-heading': string
    'app-sub-heading': string
    'collection-title-one': string
    'collection-description-one': string
    'collection-title-two': string
    'collection-description-two': string
    'collection-title-three': string
    'collection-description-three': string
    'collection-description-four': string
    'collection-title-four': string
    'feature-title-one': string
    'feature-description-one': string
    'feature-title-two': string
    'feature-description-two': string
    'feature-title-three': string
    'feature-description-three': string
    'feature-title-four': string
    'feature-description-four': string
    'breadcrumb-home': string
    'breadcrumb-search': string
    'breadcrumb-products': string
    'breadcrumb-collection': string
    'text-page-explore': string
    'text-page-header': string
    'text-page-order': string
    'text-page-checkout': string
    'text-page-contact-us': string
    'text-page-my-account': string
    'text-page-terms-of-service': string
    'text-page-privacy-policy': string
    'text-page-faq': string
    'text-subscribe-heading': string
    'text-subscribe-description': string
    'text-subscribe-sending': string
    'text-subscribe-error': string
    'text-banner-thumbnail': string
    'text-brand-thumbnail': string
    'text-support-thumbnail': string
    'text-category-thumbnail': string
    'text-card-thumbnail': string
    'text-instagram-thumbnail': string
    'text-app-thumbnail': string
    'text-manage-your': string
    'text-subscribe-success': string
    'text-dashboard': string
    'text-account-dashboard': string
    'text-order': string
    'text-orders': string
    'text-status': string
    'text-actions': string
    'text-filters': string
    'text-colors': string
    'text-clear-all': string
    'text-category': string
    'text-tags': string
    'text-sku': string
    'text-brands': string
    'text-gender': string
    'text-account-details': string
    'text-change-password': string
    'text-change-your-password': string
    'text-logout': string
    'text-unit-price': string
    'text-price': string
    'text-shopping-cart': string
    'text-empty-cart': string
    'text-proceed-to-checkout': string
    'text-your-order': string
    'text-product': string
    'text-add-to-cart': string
    'text-view-cart': string
    'text-view-details': string
    'text-shipping': string
    'text-shipping-address': string
    'text-sub-total': string
    'text-total': string
    'text-order-number': string
    'text-date': string
    'text-note': string
    'text-map': string
    'text-payment-method': string
    'text-free': string
    'text-close': string
    'text-or': string
    'text-and': string
    'text-account': string
    'text-no-account': string
    'text-have-account': string
    'text-back-to': string
    'text-login': string
    'text-sign-in': string
    'text-register': string
    'text-terms': string
    'text-policy': string
    'text-forgot-password': string
    'text-reset-password': string
    'text-get-in-touch': string
    'text-find-us-here': string
    'text-address': string
    'text-address-details': string
    'text-email': string
    'text-email-details': string
    'text-phone': string
    'text-phone-details': string
    'text-order-received': string
    'text-pay-cash': string
    'text-order-details': string
    'text-details': string
    'text-recent-orders': string
    'text-discount-tag': string
    'text-time-over': string
    'text-days': string
    'text-hours': string
    'text-mins': string
    'text-secs': string
    'text-fashion': string
    'text-sports': string
    'text-man': string
    'text-woman': string
    'text-watch': string
    'text-new-year': string
    'text-exclusive': string
    'text-sold': string
    'text-available': string
    'text-see-all-product': string
    'text-section-title': string
    'text-flash-sale': string
    'text-shop-by-category': string
    'text-featured-categories': string
    'text-top-brands': string
    'text-featured-products': string
    'text-on-selling-products': string
    'text-top-products': string
    'text-related-products': string
    'text-new-arrivals': string
    'text-best-sellers': string
    'text-casual-wear': string
    'text-items': string
    'text-sorting-options': string
    'text-newest': string
    'text-oldest': string
    'text-popularity': string
    'text-price-low-high': string
    'text-price-high-low': string
    'text-instagram': string
    'text-twitter': string
    'text-facebook': string
    'text-youtube': string
    'text-login-with-facebook': string
    'text-login-with-google': string
    'text-summer-collection': string
    'text-subscribe-now': string
    'text-newsletter-title': string
    'text-newsletter-subtitle': string
    'text-collection-list': string
    'text-collections': string
    'text-accept-cookies': string
    'text-cookies-title': string
    'login-helper': string
    'registration-helper': string
    'forgot-password-helper': string
    'button-load-more': string
    'button-go-home': string
    'button-place-order': string
    'button-send-message': string
    'button-submit': string
    'button-view': string
    'button-save': string
    'button-app-store': string
    'button-play-store': string
    'button-subscribe': string
    'button-men-exclusive': string
    'button-women-exclusive': string
    'button-view-collection': string
    'button-update': string
    'text-tax-calculation-label': string
    'button-chat-services': string
    'text-successfully-updated': string
    'text-tax-checkout-calculation': string
    'text-shipping-calculation-label': string
    'text-tax-shipping-calculation': string
    'text-shipping-cost': string
    'text-discount-label': string
    'text-search-result': string
    'text-shop': string
    'text-no-products-found': string
    'text-social': string
    'text-contact': string
    'text-call-us': string
    'text-website': string
    'text-no-address': string
    'text-no-contact': string
    'text-no-email': string
    'contact-success-message': string
    'text-no-featured-products-found': string
    'text-no-flash-products-found': string
    'text-no-on-selling-products-found': string
    'text-no-best-selling-products-found': string
    'text-add': string
    'text-type': string
    'text-account-address': string
    'text-billing': string
    'text-title': string
    'text-country': string
    'text-city': string
    'text-state': string
    'text-zip': string
    'text-street-address': string
    'text-save': string
    'text-update': string
    'text-back-to-home': string
    'text-total-amount': string
    'text-tax': string
    'text-shipping-charge': string
    'text-discount': string
    'text-total-item': string
    'text-deliver-time': string
    'text-quantity': string
    'text-sub-orders': string
    'text-tracking-number': string
    'text-total-price': string
    'text-view': string
    'text-add-new': string
    'text-send-otp': string
    'text-otp-code': string
    'text-verify-code': string
    'text-otp-send-failed': string
    'text-otp-verify-failed': string
    'text-no-phone': string
    'text-no-google-map-key': string
    'text-apply': string
    'text-no-categories-found': string
    'text-contact-number': string
    'text-billing-address': string
    'text-have-coupon': string
    'text-enter-coupon': string
    'text-no-products': string
    'text-check-availability': string
    'text-choose-payment': string
    'text-add-new-address': string
    'text-update-address': string
    'text-delivery-schedule': string
    'text-no-delivery-time-found': string
    'text-cod-message': string
    'text-message-sub-order': string
    'text-calculated-checkout': string
    'text-item': string
    'text-no-brands-found': string
    'text-pay-first': string
    'text-gateway-required': string
    'contact-number-required': string
    'delete-item-confirm': string
    'button-delete': string
    'button-cancel': string
    'text-confirm': string
    'error-title-required': string
    'error-country-required': string
    'error-city-required': string
    'error-state-required': string
    'error-zip-required': string
    'error-street-required': string
    'text-coupon-required': string
    'credential-wrong': string
    'enough-permission': string
    'ENIGMA_ERROR.NOT_FOUND': string
    'ENIGMA_ERROR.NOT_AUTHORIZED': string
    'ENIGMA_ERROR.EMPTY_MOBILE_NUMBER': string
    'ENIGMA_ERROR.INVALID_CREDENTIALS': string
    'ENIGMA_ERROR.SOMETHING_WENT_WRONG': string
    'ENIGMA_ERROR.PAYMENT_FAILED': string
    'ENIGMA_ERROR.OTP_SEND_FAIL': string
    'ENIGMA_ERROR.OTP_VERIFICATION_FAILED': string
    'ENIGMA_MESSAGE.NOT_FOUND': string
    'ENIGMA_ERROR.OPERATION_NOT': string
    'ENIGMA_ERROR.INSUFFICIENT_BALANCE': string
    'ENIGMA_ERROR.WITHDRAW_MUST_BE_ATTACHED_TO_SHOP': string
    'ENIGMA_ERROR.PLEASE_LOGIN_USING_FACEBOOK_OR_GOOGLE': string
    'ENIGMA_ERROR.ACTION_NOT_VALID': string
    'ENIGMA_ERROR.SHOP_NOT_APPROVED': string
    'ENIGMA_MESSAGE.CHECK_INBOX_FOR_PASSWORD_RESET_EMAIL': string
    'ENIGMA_MESSAGE.SOMETHING_WENT_WRONG': string
    'ENIGMA_MESSAGE.TOKEN_IS_VALID': string
    'ENIGMA_MESSAGE.INVALID_TOKEN': string
    'ENIGMA_MESSAGE.PASSWORD_RESET_SUCCESSFUL': string
    'ENIGMA_MESSAGE.INVALID_CREDENTIALS': string
    'ENIGMA_MESSAGE.EMAIL_SENT_SUCCESSFUL': string
    'ENIGMA_MESSAGE.OLD_PASSWORD_INCORRECT': string
    'text-brand': string
    'text-brand-colon': string
    'text-shop-colon': string
    'text-address-colon': string
    'text-shops-title': string
    'text-more-info': string
    'text-now-call': string
    'text-website-colon': string
    'text-visit-site': string
    'text-hello': string
    'text-call-now': string
    'text-no-order-found': string
    'text-no-result-found': string
    'text-load-more-products': string
    'error-add-both-address': string
    'password-update-success': string
    'add-to-cart': string
    'text-login-mobile': string
    'text-testimonial': string
    'text-browse-categories': string
    'text-products': string
}

export interface Menu {
    'menu-demos': string
    'menu-modern': string
    'menu-standard': string
    'menu-minimal': string
    'menu-vintage': string
    'menu-classic': string
    'menu-trendy': string
    'menu-elegant': string
    'menu-refined': string
    'menu-fashion': string
    'menu-men-wear': string
    'menu-women-wear': string
    'menu-casual-wear': string
    'menu-search': string
    'menu-users': string
    'menu-my-account': string
    'menu-sign-in': string
    'menu-sign-up': string
    'menu-forget-password': string
    'menu-pages': string
    'menu-faq': string
    'menu-privacy-policy': string
    'menu-terms-condition': string
    'menu-contact-us': string
    'menu-checkout': string
    'menu-collection': string
    'menu-category': string
    'menu-order': string
    'menu-404': string
    'menu-top-wear': string
    'menu-t-shirt': string
    'menu-casual-shirts': string
    'menu-formal-shirts': string
    'menu-blazwers-coats': string
    'menu-suits': string
    'menu-jackets': string
    'menu-belt-scarves': string
    'menu-watches-wearables': string
    'menu-western-wear': string
    'menu-dresses': string
    'menu-jumpsuits': string
    'menu-tops-shirts': string
    'menu-shorts-skirts': string
    'menu-shurgs': string
    'menu-blazers': string
    'menu-plus-size': string
    'menu-sunglasses-frames': string
    'menu-footwear': string
    'menu-sports-active-wear': string
    'menu-clothing': string
    'menu-flats': string
    'menu-casual-shoes': string
    'menu-heels': string
    'menu-boots': string
    'menu-sports-accessories': string
    'menu-lingerie-sleepwear': string
    'menu-bra': string
    'menu-briefs': string
    'menu-sleepwear': string
    'menu-makeup': string
    'menu-skincare': string
    'menu-premium-beauty': string
    'menu-lipsticks': string
    'menu-gadgets': string
    'menu-smart-wearables': string
    'menu-headphones': string
    'menu-jewellers': string
    'menu-fashion-jewellers': string
    'menu-fine-jewellers': string
    'menu-backpacks': string
    'menu-handbags-wallets': string
    'menu-shops': string
    'menu-admin': string
}

export interface Forms {
    'email-error': string
    'email-required': string
    'password-required': string
    'password-old-required': string
    'password-new-required': string
    'name-required': string
    'first-name-required': string
    'display-name-required': string
    'name-subject': string
    'address-required': string
    'phone-required': string
    'last-name-required': string
    'label-name-required': string
    'label-email-required': string
    'label-male': string
    'label-female': string
    'label-name': string
    'label-email': string
    'label-password': string
    'label-password-star': string
    'label-old-password': string
    'label-old-password-star': string
    'label-new-password': string
    'label-new-password-star': string
    'label-confirm-password-star': string
    'label-subject': string
    'label-subject-star': string
    'label-message': string
    'label-message-star': string
    'label-first-name': string
    'label-your-rating': string
    'label-last-name': string
    'label-name-star': string
    'label-email-star': string
    'label-address': string
    'label-phone': string
    'label-city': string
    'label-country': string
    'label-state': string
    'label-street-address': string
    'label-display-name': string
    'label-postcode': string
    'label-order-notes': string
    'label-remember-me': string
    'label-save-information': string
    'label-save-review-information': string
    'placeholder-search': string
    'placeholder-name': string
    'placeholder-email': string
    'placeholder-subject': string
    'placeholder-message': string
    'placeholder-email-subscribe': string
    'placeholder-order-notes': string
    'error-subject-required': string
    'error-description-required': string
    'error-email-format': string
    'error-email-required': string
    'error-name-required': string
    'error-credential-wrong': string
    'text-login-mobile': string
    'error-code-required': string
    'error-min-code': string
}

export interface Footer {
    'text-copyright': string
    'text-all-rights-reserved': string
    'widget-title-social': string
    'widget-title-contact': string
    'widget-title-about': string
    'widget-title-customer-care': string
    'widget-title-our-information': string
    'widget-title-top-categories': string
    'link-instagram': string
    'link-twitter': string
    'link-facebook': string
    'link-youtube': string
    'link-contact-us': string
    'link-email': string
    'link-email-two': string
    'link-phone': string
    'link-support-center': string
    'link-customer-support': string
    'link-about-us': string
    'link-copyright': string
    'link-faq': string
    'link-shipping': string
    'link-exchanges': string
    'link-privacy': string
    'link-terms': string
    'link-return-policy': string
    'link-site-map': string
    'link-men-wear': string
    'link-women-wear': string
    'link-kids-wear': string
    'link-sports-wear': string
    'payment-master-card': string
    'payment-visa': string
    'payment-paypal': string
    'payment-jcb': string
    'payment-skrill': string
    'widget-title-community': string
    'link-announcements': string
    'link-answer-center': string
    'link-discussion-boards': string
    'link-giving-works': string
}

export interface I18n {
    locales: string[]
    defaultLocale: string
}

export interface Default {
    i18n: I18n2
    localePath: string
    reloadOnPrerender: boolean
}

export interface I18n2 {
    locales: string[]
    defaultLocale: string
}

export interface State {
    data: Data
    dataUpdateCount: number
    dataUpdatedAt: number
    error: any
    errorUpdateCount: number
    errorUpdatedAt: number
    fetchFailureCount: number
    fetchFailureReason: any
    fetchMeta: any
    isInvalidated: boolean
    status: string
    fetchStatus: string
}

export interface Data {
    settings?: Settings
    data?: Daum[]
}

export interface Settings {
    id: number
    options: Options
    created_at: string
    updated_at: string
}

export interface Options {
    seo: Seo
    logo: Logo
    currency: string
    taxClass: number
    siteTitle: string
    signupPoints: any
    siteSubtitle: string
    shippingClass: number
    contactDetails: ContactDetails
    minimumOrderAmount: number
    currencyToWalletRatio: any
}

export interface Seo {
    ogImage: any[]
    ogTitle: any
    metaTags: any
    metaTitle: any
    canonicalUrl: any
    ogDescription: any
    twitterHandle: any
    metaDescription: any
    twitterCardType: any
}

export interface Logo {
    id: number
    original: string
    thumbnail: string
}

export interface ContactDetails {
    email: string
    contact: string
    socials: Social[]
    website: string
    location: any[]
}

export interface Social {
    url: string
    label: string
}

export interface Daum {
    id: number
    name: string
    settings?: any[]
    slug: string
    icon?: string
    promotional_sliders: any
    images?: Image[]
    created_at: string
    updated_at: string
    description?: string
    type_id?: number
    price?: number
    shop_id?: number
    sale_price?: number
    sku?: string
    quantity?: number
    in_stock?: number
    is_taxable?: number
    shipping_class_id: any
    status?: string
    product_type?: string
    unit?: string
    height?: string
    width?: string
    length?: string
    image: any
    gallery?: Gallery[]
    deleted_at: any
    max_price?: number
    min_price?: number
    video: any
    orders_count?: number
    sold?: number
    type?: Type
    shop?: Shop
    categories?: Category[]
    tags?: Tag[]
    variations?: any[]
    banner_image?: BannerImage2
    details?: string
    parent: any
    products_count?: number
    parent_id: any
    children?: any[]
}

export interface Image {
    key: string
    image: Image2[]
}

export interface Image2 {
    id: number
    original: string
    thumbnail: string
}

export interface Gallery {
    id: number
    original: string
    thumbnail: string
}

export interface Type {
    id: number
    name: string
    settings: any[]
    slug: string
    icon: string
    promotional_sliders: any
    images: Image3[]
    created_at: string
    updated_at: string
}

export interface Image3 {
    key: string
    image: Image4[]
}

export interface Image4 {
    id: number
    original: string
    thumbnail: string
}

export interface Shop {
    id: number
    owner_id: number
    name: string
    slug: string
    description: string
    cover_image: any
    logo: Logo2
    is_active: number
    address: Address
    settings: Settings2
    created_at: string
    updated_at: string
}

export interface Logo2 {
    id: number
    original: string
    thumbnail: string
}

export interface Address {
    zip: string
    city: string
    state: string
    country: string
    street_address: string
}

export interface Settings2 {
    contact: string
    socials: any[]
    website: string
    location: any[]
}

export interface Category {
    id: number
    name: string
    slug: string
    icon: string
    image: Image5[]
    banner_image: BannerImage
    details: string
    parent: any
    created_at: string
    updated_at: string
    deleted_at: any
    parent_id: any
    pivot: Pivot
}

export interface Image5 {
    id: number
    original: string
    thumbnail: string
}

export interface BannerImage {
    id: number
    original: string
    thumbnail: string
}

export interface Pivot {
    product_id: number
    category_id: number
}

export interface Tag {
    id: number
    name: string
    slug: string
    icon?: string
    image: any
    details?: string
    created_at: string
    updated_at: string
    deleted_at: any
    pivot: Pivot2
}

export interface Pivot2 {
    product_id: number
    tag_id: number
}

export interface BannerImage2 {
    id: number
    original: string
    thumbnail: string
}
