import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "../../../../styles/UserPanel/Address.module.css";
import AddressForm from "./AddressForm";

function Address() {
  const [toggleForm, setToggleForm] = useState(false);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h3>Address</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setToggleForm(true)}
          >
            <i className="fa-solid fa-circle-plus"></i> Add new Address
          </motion.button>
        </div>
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
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {toggleForm && <AddressForm setToggleForm={setToggleForm} />}
      </AnimatePresence>
    </>
  );
}

export default Address;
