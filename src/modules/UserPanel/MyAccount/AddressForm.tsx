import { motion } from "framer-motion";
import Input from "../../../common/input/Input";
import addAddress from "../../../Services/Supabase/addAddress";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import {
  hideLoadingPopUp,
  showLoadingPopUp,
} from "../../../Redux/Reducers/PopUpLoading";
import updateAddress from "../../../Services/Supabase/updateAddress";
import styles from "../../../../styles/UserPanel/AddressForm.module.css";
import { showNotifPopUp } from "../../../Redux/Reducers/PopUpNotif";
import { AddressDetailsType } from "../Logic/Types";
import { useEffect, useState } from "react";
import { getSpecificAddress } from "../../../Services/Supabase/getAddresses";

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

interface Props {
  getAddress: any;
  setToggleForm: any;
  FormName: string;
  FormAction: string;
  id: number;
}

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

function AddressForm({
  getAddress,
  setToggleForm,
  FormName,
  FormAction,
  id,
}: Props) {
  const dispatch = useDispatch();
  const Session: any =
    useSelector((state: RootState) => state.AuthReducer.Session) || {};
  const [addressDetails, setAddressDetails] = useState<AddressDetailsType>(
    DefaultAddressDetails
  );

  useEffect(() => {
    if (FormAction === "Edit") {
      getSpecificAddressHandler(id);
    }
  }, []);

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
  };

  const addAddressHandler = async () => {
    dispatch(
      showLoadingPopUp({
        ActionName: "Adding Address",
        LoadingMessage: "Please wait while we add your address",
        isLoading: true,
      })
    );
    const response = await addAddress(addressDetails, Session.User.id);
    dispatch(hideLoadingPopUp());
    if (response?.data == null && response?.error == null) {
      ClearAddressForm();
    }
  };
  const updateAddressHandler = async () => {
    dispatch(
      showLoadingPopUp({
        ActionName: "Updating Address",
        LoadingMessage: "Please wait while we update your address",
        isLoading: true,
      })
    );
    const response = await updateAddress(addressDetails);
    dispatch(hideLoadingPopUp());
    if (response?.data !== null) {
      ClearAddressForm();
    }
  };

  const ClearAddressForm = () => {
    setAddressDetails(DefaultAddressDetails);
    setToggleForm(false);
    getAddress();
    if (FormAction === "Add")
      dispatch(
        showNotifPopUp({
          NotifType: "Add Address",
          NotifName: "Notification",
          NotifMessage: "Address Added Successfully.",
          NotifAction: null,
          show: true,
        })
      );
    if (FormAction !== "Add")
      dispatch(
        showNotifPopUp({
          NotifType: "Update Address",
          NotifName: "Notification",
          NotifMessage: "Address Updated Successfully.",
          NotifAction: null,
          show: true,
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
                inputValue={addressDetails.full_name}
                setInputValue={(e: any) =>
                  setAddressDetails({
                    ...addressDetails,
                    full_name: e.target.value,
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
                inputValue={addressDetails.phone_number}
                setInputValue={(e: any) =>
                  setAddressDetails({
                    ...addressDetails,
                    phone_number: e.target.value,
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
                inputValue={addressDetails.postal_code}
                setInputValue={(e: any) =>
                  setAddressDetails({
                    ...addressDetails,
                    postal_code: e.target.value,
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
