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

const DefaultFormInfo = {
  FormName: "",
  FormAction: "",
  id: 0,
};

function Address() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [formInfo, setFormInfo] =
    useState<AddressFormInfoType>(DefaultFormInfo);
  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<AddressDetailsType[]>([]);

  useEffect(() => {
    getAddressHandler();
  }, []);

  const getAddressHandler = async () => {
    setLoading(true);
    const response: any = (await getAddresses()) || {};
    setLoading(false);
    setAddresses(response?.data);
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
                      setFormInfo({
                        ...formInfo,
                        FormName: "Edit Address",
                        FormAction: "Edit",
                        id: info.address_id,
                      });
                      setToggleForm(true);
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
            id={formInfo.id}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Address;
