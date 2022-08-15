import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  showLoadingPopUp,
  hideLoadingPopUp,
} from "../../../Redux/Reducers/PopUpLoading";
import { showNotifPopUp } from "../../../Redux/Reducers/PopUpNotif";
import deleteAddress from "../../../Services/Supabase/deleteAddress";
import {
  getAddresses,
  getSpecificAddress,
} from "../../../Services/Supabase/getAddresses";
import { AddressDetailsType, AddressFormInfoType } from "../Logic/Types";
import AddressForm from "./AddressForm";
import styles from "../../../../styles/UserPanel/Address.module.css";

const DefaultAddressDetails = {
  address_id: 0,
  full_name: "",
  phone_number: "",
  region: "",
  province: "",
  city: "",
  street: "",
  postal_code: "",
};
const DefaultFormInfo = {
  FormName: "",
  FormAction: "",
};

function Address() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [formInfo, setFormInfo] =
    useState<AddressFormInfoType>(DefaultFormInfo);
  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<AddressDetailsType[]>([]);
  const [addressDetails, setAddressDetails] = useState<AddressDetailsType>(
    DefaultAddressDetails
  );

  useEffect(() => {
    getAddressHandler();
  }, []);

  const getAddressHandler = async () => {
    setLoading(true);
    const response: any = (await getAddresses()) || {};
    setLoading(false);
    setAddresses(response?.data);
  };
  const getSpecificAddressHandler = async (id: number) => {
    dispatch(
      showLoadingPopUp({
        ActionName: "Getting address",
        LoadingMessage: "Please wait while we fetch your address",
        isLoading: true,
      })
    );
    const response: any = (await getSpecificAddress(id)) || {};
    setAddressDetails({
      ...addressDetails,
      address_id: response.data[0].address_id,
      full_name: response.data[0].full_name,
      phone_number: response.data[0].phone_number,
      region: response.data[0].region,
      province: response.data[0].province,
      city: response.data[0].city,
      street: response.data[0].street,
      postal_code: response.data[0].postal_code,
    });
    dispatch(hideLoadingPopUp());
    setFormInfo({ ...formInfo, FormName: "Edit Address", FormAction: "Edit" });
    setToggleForm(true);
  };
  const deleteAddressHandler = async (addressId: number) => {
    dispatch(
      showLoadingPopUp({
        ActionName: "Deleting address",
        LoadingMessage: "Please wait while we delete your address",
        isLoading: true,
      })
    );
    const response: any = await deleteAddress(addressId);
    dispatch(
      showNotifPopUp({
        NotifType: "Delete Address",
        NotifName: "Notification",
        NotifMessage: "Address Deleted Successfully",
        NotifAction: null,
        show: true,
      })
    );
    dispatch(hideLoadingPopUp());
    if (response.error === null) {
      getAddressHandler();
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h3>Address</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setFormInfo({
                ...formInfo,
                FormName: "New Address",
                FormAction: "Add",
              });
              setToggleForm(true);
            }}
          >
            <i className="fa-solid fa-circle-plus"></i> Add new Address
          </motion.button>
        </div>
        {loading ? (
          <div
            style={{
              height: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontFamily: "League Spartan",
            }}
          >
            <p>Loading....</p>
          </div>
        ) : addresses.length === 0 ? (
          <div
            style={{
              height: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontFamily: "League Spartan",
            }}
          >
            <p>You don't have any address yet</p>
          </div>
        ) : (
          <div className={styles.addressList}>
            {addresses.map((info: AddressDetailsType) => (
              <div className={styles.address} key={info.address_id}>
                <div className={styles.addressInfoContainer}>
                  <div className={styles.addressInfo}>
                    <label>Full Name:</label>
                    <p>{info.full_name}</p>
                  </div>
                  <div className={styles.addressInfo}>
                    <label>Phone:</label>
                    <p>{info.phone_number}</p>
                  </div>
                  <div className={styles.addressInfo}>
                    <label>Address:</label>
                    <p>
                      {info.region}, {info.province}, {info.city}, {info.street}
                      , {info.postal_code}
                    </p>
                  </div>
                </div>
                <div className={styles.addressActions}>
                  <button
                    className={styles.delete}
                    onClick={() => {
                      deleteAddressHandler(info.address_id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className={styles.edit}
                    onClick={() => {
                      getSpecificAddressHandler(info.address_id);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {toggleForm && (
          <AddressForm
            getAddress={getAddressHandler}
            FormAction={formInfo.FormAction}
            FormName={formInfo.FormName}
            setToggleForm={setToggleForm}
            addressDetails={addressDetails}
            setAddressDetails={setAddressDetails}
            DefaultAddressDetails={DefaultAddressDetails}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Address;
