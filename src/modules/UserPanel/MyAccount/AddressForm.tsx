import { motion } from "framer-motion";
import Input from "../../../common/input/Input";
import styles from "../../../../styles/UserPanel/AddressForm.module.css";

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

function AddressForm({ setToggleForm }: any) {
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
                Disabled={false}
              />
            </div>
            <div className={styles.inputControl}>
              <Input
                Name="phoneNumber"
                Type="text"
                Label="Phone number"
                Disabled={false}
              />
            </div>
            <div className={styles.inputControl}>
              <Input
                Name="region"
                Type="text"
                Label="Region"
                Disabled={false}
              />
            </div>
            <div className={styles.inputControl}>
              <Input
                Name="province"
                Type="text"
                Label="Province"
                Disabled={false}
              />
            </div>
            <div className={styles.inputControl}>
              <Input Name="City" Type="text" Label="City" Disabled={false} />
            </div>
            <div className={styles.inputControl}>
              <Input
                Name="street"
                Type="text"
                Label="Street"
                Disabled={false}
              />
            </div>
            <div className={styles.inputControl}>
              <Input
                Name="postalCode"
                Type="text"
                Label="Postal Code"
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
