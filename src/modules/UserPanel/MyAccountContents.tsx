import { useState } from "react";
import Address from "./MyAccount/Address";
import ChangePassword from "./MyAccount/ChangePassword";
import ProfileForm from "./MyAccount/ProfileForm";
import Tabs from "./Tabs";
import styles from "../../../styles/UserPanel/MyAccount.module.css";

function MyAccountContents() {
  const [currentTab, setCurrentTab] = useState("My Profile");
  const [tabLists] = useState(["My Profile", "Address"]);
  return (
    <div className={styles.content}>
      <Tabs
        current={currentTab}
        tabList={tabLists}
        setCurrentTab={setCurrentTab}
      />
      <div className={styles.contentContainer}>
        {currentTab === "My Profile" && <ProfileForm />}
        {currentTab === "Address" && <Address />}
        {/* {currentTab === "Change password" && <ChangePassword />} */}
      </div>
    </div>
  );
}

export default MyAccountContents;
