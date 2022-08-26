import { getAddresses } from "../../../Services/Supabase/getAddresses";

const Logic = () => {
    const getAddressHandler = async (setAddressList:any) => {
        const response: any = await getAddresses();
        setAddressList(response?.data);
    };
    
    return {
        getAddressHandler
    }
}

export default Logic;