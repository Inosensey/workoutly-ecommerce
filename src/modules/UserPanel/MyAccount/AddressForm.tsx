import { motion } from "framer-motion";
import Input from "../../../common/input/Input";
import styles from "../../../../styles/UserPanel/AddressForm.module.css";
import { useState } from "react";

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

const DefaultAddressDetails = {
  fullName: "",
  phoneNumber: "",
  region: "",
  province: "",
  city: "",
  street: "",
  postalCode: "",
};

function AddressForm({ setToggleForm }: any) {
  const [addressDetails, setAddressDetails] = useState(DefaultAddressDetails);

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
          <h3>New Address</h3>
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
                    fullName: e.target.value,
                  })
                }
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
                }}
              >
                Cancel
              </button>
              <button className={styles.add}>Add</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default AddressForm;
