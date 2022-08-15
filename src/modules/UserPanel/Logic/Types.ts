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

export type ProfileDetailsType = ProfileDetailsInterface
export type AddressDetailsType = AddressDetailsInterface
export type AddressFormInfoType = AddressFormInfoInterface