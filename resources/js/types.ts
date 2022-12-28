export const SHIPPING = 1
export const PAYMENT = 2

export type ShippingRate = {
  id: string
  provider: string
  name: string
  amount: string
  days: string
  image: string
  description: string
}

export type InertiaProps = {
  auth: {
    user: App.Models.User | null
  }
  flash: {
    message?: string
    error?: string
  }
}
