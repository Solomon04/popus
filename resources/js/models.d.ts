/**
 * This file is auto generated using 'php artisan typescript:generate'
 *
 * Changes to this file will be lost when the command is run again
 */

declare namespace App.Models {
    export interface Address {
        id: number;
        cart_id: number;
        street: string;
        unit: string | null;
        city: string;
        state: string;
        zip: string;
        created_at: string | null;
        updated_at: string | null;
        cart?: App.Models.Cart | null;
    }

    export interface Cart {
        id: number;
        created_at: string | null;
        updated_at: string | null;
        items?: Array<App.Models.CartItem> | null;
        store?: App.Models.Store | null;
        order?: App.Models.Order | null;
        address?: App.Models.Address | null;
        customer?: App.Models.Customer | null;
        items_count?: number | null;
    }

    export interface CartItem {
        id: number;
        cart_id: number;
        product_id: number;
        quantity: number;
        created_at: string | null;
        updated_at: string | null;
        cart?: App.Models.Cart | null;
        product?: App.Models.Product | null;
    }

    export interface Customer {
        id: number;
        name: string;
        email: string;
        phone: string | null;
        stripe_customer_id: string | null;
        shopify_customer_id: string | null;
        created_at: string | null;
        updated_at: string | null;
        orders?: Array<App.Models.Order> | null;
        orders_count?: number | null;
    }

    export interface Fundraiser {
        id: number;
        uuid: string;
        organizer_id: number;
        name: string;
        start_date: string;
        end_date: string;
        activity: string | null;
        affiliation: string | null;
        goal: number;
        participant_count: number;
        code: string;
        paid_out: boolean;
        created_at: string | null;
        updated_at: string | null;
        organizer?: App.Models.User | null;
        readonly status?: any;
    }

    export interface Order {
        id: number;
        cart_id: number;
        customer_id: number;
        store_id: number;
        shopify_order_id: string;
        sub_total: number;
        shipping_total: number;
        total: number;
        created_at: string | null;
        updated_at: string | null;
        customer?: App.Models.Customer | null;
        cart?: App.Models.Cart | null;
        store?: App.Models.Store | null;
    }

    export interface Product {
        id: number;
        shopify_product_id: string;
        title: string;
        description: string;
        price: number;
        image: string;
        active: boolean;
        created_at: string | null;
        updated_at: string | null;
    }

    export interface Store {
        id: number;
        uuid: string;
        user_id: number;
        fundraiser_id: number;
        description: string | null;
        created_at: string | null;
        updated_at: string | null;
        user?: App.Models.User | null;
        fundraiser?: App.Models.Fundraiser | null;
        orders?: Array<App.Models.Order> | null;
        orders_count?: number | null;
    }

    export interface User {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        avatar: string | null;
        email_verified_at: string | null;
        password: string;
        remember_token: string | null;
        created_at: string | null;
        updated_at: string | null;
    }

}
