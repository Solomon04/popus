/**
 * This file is auto generated using 'php artisan typescript:generate'
 *
 * Changes to this file will be lost when the command is run again
 */

declare namespace App.Models {
  export interface Activity {
    id: number
    name: string
  }

  export interface Address {
    id: number
    cart_id: number
    address: string
    unit: string | null
    city: string
    state: string
    postal: string
    country: string
    created_at: string | null
    updated_at: string | null
    cart?: App.Models.Cart | null
  }

  export interface Cart {
    id: number
    session_id: string
    active: boolean
    store_id: number | null
    stripe_session_id: string | null
    shippo_rate_id: string | null
    customer_id: number | null
    created_at: string | null
    updated_at: string | null
    items?: Array<App.Models.CartItem> | null
    store?: App.Models.Store | null
    order?: App.Models.Order | null
    address?: App.Models.Address | null
    customer?: App.Models.Customer | null
    payment_method?: App.Models.PaymentMethod | null
    rate?: App.Models.Rate | null
    items_count?: number | null
  }

  export interface CartItem {
    id: number
    cart_id: number
    product_id: number
    quantity: number
    created_at: string | null
    updated_at: string | null
    cart?: App.Models.Cart | null
    product?: App.Models.Product | null
  }

  export interface Customer {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string | null
    stripe_customer_id: string | null
    shopify_customer_id: string | null
    created_at: string | null
    updated_at: string | null
    orders?: Array<App.Models.Order> | null
    orders_count?: number | null
  }

  export interface Fundraiser {
    id: number
    uuid: string
    organizer_id: number
    name: string
    start_date: string
    end_date: string
    activity_id: number
    goal_amount: number
    participant_count: number
    code: string
    paid_out: boolean
    postal_code: string
    created_at: string | null
    updated_at: string | null
    deleted_at: string | null
    organizer?: App.Models.User | null
    stores?: Array<App.Models.Store> | null
    activity?: App.Models.Activity | null
    stores_count?: number | null
    readonly status?: any
    readonly leaderboard?: any
    readonly revenue?: number
    readonly earnings?: number
    readonly total_orders?: number
    readonly is_active?: any
  }

  export interface Order {
    id: number
    uuid: string
    cart_id: number
    customer_id: number
    store_id: number
    status: string
    shopify_order_id: string | null
    stripe_payment_id: string | null
    sub_total: number
    shipping_total: number
    tax_total: number
    total: number
    created_at: string | null
    updated_at: string | null
    cart?: App.Models.Cart | null
    store?: App.Models.Store | null
    payment?: App.Models.Payment | null
    customer?: App.Models.Customer | null
  }

  export interface Payment {
    id: number
    order_id: number
    stripe_payment_id: string
    stripe_price: number
    stripe_status: string
    stripe_refund_id: string | null
    created_at: string | null
    updated_at: string | null
    order?: App.Models.Order | null
  }

  export interface PaymentMethod {
    id: number
    cart_id: number
    stripe_payment_method_id: string
    brand: string
    exp_month: string
    exp_year: string
    last4: string
    created_at: string | null
    updated_at: string | null
    cart?: App.Models.Cart | null
  }

  export interface Product {
    id: number
    shopify_product_id: string
    title: string
    description: string
    price: number
    weight: number
    image: string
    active: boolean
    created_at: string | null
    updated_at: string | null
  }

  export interface Rate {
    id: number
    cart_id: number
    shippo_id: string
    provider: string
    name: string
    amount: number
    days: number
    image: string
    description: string
    tracking_number: string | null
    created_at: string | null
    updated_at: string | null
    cart?: App.Models.Cart | null
  }

  export interface Store {
    id: number
    uuid: string
    user_id: number
    fundraiser_id: number
    avatar: string
    description: string
    created_at: string | null
    updated_at: string | null
    user?: App.Models.User | null
    fundraiser?: App.Models.Fundraiser | null
    orders?: Array<App.Models.Order> | null
    orders_count?: number | null
    readonly progress?: any
    readonly leaderboard?: any
    readonly is_active?: boolean
  }

  export interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
    email_verified_at: string | null
    password: string
    remember_token: string | null
    created_at: string | null
    updated_at: string | null
    stores?: Array<App.Models.Store> | null
    fundraisers?: Array<App.Models.Fundraiser> | null
    stores_count?: number | null
    fundraisers_count?: number | null
    readonly full_name?: string
  }
}
