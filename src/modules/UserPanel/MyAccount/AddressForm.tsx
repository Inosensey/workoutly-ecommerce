import { motion } from "framer-motion";
import Input from "../../../common/input/Input";
import styles from "../../../../styles/UserPanel/AddressForm.module.css";
import { useState } from "react";
import addAddress from "../../../Services/Supabase/addAddress";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { toggleLoadingPopUp } from "../../../Redux/Reducers/PopUpLoading";
import updateAddress from "../../../Services/Supabase/updateAddress";

// Framer Motion Variants
const DropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

function AddressForm({
  getAddress,
  setToggleForm,
  addressDetails,
  setAddressDetails,
  DefaultAddressDetails,
  FormName,
  FormAction,
}: any) {
  const dispatch = useDispatch();
  const Session: any =
    useSelector((state: RootState) => state.AuthReducer.Session) || {};

  const addAddressHandler = async () => {
    dispatch(
      toggleLoadingPopUp({
        ActionName: "Adding Address",
        LoadingMessage: "Please wait while we add your address",
        isLoading: true,
      })
    );
    const response = await addAddress(addressDetails, Session.User.id);
    if (response?.data == null && response?.error == null) {
      setAddressDetails(DefaultAddressDetails);
      setToggleForm(false);
      getAddress();
    }
    dispatch(
      toggleLoadingPopUp({
        ActionName: "",
        LoadingMessage: "",
        isLoading: false,
      })
    );
  };
  const updateAddressHandler = async () => {
    dispatch(
      toggleLoadingPopUp({
        ActionName: "Updating Address",
        LoadingMessage: "Please wait while we update your address",
        isLoading: true,
      })
    );
    const response = await updateAddress(addressDetails);
    if (response?.data !== null) {
      setAddressDetails(DefaultAddressDetails);
      setToggleForm(false);
      getAddress();
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
    <div className={styles.overlay}>
      <motion.div
        className={styles.container}
        variants={DropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.popUpContainer}>
          <h3>{FormName}</h3>
          <form className={styles.formControl}>
            <div className={styles.inputControl}>
              <Input
                Name="fullName"
                Type="text"
                Label="Full name"
                inputValue={addressDetails.fullName}
                setInputValue={(e: any) =>
                  setAddressDetails({
                    ...addressDetails,
                    fullName: e.target.value,
                  })
                }
                enableValidation={false}
                Notification={""}
                Valid={null}
                Disabled={false}
              />
            </div>
            <div className={styles.inputControl}>
              <Input
                Name="phoneNumber"
                Type="text"
                Label="Phone number"
                inputValue={addressDetails.phoneNumber}
                setInputValue={(e: any) =>
                  setAddressDetails({
                    ...addressDetails,
                    phoneNumber: e.target.value,
                  })
                }
                enableValidation={false}
                Notification={""}
                Valid={null}
                Disabled={false}
              />
            </div>
            <div className={styles.inputControl}>
              <Input
                Name="region"
                Type="text"
                Label="Region"
                inputValue={addressDetails.region}
                setInputValue={(e: any) =>
                  setAddressDetails({
                    ...addressDetails,
                    region: e.target.value,
                  })
                }
                enableValidation={false}
                Notification={""}
                Valid={null}
                Disabled={false}
              />
            </div>
            <div className={styles.inputControl}>
              <Input
                Name="province"
                Type="text"
                Label="Province"
                inputValue={addressDetails.province}
                setInputValue={(e: any) =>
                  setAddressDetails({
                    ...addressDetails,
                    province: e.target.value,
                  })
                }
                enableValidation={false}
                Notification={""}
                Valid={null}
                Disabled={false}
              />
            </div>
            <div className={styles.inputControl}>
              <Input
                Name="city"
                Type="text"
                Label="City"
                inputValue={addressDetails.city}
                setInputValue={(e: any) =>
                  setAddressDetails({ ...addressDetails, city: e.target.value })
                }
                enableValidation={false}
                Notification={""}
                Valid={null}
                Disabled={false}
              />
            </div>
            <div className={styles.inputControl}>
              <Input
                Name="street"
                Type="text"
                Label="Street"
                inputValue={addressDetails.street}
                setInputValue={(e: any) =>
                  setAddressDetails({
                    ...addressDetails,
                    street: e.target.value,
                  })
                }
                enableValidation={false}
                Notification={""}
                Valid={null}
                Disabled={false}
              />
            </div>
            <div className={styles.inputControl}>
              <Input
                Name="postalCode"
                Type="text"
                Label="Postal Code"
                inputValue={addressDetails.postalCode}
                setInputValue={(e: any) =>
                  setAddressDetails({
                    ...addressDetails,
                    postalCode: e.target.value,
                  })
                }
                enableValidation={false}
                Notification={""}
                Valid={null}
                Disabled={false}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.cancel}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setToggleForm(false);
                  setAddressDetails(DefaultAddressDetails);
                }}
              >
                Cancel
              </button>
              <button
                className={styles.add}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  FormAction === "Add"
                    ? addAddressHandler()
                    : updateAddressHandler();
                }}
              >
                {FormAction === "Add" ? "Add" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default AddressForm;
