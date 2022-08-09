import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoadingPopUp,
  showLoadingPopUp,
} from "../../Redux/Reducers/PopUpLoading";
import { RootState } from "../../Redux/store";
import addOrder from "../../Services/Supabase/addOrder";
import {
  getAddresses,
  getSpecificAddress,
} from "../../Services/Supabase/getAddresses";
import { supabase } from "../../Services/Supabase/supabaseClient";
import AddressForm from "../UserPanel/MyAccount/AddressForm";
import styles from "../../../styles/Checkout/PaymentMethod.module.css";
import { closePopUpCheckOut } from "../../Redux/Reducers/PopUpCheckOut";
import { closeCart, removeAllItemFromCart } from "../../Redux/Reducers/Cart";
import { showNotifPopUp } from "../../Redux/Reducers/PopUpNotif";

//Framer motion
const UlVariant = {
  hidden: {
    display: "none",
  },
  show: {
    display: "block",
  },
};

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
const DefaultOrderDetails = {
  id: "",
  fullName: "",
  item: {},
  total_price: 0,
  address_id: 0,
  status: "",
};

function PaymentMethod() {
  const dispatch = useDispatch();
  const [toggleAddressList, setToggleAddressList] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [formInfo, setFormInfo] = useState(DefaultFormInfo);
  const [toggleForm, setToggleForm] = useState(false);
  const [addressDetails, setAddressDetails] = useState(DefaultAddressDetails);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedAddressDetails, setSelectedAddressDetails] = useState(
    DefaultAddressDetails
  );
  const [orderDetails, setOrderDetails] = useState(DefaultOrderDetails);
  const cartPrice = useSelector((state: RootState) => state.cartReducer.price);
  const cartItems = useSelector(
    (state: RootState) => state.cartReducer.cartItem
  );
  const totalPrice = 0.5 * (Number(cartPrice.totalPrice) + 2.99);
  const session: any = supabase.auth.session();

  useEffect(() => {
    getAddressHandler();
    setOrderDetails({
      ...orderDetails,
      item: cartItems,
      total_price: totalPrice,
    });
  }, []);

  const getAddressHandler = async () => {
    const response: any = await getAddresses();
    setAddressList(response?.data);
  };

  const getSpecificAddressHandler = async (id: number) => {
    dispatch(
      showLoadingPopUp({
        ActionName: "Getting address",
        LoadingMessage: "Please wait while we fetch your address",
        isLoading: true,
      })
    );
    const response: any = (await getSpecificAddress(id)) || {};
    setSelectedAddressDetails({
      ...selectedAddressDetails,
      addressId: response.data[0].address_id,
      fullName: response.data[0].full_name,
      phoneNumber: response.data[0].phone_number,
      region: response.data[0].region,
      province: response.data[0].province,
      city: response.data[0].city,
      street: response.data[0].street,
      postalCode: response.data[0].postal_code,
    });
    setOrderDetails({
      ...orderDetails,
      id: session.user.id,
      fullName: response.data[0].full_name,
      address_id: response.data[0].address_id,
      status: "Packed",
    });
    dispatch(hideLoadingPopUp());
  };
  const addOrderHandler = async () => {
    if (orderDetails.address_id === 0) {
      return dispatch(
        showNotifPopUp({
          NotifType: "Error Order",
          NotifName: "Notification",
          NotifMessage:
            "Select an address first or add an address if you don't have one before completing your purchase",
          NotifAction: null,
          show: true,
        })
      );
    }
    dispatch(
      showLoadingPopUp({
        ActionName: "Adding order",
        LoadingMessage: "Please wait while we take care of your order",
        isLoading: true,
      })
    );
    const response = await addOrder(orderDetails);
    dispatch(hideLoadingPopUp());
    if (response?.data === null && response.error === null) {
      ClearShoppingCart();
    }
  };
  const ClearShoppingCart = () => {
    setAddressDetails(DefaultAddressDetails);
    setSelectedAddressDetails(DefaultAddressDetails);
    setSelectedAddress("");
    dispatch(closePopUpCheckOut());
    dispatch(removeAllItemFromCart());
    dispatch(closeCart());
    dispatch(
      showNotifPopUp({
        NotifType: "Add Order",
        NotifName: "Notification",
        NotifMessage:
          "Successfully ordered. Thank you for your purchase!. Do you want to view your order?",
        NotifAction: null,
        show: true,
      })
    );
  };
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.header}>Payment method</h2>
        <div className={styles.addressContainer}>
          <h2>COD (Cash On Delivery)</h2>
          <div className={styles.addressListContainer}>
            <div className={styles.addressList}>
              <p onClick={() => setToggleAddressList((prev) => !prev)}>
                {selectedAddress === "" ? "Select Address" : selectedAddress}{" "}
                <i className="fa-solid fa-circle-chevron-down"></i>
              </p>
              <motion.ul
                variants={UlVariant}
                initial="hidden"
                animate={toggleAddressList ? "show" : "hidden"}
              >
                {addressList.length === 0 ? (
                  <li>No address yet</li>
                ) : (
                  addressList.map((info: any) => (
                    <li
                      key={info.address_id}
                      className={styles.addresses}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAddress(info.province);
                        getSpecificAddressHandler(info.address_id);
                        setToggleAddressList(false);
                      }}
                    >
                      {info.province}
                    </li>
                  ))
                )}
              </motion.ul>
            </div>
            <div className={styles.addNewAddressBtnContainer}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFormInfo({
                    ...formInfo,
                    FormName: "New Address",
                    FormAction: "Add",
                  });
                  setToggleForm(true);
                }}
              >
                Add new address <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div className={styles.addressInfoContainer}>
            <div className={styles.addressInfo}>
              <label>Full Name:</label>
              <p>
                {selectedAddressDetails.addressId === 0
                  ? "No address selected"
                  : selectedAddressDetails.fullName}
              </p>
            </div>
            <div className={styles.addressInfo}>
              <label>Phone:</label>
              <p>
                {selectedAddressDetails.addressId === 0
                  ? "No address selected"
                  : selectedAddressDetails.phoneNumber}
              </p>
            </div>
            <div className={styles.addressInfo}>
              <label>Address:</label>
              <p>
                {selectedAddressDetails.addressId === 0
                  ? "No address selected"
                  : `${selectedAddressDetails.region}, ${selectedAddressDetails.province}, 
                  ${selectedAddressDetails.city}, ${selectedAddressDetails.street}
                      , ${selectedAddressDetails.postalCode}`}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.checkoutBtnContainer}>
          <button onClick={() => addOrderHandler()}>
            Checkout <i className="fa-solid fa-cash-register"></i>
          </button>
        </div>
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

export default PaymentMethod;
