import { useState } from "react";
import Address from "./MyAccount/Address";
import ChangePassword from "./MyAccount/ChangePassword";
import ProfileForm from "./MyAccount/ProfileForm";
import styles from "../../../styles/UserPanel/MyAccount.module.css";

function MyAccountContents() {
  const [currentTab, setCurrentTab] = useState("My Profile");
  return (
    <>
      <div className={styles.tabContainer}>
        <ul className={styles.tabs}>
          <li
            style={{
              borderBottom:
                currentTab === "My Profile" ? "1px solid #ff7777" : "none",
            }}
            onClick={() => setCurrentTab("My Profile")}
          >
            My Profile
          </li>
          <li
            style={{
              borderBottom:
                currentTab === "Address" ? "1px solid #ff7777" : "none",
            }}
            onClick={() => setCurrentTab("Address")}
          >
            Address
          </li>
          <li
            style={{
              borderBottom:
                currentTab === "Change password" ? "1px solid #ff7777" : "none",
            }}
            onClick={() => setCurrentTab("Change password")}
          >
            Change password
          </li>
        </ul>
      </div>
      <div className={styles.contentContainer}>
        {currentTab === "My Profile" && <ProfileForm />}
        {currentTab === "Address" && <Address />}
        {currentTab === "Change password" && <ChangePassword />}
      </div>
    </>
  );
}

export default MyAccountContents;
