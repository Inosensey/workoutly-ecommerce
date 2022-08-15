interface ProfileDetailsInterface {
    id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    birthDate: string,
    gender: string,
}
interface AddressDetailsInterface {
    address_id: number,
    full_name: string,
    phone_number: string,
    region: string,
    province: string,
    city: string,
    street: string,
    postal_code: string,
}
interface AddressFormInfoInterface {
    FormName: string,
    FormAction: string
}
interface OrderDetailsInterface {
    order_id: string,
    id: string,
    track_id: string,
    full_name: string,
    item_metadata: any,
    total_price: number,
    status: string,
    purchased_at: Date,
    address: {
        region: string,
        province: string,
        city: string,
        street: string,
    }
}

export type ProfileDetailsType = ProfileDetailsInterface
export type AddressDetailsType = AddressDetailsInterface
export type AddressFormInfoType = AddressFormInfoInterface
export type OrderDetailsType = OrderDetailsInterface