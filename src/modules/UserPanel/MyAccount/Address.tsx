import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "../../../../styles/UserPanel/Address.module.css";
import getAddresses from "../../../Services/Supabase/getAddresses";
import AddressForm from "./AddressForm";

function Address() {
  const [toggleForm, setToggleForm] = useState(false);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getAddressHandler();
  }, []);

  const getAddressHandler = async () => {
    const response: any = (await getAddresses()) || {};
    setAddresses(response?.data);
  };

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
        {/* <div
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
        </div> */}
        <div className={styles.addressList}>
          {addresses.map((info: any) => (
            <div className={styles.address}>
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
                    {info.region}, {info.province}, {info.city}, {info.street},{" "}
                    {info.postal_code}
                  </p>
                </div>
              </div>
              <div className={styles.addressActions}>
                <button className={styles.delete}>Delete</button>
                <button className={styles.edit}>Edit</button>
              </div>
            </div>
          ))}
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
