import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../../../styles/UserPanel/Address.module.css";
import { toggleLoadingPopUp } from "../../../Redux/Reducers/PopUpLoading";
import deleteAddress from "../../../Services/Supabase/deleteAddress";
import {
  getAddresses,
  getSpecificAddress,
} from "../../../Services/Supabase/getAddresses";
import AddressForm from "./AddressForm";

const DefaultAddressDetails = {
  addressId: 0,
  fullName: "",
  phoneNumber: "",
  region: "",
  province: "",
  city: "",
  street: "",
  postalCode: "",
};
const DefaultFormInfo = {
  FormName: "",
  FormAction: "",
};

function Address() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formInfo, setFormInfo] = useState(DefaultFormInfo);
  const [toggleForm, setToggleForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressDetails, setAddressDetails] = useState(DefaultAddressDetails);

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
      toggleLoadingPopUp({
        ActionName: "Getting address",
        LoadingMessage: "Please wait while we fetch your address",
        isLoading: true,
      })
    );
    const response: any = (await getSpecificAddress(id)) || {};
    setAddressDetails({
      ...addressDetails,
      addressId: response.data[0].address_id,
      fullName: response.data[0].full_name,
      phoneNumber: response.data[0].phone_number,
      region: response.data[0].region,
      province: response.data[0].province,
      city: response.data[0].city,
      street: response.data[0].street,
      postalCode: response.data[0].postal_code,
    });
    dispatch(
      toggleLoadingPopUp({
        ActionName: "",
        LoadingMessage: "",
        isLoading: false,
      })
    );
    setFormInfo({ ...formInfo, FormName: "Edit Address", FormAction: "Edit" });
    setToggleForm(true);
  };
  const deleteAddressHandler = async (addressId: number) => {
    dispatch(
      toggleLoadingPopUp({
        ActionName: "Deleting address",
        LoadingMessage: "Please wait while we delete your address",
        isLoading: true,
      })
    );
    const response: any = await deleteAddress(addressId);
    if (response.error === null) {
      getAddressHandler();
    }
    dispatch(
      toggleLoadingPopUp({
        ActionName: "",
        LoadingMessage: "",
        isLoading: false,
      })
    );
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
            {addresses.map((info: any) => (
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
