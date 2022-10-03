export declare type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export declare interface Scalars {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
    DateTime: any
    /**
     * Loose type that allows any value. Be careful when passing in large `Int` or `Float` literals,
     * as they may not be parsed correctly on the server side. Use `String` literals if you are
     * dealing with really large numbers to be on the safe side.
     */
    Mixed: any
    Upload: any
    /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
    Date: any
    /** A datetime and timezone string in ISO 8601 format `Y-m-dTH:i:sO`, e.g. `2020-04-20T13:53:12+02:00`. */
    DateTimeTz: any
}
export declare interface Address {
    id: Scalars['ID']
    title?: Maybe<Scalars['String']>
    default?: Maybe<Scalars['Boolean']>
    address?: Maybe<UserAddress>
    type?: Maybe<Scalars['String']>
    customer?: Maybe<User>
}
export declare interface UserAddress {
    country?: Maybe<Scalars['String']>
    city?: Maybe<Scalars['String']>
    state?: Maybe<Scalars['String']>
    zip?: Maybe<Scalars['String']>
    street_address?: Maybe<Scalars['String']>
}
export declare interface User {
    id: Scalars['ID']
    name: Scalars['String']
    shops: [Shop]
    managed_shop: Shop
    is_active: boolean
    email: Scalars['String']
    created_at: Scalars['DateTime']
    updated_at: Scalars['DateTime']
    profile?: Maybe<Profile>
    address: Address[]
    orders?: Maybe<OrderPaginator>
}

export declare interface Profile {
    id: Scalars['ID']
    avatar?: Maybe<Attachment>
    bio?: Maybe<Scalars['String']>
    contact?: Maybe<Scalars['String']>
    socials?: Maybe<Maybe<Social>[]>
    customer?: Maybe<User>
}
export declare interface Social {
    type?: Maybe<Scalars['String']>
    link?: Maybe<Scalars['String']>
}
/** A paginated list of Order items. */
export declare interface OrderPaginator {
    /** Pagination information about the list of items. */
    paginatorInfo: PaginatorInfo
    /** A list of Order items. */
    data: Order[]
}
/** Pagination information about the corresponding list of items. */
export declare interface PaginatorInfo {
    /** Total count of available items in the page. */
    count?: Scalars['Int']
    /** Current pagination page. */
    currentPage?: Scalars['Int']
    /** If collection has more pages. */
    hasMorePages?: Scalars['Boolean']
    /** Last page number of the collection. */
    lastPage?: Scalars['Int']
    /** Number of items per page in the collection. */
    perPage?: Scalars['Int']
    /** Total items available in the collection. */
    total?: Scalars['Int']
}
export declare interface Order {
    id: Scalars['ID']
    tracking_number: Scalars['String']
    customer_contact: Scalars['String']
    customer_id: Scalars['Int']
    customer?: Maybe<User>
    status: OrderStatus
    amount: Scalars['Float']
    sales_tax: Scalars['Float']
    total: Scalars['Float']
    paid_total: Scalars['Float']
    payment_id?: Maybe<Scalars['String']>
    payment_gateway?: Maybe<Scalars['String']>
    coupon?: Maybe<Coupon>
    discount?: Maybe<Scalars['Float']>
    delivery_fee?: Maybe<Scalars['Float']>
    delivery_time: Scalars['String']
    products: Product[]
    created_at: Scalars['DateTime']
    updated_at: Scalars['DateTime']
    billing_address?: Maybe<UserAddress>
    shipping_address?: Maybe<UserAddress>
}
export declare interface OrderStatus {
    id: Scalars['ID']
    name: Scalars['String']
    color: Scalars['String']
    serial: Scalars['Int']
    created_at: Scalars['DateTime']
    updated_at: Scalars['DateTime']
}
export declare interface Coupon {
    id: Scalars['ID']
    code: Scalars['String']
    description: Scalars['String']
    orders: Order[]
    type: Scalars['String']
    image: Scalars['String']
    amount: Scalars['Float']
    active_from: Scalars['DateTime']
    expire_at: Scalars['DateTime']
    created_at: Scalars['DateTime']
    updated_at: Scalars['DateTime']
}
export declare interface Product {
    id: Scalars['ID']
    shop_id: Scalars['ID']
    name: Scalars['String']
    slug: Scalars['String']
    type: Type
    product_type: ProductType
    max_price?: Maybe<Scalars['Float']>
    min_price?: Maybe<Scalars['Float']>
    categories: Category[]
    variations?: Maybe<Maybe<AttributeValue>[]>
    variation_options?: Maybe<Maybe<Variation>[]>
    pivot?: Maybe<OrderProductPivot>
    orders: Order[]
    description?: Maybe<Scalars['String']>
    in_stock?: Maybe<Scalars['Boolean']>
    is_taxable?: Maybe<Scalars['Boolean']>
    sale_price?: Maybe<Scalars['Float']>
    sku?: Maybe<Scalars['String']>
    gallery?: Maybe<Maybe<Attachment>[]>
    image?: Maybe<Attachment>
    status?: Maybe<ProductStatus>
    height?: Maybe<Scalars['String']>
    length?: Maybe<Scalars['String']>
    width?: Maybe<Scalars['String']>
    price: Scalars['Float']
    quantity?: Maybe<Scalars['Int']>
    unit?: Maybe<Scalars['String']>
    created_at: Scalars['DateTime']
    updated_at: Scalars['DateTime']
}

export declare interface Variation {
    __typename?: 'Variation'
    id?: Maybe<Scalars['ID']>
    title?: Maybe<Scalars['String']>
    price?: Maybe<Scalars['Float']>
    sku?: Maybe<Scalars['String']>
    is_disable?: Maybe<Scalars['Boolean']>
    sale_price?: Maybe<Scalars['Float']>
    quantity?: Maybe<Scalars['Int']>
    options?: Maybe<Maybe<VariationOption>[]>
}
export declare interface VariationInput {
    id?: Maybe<Scalars['ID']>
    title?: Maybe<Scalars['String']>
    sku?: Maybe<Scalars['String']>
    is_disable?: Maybe<Scalars['Boolean']>
    sale_price?: Maybe<Scalars['Float']>
    price?: Maybe<Scalars['Float']>
    quantity?: Maybe<Scalars['Int']>
    options?: Maybe<Maybe<VariationOptionInput>[]>
}
export declare interface VariationOption {
    __typename?: 'VariationOption'
    name?: Maybe<Scalars['String']>
    value?: Maybe<Scalars['String']>
}
export declare interface VariationOptionInput {
    name?: Maybe<Scalars['String']>
    value?: Maybe<Scalars['String']>
}

export declare interface TaxInput {
    name?: Maybe<Scalars['String']>
    rate?: Maybe<Scalars['Float']>
    is_global?: Maybe<Scalars['Boolean']>
    country?: Maybe<Scalars['String']>
    state?: Maybe<Scalars['String']>
    zip?: Maybe<Scalars['String']>
    city?: Maybe<Scalars['String']>
    priority?: Maybe<Scalars['Int']>
    on_shipping?: Maybe<Scalars['Boolean']>
}
export declare interface TaxUpdateInput {
    name?: Maybe<Scalars['String']>
    rate?: Maybe<Scalars['Float']>
    is_global?: Maybe<Scalars['Boolean']>
    country?: Maybe<Scalars['String']>
    state?: Maybe<Scalars['String']>
    zip?: Maybe<Scalars['String']>
    city?: Maybe<Scalars['String']>
    priority?: Maybe<Scalars['Int']>
    on_shipping?: Maybe<Scalars['Boolean']>
}

export declare interface ShippingInput {
    name: Scalars['String']
    amount: Scalars['Float']
    is_global?: Maybe<Scalars['Boolean']>
    type: ShippingType
}
export declare interface ShippingUpdateInput {
    name?: Maybe<Scalars['String']>
    amount?: Maybe<Scalars['Float']>
    is_global?: Maybe<Scalars['Boolean']>
    type?: ShippingType
}

export declare interface Type {
    id: Scalars['ID']
    name: Scalars['String']
    icon: Scalars['String']
    slug: Scalars['String']
    promotional_sliders?: Maybe<Maybe<Attachment>[]>
    images?: Maybe<any>
    settings?: Maybe<TypeSettings>
    products?: Maybe<ProductPaginator>
    created_at: Scalars['DateTime']
    updated_at: Scalars['DateTime']
}

export declare interface TypeSettings {
    isHome?: Maybe<Scalars['Boolean']>
    layoutType?: Maybe<Scalars['String']>
    productCard?: Maybe<Scalars['String']>
}

/** The available directions for ordering a list of records. */
export enum SortOrder {
    /** Sort records in ascending order. */
    Asc = 'asc',
    /** Sort records in descending order. */
    Desc = 'desc',
}

/** A paginated list of Product items. */
export declare interface ProductPaginator {
    /** Pagination information about the list of items. */
    paginatorInfo: PaginatorInfo
    /** A list of Product items. */
    data: Product[]
}
export declare interface Category {
    id: Scalars['ID']
    name: Scalars['String']
    slug: Scalars['String']
    parent?: Maybe<Scalars['Int']>
    children: Category[]
    details?: Maybe<Scalars['String']>
    image?: Maybe<Attachment>
    icon?: Maybe<Scalars['String']>
    type: Type
    products: Product[]
    created_at: Scalars['DateTime']
    updated_at: Scalars['DateTime']
}
export declare interface Attachment {
    thumbnail?: Maybe<Scalars['String']>
    original?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['ID']>
}
export declare interface AttributeValue {
    id: Scalars['ID']
    value?: Maybe<Scalars['String']>
    attribute?: Maybe<Attribute>
    products: Product[]
    pivot?: Maybe<VariationProductPivot>
}
export declare interface Attribute {
    id: Scalars['ID']
    name: Scalars['String']
    slug: Scalars['String']
    values: AttributeValue[]
    shop_id?: Maybe<Scalars['Int']>
}
export declare interface VariationProductPivot {
    price?: Maybe<Scalars['Float']>
}
export declare interface OrderProductPivot {
    order_quantity?: Maybe<Scalars['Int']>
    unit_price?: Maybe<Scalars['Float']>
    subtotal: string
}

export enum ProductStatus {
    Publish = 'publish',
    Draft = 'draft',
}

/** A paginated list of Category items. */
export declare interface CategoryPaginator {
    /** Pagination information about the list of items. */
    paginatorInfo: PaginatorInfo
    /** A list of Category items. */
    data: Category[]
}
/** A paginated list of Coupon items. */
export declare interface CouponPaginator {
    /** Pagination information about the list of items. */
    paginatorInfo: PaginatorInfo
    /** A list of Coupon items. */
    data: Coupon[]
}

/** A paginated list of OrderStatus items. */
export declare interface OrderStatusPaginator {
    /** Pagination information about the list of items. */
    paginatorInfo: PaginatorInfo
    /** A list of OrderStatus items. */
    data: OrderStatus[]
}

export declare interface Settings {
    id: Scalars['ID']
    options: SettingsOptions
}

/** A paginated list of User items. */
export declare interface UserPaginator {
    /** Pagination information about the list of items. */
    paginatorInfo: PaginatorInfo
    /** A list of User items. */
    data: User[]
}
export declare interface AddressInput {
    title: Scalars['String']
    default?: Maybe<Scalars['Boolean']>
    address: UserAddressInput
    type: Scalars['String']
    customer?: Maybe<ConnectBelongsTo>
}
export declare interface UserAddressInput {
    country?: Maybe<Scalars['String']>
    city?: Maybe<Scalars['String']>
    state?: Maybe<Scalars['String']>
    zip?: Maybe<Scalars['String']>
    street_address?: Maybe<Scalars['String']>
}
export declare interface ConnectBelongsTo {
    connect?: Maybe<Scalars['ID']>
}
export declare interface AttributeValueInput {
    map(arg0: ({ id, value, meta }: any) => { id: number; value: any; meta: any }): AttributeValueInput
    id?: Maybe<Scalars['Int']>
    value: Scalars['String']
    meta?: Maybe<Scalars['String']>
}
export declare interface AttributeInput {
    name: Scalars['String']
    shop_id: Scalars['Int']
    values: AttributeValueInput
}
export declare interface AttributeValueCreateInput {
    value: Scalars['String']
    meta: Scalars['String']
    attribute_id?: Scalars['ID']
}
export declare interface AttributeBelongTo {
    connect: Scalars['ID']
}
export declare interface AttributeValueUpdateInput {
    value?: Maybe<Scalars['String']>
    meta?: Maybe<Scalars['String']>
    attribute_id?: Scalars['ID']
}
export declare interface CreateCategory {
    name: Scalars['String']
    type_id?: Maybe<Scalars['ID']>
    parent?: Maybe<Scalars['Int']>
    details?: Maybe<Scalars['String']>
    image?: Maybe<AttachmentInput>
    icon?: Maybe<Scalars['String']>
}
export declare interface ConnectTypeBelongsTo {
    connect?: Maybe<Scalars['ID']>
}
export declare interface AttachmentInput {
    thumbnail?: Maybe<Scalars['String']>
    original?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['ID']>
}
export declare interface UpdateCategory {
    name?: Maybe<Scalars['String']>
    type_id?: Maybe<Scalars['ID']>
    parent?: Maybe<Scalars['Int']>
    details?: Maybe<Scalars['String']>
    image?: Maybe<AttachmentInput>
    icon?: Maybe<Scalars['String']>
}
export declare interface CheckoutVerificationInput {
    amount: Scalars['Float']
    products: ConnectProductOrderPivot[]
    billing_address?: Maybe<UserAddressInput>
    shipping_address?: Maybe<UserAddressInput>
}
export declare interface ConnectProductOrderPivot {
    product_id: Scalars['ID']
    order_quantity?: Maybe<Scalars['Int']>
    unit_price?: Maybe<Scalars['Float']>
    subtotal?: Maybe<Scalars['Float']>
}
export declare interface VerifiedCheckoutData {
    total_tax: Scalars['Float']
    shipping_charge: Scalars['Float']
    unavailable_products: Scalars['ID'][]
}

export interface Shipping {
    id?: Maybe<Scalars['ID']>
    name?: Maybe<Scalars['String']>
    amount?: Maybe<Scalars['Float']>
    is_global?: Maybe<Scalars['Boolean']>
    type?: ShippingType
}

export enum ShippingType {
    /** Fixed */
    Fixed = 'fixed',
    /** Percentage */
    Percentage = 'percentage',
    /** Free */
    Free = 'free_shipping',
}

export interface Tax {
    id?: Maybe<Scalars['ID']>
    name?: Maybe<Scalars['String']>
    rate?: Maybe<Scalars['Float']>
    is_global?: Maybe<Scalars['Boolean']>
    country?: Maybe<Scalars['String']>
    state?: Maybe<Scalars['String']>
    zip?: Maybe<Scalars['String']>
    city?: Maybe<Scalars['String']>
    priority?: Maybe<Scalars['Int']>
    on_shipping?: Maybe<Scalars['Boolean']>
}

export declare interface CouponInput {
    code: Scalars['String']
    type: CouponType
    amount: Scalars['Float']
    description?: Maybe<Scalars['String']>
    image?: Maybe<AttachmentInput>
    active_from: Scalars['DateTime']
    expire_at: Scalars['DateTime']
}

export enum CouponType {
    /** Fixed coupon */
    FixedCoupon = 'fixed',
    /** Percentage coupon */
    PercentageCoupon = 'percentage',
    /** Free shipping coupon */
    FreeShippingCoupon = 'free_shipping',
}

export declare interface CouponUpdateInput {
    code?: Maybe<Scalars['String']>
    type?: Maybe<CouponType>
    amount?: Maybe<Scalars['Float']>
    description?: Maybe<Scalars['String']>
    image?: Maybe<AttachmentInput>
    active_from?: Maybe<Scalars['DateTime']>
    expire_at?: Maybe<Scalars['DateTime']>
}
export declare interface UpdateOrder {
    tracking_number?: Maybe<Scalars['String']>
    customer_id?: Maybe<Scalars['ID']>
    status?: Maybe<Scalars['ID']>
    products?: ConnectProductOrderPivot[]
    amount?: Maybe<Scalars['Float']>
    sales_tax?: Maybe<Scalars['Float']>
    total?: Maybe<Scalars['Float']>
    paid_total?: Maybe<Scalars['Float']>
    payment_id?: Maybe<Scalars['String']>
    payment_gateway?: Maybe<Scalars['String']>
    coupon_id?: Maybe<Scalars['ID']>
    discount?: Maybe<Scalars['Float']>
    delivery_fee?: Maybe<Scalars['Float']>
    delivery_time?: Maybe<Scalars['String']>
    billing_address?: Maybe<UserAddressInput>
    shipping_address?: Maybe<UserAddressInput>
}
export declare interface CreateOrder {
    tracking_number: Scalars['String']
    customer_id: Scalars['Int']
    status: Scalars['Int']
    products: ConnectProductOrderPivot[]
    amount: Scalars['Float']
    sales_tax?: Maybe<Scalars['Float']>
    total: Scalars['Float']
    paid_total: Scalars['Float']
    payment_id?: Maybe<Scalars['String']>
    payment_gateway: Scalars['String']
    coupon_id?: Maybe<Scalars['Int']>
    discount?: Maybe<Scalars['Float']>
    delivery_fee?: Maybe<Scalars['Float']>
    delivery_time: Scalars['String']
    card?: Maybe<CardInput>
    billing_address?: Maybe<UserAddressInput>
    shipping_address?: Maybe<UserAddressInput>
}
export declare interface CardInput {
    number: Scalars['String']
    expiryMonth: Scalars['String']
    expiryYear: Scalars['String']
    cvv: Scalars['String']
    email?: Maybe<Scalars['String']>
}
export declare interface OrderStatusInput {
    name: Scalars['String']
    color: Scalars['String']
    serial: Scalars['Int']
}

export declare interface OrderStatusUpdateInput {
    id: Scalars['ID']
    name: Scalars['String']
    color: Scalars['String']
    serial: Scalars['Int']
}

export declare interface CreateProduct {
    name: Scalars['String']
    type_id: Scalars['String']
    price: Scalars['Float']
    sale_price?: Maybe<Scalars['Float']>
    quantity: Scalars['Int']
    unit: Scalars['String']
    description?: Maybe<Scalars['String']>
    categories?: Maybe<Scalars['ID'][]>
    variations?: Maybe<AttributeProductPivot[]>
    in_stock?: Maybe<Scalars['Boolean']>
    is_taxable?: Maybe<Scalars['Boolean']>
    sku?: Maybe<Scalars['String']>
    gallery?: Maybe<Maybe<AttachmentInput>[]>
    image?: Maybe<AttachmentInput>
    status?: Maybe<ProductStatus>
    height?: Maybe<Scalars['String']>
    length?: Maybe<Scalars['String']>
    width?: Maybe<Scalars['String']>
}
export declare interface AttributeProductPivot {
    id: Scalars['ID']
    price?: Maybe<Scalars['Float']>
}
export declare interface UpdateProduct {
    name: Scalars['String']
    type_id: Scalars['String']
    price: Scalars['Float']
    sale_price?: Maybe<Scalars['Float']>
    quantity: Scalars['Int']
    unit: Scalars['String']
    description?: Maybe<Scalars['String']>
    categories?: Maybe<Scalars['ID'][]>
    variations?: Maybe<AttributeProductPivot[]>
    in_stock?: Maybe<Scalars['Boolean']>
    is_taxable?: Maybe<Scalars['Boolean']>
    sku?: Maybe<Scalars['String']>
    gallery?: Maybe<Maybe<AttachmentInput>[]>
    image?: Maybe<AttachmentInput>
    status?: Maybe<ProductStatus>
    height?: Maybe<Scalars['String']>
    length?: Maybe<Scalars['String']>
    width?: Maybe<Scalars['String']>
}
export declare interface ProfileInput {
    avatar?: Maybe<Scalars['String']>
    bio?: Maybe<Scalars['String']>
    socials?: Maybe<Maybe<SocialInput>[]>
    contact?: Maybe<Scalars['String']>
    customer?: Maybe<ConnectBelongsTo>
}

export declare interface SettingsInput {
    options?: Maybe<SettingsOptionsInput>
}

export interface SettingsOptionsInput {
    siteTitle?: Maybe<Scalars['String']>
    siteSubtitle?: Maybe<Scalars['String']>
    currency?: Maybe<Scalars['String']>
    minimumOrderAmount?: Maybe<Scalars['Float']>
    logo?: Maybe<AttachmentInput>
    taxClass?: Maybe<Scalars['String']>
    shippingClass?: Maybe<Scalars['String']>
    contactDetails?: Maybe<ContactDetailsInput>
}
export interface DeliveryTime {
    description?: Maybe<Scalars['String']>
    title?: Maybe<Scalars['String']>
}

export interface DeliveryTimeInput {
    description?: Maybe<Scalars['String']>
    title?: Maybe<Scalars['String']>
}

export interface FacebookSettings {
    appId?: Maybe<Scalars['String']>
    isEnable?: Maybe<Scalars['Boolean']>
    pageId?: Maybe<Scalars['String']>
}

export interface GoogleSettings {
    isEnable?: Maybe<Scalars['Boolean']>
    tagManagerId?: Maybe<Scalars['String']>
}

export interface SeoSettings {
    canonicalUrl?: Maybe<Scalars['String']>
    metaDescription?: Maybe<Scalars['String']>
    metaTags?: Maybe<Scalars['String']>
    metaTitle?: Maybe<Scalars['String']>
    ogDescription?: Maybe<Scalars['String']>
    ogImage?: Maybe<Attachment>
    ogTitle?: Maybe<Scalars['String']>
    twitterCardType?: Maybe<Scalars['String']>
    twitterHandle?: Maybe<Scalars['String']>
}

export interface SettingsOptions {
    contactDetails?: Maybe<ContactDetails>
    currency?: Maybe<Scalars['String']>
    deliveryTime?: Maybe<Maybe<DeliveryTime>[]>
    facebook?: Maybe<FacebookSettings>
    google?: Maybe<GoogleSettings>
    logo?: Maybe<Attachment>
    minimumOrderAmount?: Maybe<Scalars['Float']>
    seo?: Maybe<SeoSettings>
    shippingClass?: Maybe<Scalars['String']>
    siteSubtitle?: Maybe<Scalars['String']>
    siteTitle?: Maybe<Scalars['String']>
    taxClass?: Maybe<Scalars['String']>
    signupPoints: Maybe<Scalars['Int']>
}

export declare interface LoginInput {
    email: Scalars['String']
    password: Scalars['String']
}
export declare interface RegisterInput {
    email: Scalars['String']
    password: Scalars['String']
    name: Scalars['String']
    shop_id?: Scalars['Int']
    permission: Permission
}

export interface ChangePasswordInput {
    oldPassword: Scalars['String']
    newPassword: Scalars['String']
}

export interface PasswordChangeResponse {
    message?: Maybe<Scalars['String']>
    success?: Maybe<Scalars['Boolean']>
}

export interface ForgetPasswordInput {
    email: Scalars['String']
}

export interface VerifyForgetPasswordTokenInput {
    token: Scalars['String']
    email: Scalars['String']
}

export interface ResetPasswordInput {
    token: Scalars['String']
    email: Scalars['String']
    password: Scalars['String']
}

export enum Permission {
    /** Super admin */
    SuperAdmin = 'super_admin',
    /** Store owner */
    StoreOwner = 'store_owner',
    /** Store keeper */
    Staff = 'staff' /** Customer */,
    Customer = 'customer',
}

export interface UpdateUser {
    name?: Maybe<Scalars['String']>
    profile?: Maybe<UserProfileInput>
    address?: Maybe<Maybe<UserAddressUpsertInput>[]>
}
export interface CreateUser {
    name?: Maybe<Scalars['String']>
    email: Scalars['String']
    password: Scalars['String']
    profile?: Maybe<UserProfileInput>
    address?: Maybe<Maybe<UserAddressUpsertInput>[]>
}

export interface SocialInput {
    type?: Maybe<Scalars['String']>
    link?: Maybe<Scalars['String']>
}

export interface UserProfileInput {
    id: Scalars['ID']
    avatar?: Maybe<AttachmentInput>
    bio?: Maybe<Scalars['String']>
    socials?: Maybe<Maybe<SocialInput>[]>
    contact?: Maybe<Scalars['String']>
}

export interface UserAddressUpsertInput {
    title: Scalars['String']
    default?: Maybe<Scalars['Boolean']>
    address: UserAddressInput
    type: Scalars['String']
}

export declare interface Analytics {
    totalRevenue?: Maybe<Scalars['Float']>
    todaysRevenue?: Maybe<Scalars['Float']>
    totalOrders?: Maybe<Scalars['Int']>
    totalShops?: Maybe<Scalars['Int']>
    newCustomers?: Maybe<Scalars['Int']>
    totalYearSaleByMonth?: Maybe<Maybe<TotalYearSaleByMonth>[]>
}
export declare interface TotalYearSaleByMonth {
    total?: Maybe<Scalars['Float']>
    month?: Maybe<Scalars['String']>
}

export interface CreateTypeInput {
    name: Scalars['String']
    gallery?: Maybe<AttachmentInput[]>
    icon?: Maybe<Scalars['String']>
    banner_text?: Maybe<Scalars['String']>
}

export enum ProductType {
    /** Simple */
    Simple = 'simple',
    /** Variable */
    Variable = 'variable',
}

export declare interface ApproveShopInput {
    id: Scalars['ID']
    admin_commission_rate: Scalars['Float']
}
export declare interface ApproveWithdrawInput {
    id: Scalars['ID']
    status: WithdrawStatus
}

export declare enum WithdrawStatus {
    /** Approved */
    Approved = 'APPROVED',

    /** Pending */
    Pending = 'PENDING',

    /** On hold */
    OnHold = 'ON_HOLD',

    /** Rejected */
    Rejected = 'REJECTED',

    /** Processing */
    Processing = 'PROCESSING',
}

export declare interface Shop {
    id?: Maybe<Scalars['ID']>
    owner_id?: Maybe<Scalars['Int']>
    owner?: Maybe<User>
    staffs?: Maybe<Maybe<User>[]>
    is_active?: Maybe<Scalars['Boolean']>
    orders_count?: Maybe<Scalars['Int']>
    products_count?: Maybe<Scalars['Int']>
    balance?: Maybe<Balance>
    name?: Maybe<Scalars['String']>
    slug?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    cover_image?: Maybe<Attachment>
    logo?: Maybe<Attachment>
    address?: Maybe<UserAddress>
    settings?: Maybe<ShopSettings>
    created_at?: Maybe<Scalars['DateTime']>
    updated_at?: Maybe<Scalars['DateTime']>
}

export declare interface PaymentInfo {
    account?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    bank?: Maybe<Scalars['String']>
}
export declare interface PaymentInfoInput {
    account?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    bank?: Maybe<Scalars['String']>
}

export declare interface Balance {
    id?: Maybe<Scalars['ID']>
    admin_commission_rate?: Maybe<Scalars['Float']>
    shop?: Maybe<Shop>
    total_earnings?: Maybe<Scalars['Float']>
    withdrawn_amount?: Maybe<Scalars['Float']>
    current_balance?: Maybe<Scalars['Float']>
    payment_info?: Maybe<PaymentInfo>
}
export declare interface BalanceInput {
    id?: Maybe<Scalars['ID']>
    payment_info?: Maybe<PaymentInfoInput>
}
export declare interface ShopInput {
    name: Scalars['String']
    description?: Maybe<Scalars['String']>
    cover_image?: Maybe<AttachmentInput>
    logo?: Maybe<AttachmentInput>
    address?: Maybe<UserAddressInput>
    settings?: Maybe<ShopSettingsInput>
    categories?: Maybe<Maybe<Scalars['ID']>[]>
    balance?: Maybe<BalanceInput>
}
/** A paginated list of Shop items. */

export declare interface ShopPaginator {
    /** Pagination information about the list of items. */

    paginatorInfo: PaginatorInfo
    /** A list of Shop items. */

    data: Shop[]
}

export declare interface Tag {
    id?: Maybe<Scalars['ID']>
    name?: Maybe<Scalars['String']>
    slug?: Maybe<Scalars['String']>
    parent?: Maybe<Scalars['Int']>
    details?: Maybe<Scalars['String']>
    image?: Maybe<Attachment>
    icon?: Maybe<Scalars['String']>
    type?: Maybe<Type>
    products?: Maybe<Maybe<Product>[]>
    created_at?: Maybe<Scalars['DateTime']>
    updated_at?: Maybe<Scalars['DateTime']>
}
/** A paginated list of Tag items. */

export declare interface TagPaginator {
    /** Pagination information about the list of items. */

    paginatorInfo: PaginatorInfo
    /** A list of Tag items. */

    data: Tag[]
}

export declare interface CreateTagInput {
    name: Scalars['String']
    type?: Maybe<ConnectTypeBelongsTo>
    details?: Maybe<Scalars['String']>
    image?: Maybe<AttachmentInput>
    icon?: Maybe<Scalars['String']>
}

export declare interface UpdateTagInput {
    id: Scalars['ID']
    name?: Maybe<Scalars['String']>
    type?: Maybe<ConnectTypeBelongsTo>
    details?: Maybe<Scalars['String']>
    image?: Maybe<AttachmentInput>
    icon?: Maybe<Scalars['String']>
}

export declare interface Withdraw {
    __typename?: 'Withdraw'
    id?: Maybe<Scalars['ID']>
    amount?: Maybe<Scalars['Float']>
    status?: Maybe<WithdrawStatus>
    shop_id?: Maybe<Scalars['Int']>
    shop?: Maybe<Shop>
    payment_method?: Maybe<Scalars['String']>
    details?: Maybe<Scalars['String']>
    note?: Maybe<Scalars['String']>
    created_at?: Maybe<Scalars['DateTime']>
    updated_at?: Maybe<Scalars['DateTime']>
}
/** A paginated list of Withdraw items. */

export declare interface WithdrawPaginator {
    __typename?: 'WithdrawPaginator'
    /** Pagination information about the list of items. */

    paginatorInfo: PaginatorInfo
    /** A list of Withdraw items. */

    data: Withdraw[]
}

export declare interface CreateWithdrawInput {
    amount: Scalars['Float']
    shop_id: Scalars['Int']
    payment_method?: Maybe<Scalars['String']>
    details?: Maybe<Scalars['String']>
    note?: Maybe<Scalars['String']>
}

export declare interface AddStaffInput {
    email: Scalars['String']
    password: Scalars['String']
    name: Scalars['String']
    shop_id: Scalars['Int']
}

export declare interface ShopSettings {
    socials?: Maybe<Maybe<ShopSocials>[]>
    contact?: Maybe<Scalars['String']>
    location?: Maybe<Location>
    website?: Maybe<Scalars['String']>
}
export declare interface ShopSocialInput {
    icon?: Maybe<Scalars['String']>
    url?: Maybe<Scalars['String']>
    label?: Maybe<Scalars['String']>
}
export declare interface ShopSocials {
    icon?: Maybe<Scalars['String']>
    url?: Maybe<Scalars['String']>
}

export declare interface Location {
    lat?: Maybe<Scalars['Float']>
    lng?: Maybe<Scalars['Float']>
    city?: Maybe<Scalars['String']>
    state?: Maybe<Scalars['String']>
    country?: Maybe<Scalars['String']>
    zip?: Maybe<Scalars['String']>
    formattedAddress?: Maybe<Scalars['String']>
}

export declare interface LocationInput {
    lat?: Maybe<Scalars['Float']>
    lng?: Maybe<Scalars['Float']>
    city?: Maybe<Scalars['String']>
    state?: Maybe<Scalars['String']>
    country?: Maybe<Scalars['String']>
    zip?: Maybe<Scalars['String']>
    formattedAddress?: Maybe<Scalars['String']>
}

export declare interface ShopSettingsInput {
    socials?: Maybe<Maybe<ShopSocialInput>[]>
    contact?: Maybe<Scalars['String']>
    location?: Maybe<LocationInput>
    website?: Maybe<Scalars['String']>
}

export declare interface ContactDetails {
    __typename?: 'ContactDetails'
    socials?: Maybe<Maybe<ShopSocials>[]>
    contact?: Maybe<Scalars['String']>
    location?: Maybe<Location>
    website?: Maybe<Scalars['String']>
}
export declare interface ContactDetailsInput {
    socials?: Maybe<Maybe<ShopSocialInput>[]>
    contact?: Maybe<Scalars['String']>
    location?: Maybe<LocationInput>
    website?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
}

export declare interface TypeSettingsInput {
    isHome?: Maybe<Scalars['Boolean']>
    layoutType?: Maybe<Scalars['String']>
    productCard?: Maybe<Scalars['String']>
}
