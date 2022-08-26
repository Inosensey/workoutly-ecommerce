import { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoadingPopUp,
  showLoadingPopUp,
} from "../../Redux/Reducers/PopUpLoading";
import { RootState } from "../../Redux/store";
import { closePopUpCheckOut } from "../../Redux/Reducers/PopUpCheckOut";
import { closeCart, removeAllItemFromCart } from "../../Redux/Reducers/Cart";
import { showNotifPopUp } from "../../Redux/Reducers/PopUpNotif";

// Supabase
import addOrder from "../../Services/Supabase/addOrder";
import { getSpecificAddress } from "../../Services/Supabase/getAddresses";
import { supabase } from "../../Services/Supabase/supabaseClient";

//Typescripts
import {
  AddressDetailsType,
  AddressFormInfoType,
} from "../UserPanel/Logic/Types";
import { Item } from "../../TypeScript/ReusableTypes";

// Components
import AddressForm from "../UserPanel/MyAccount/AddressForm";
import Logic from "./Logic/Logic";

// Styles
import { AnimatePresence, motion } from "framer-motion";
import styles from "../../../styles/Checkout/PaymentMethod.module.css";

//Framer motion
const UlVariant = {
  hidden: {
    display: "none",
  },
  show: {
    display: "block",
  },
};
const DefaultFormInfo = {
  FormName: "",
  FormAction: "",
  id: 0,
};
// Default state values
const DefaultOrderDetails = {
  id: "",
  fullName: "",
  item: [
    {
      Quantity: 0,
      itemInfo: {
        description: {
          text: "",
        },
        id: "",
        productName: "",
        productPhoto: { url: "" },
        productPrice: 0,
        productQuantity: 1,
        slug: "",
      },
    },
  ],
  total_price: 0,
  address_id: 0,
  status: "",
};
const DefaultSelectedAddressInfo = {
  Name: "",
  Details: {
    address_id: 0,
    full_name: "",
    phone_number: "",
    region: "",
    province: "",
    city: "",
    street: "",
    postal_code: "",
  },
};

interface OrderDetails {
  id: string;
  fullName: string;
  item: Item[];
  total_price: number;
  address_id: number;
  status: string;
}
interface SelectedAddressInfo {
  Name: string;
  Details: AddressDetailsType;
}

function PaymentMethod() {
  const { getAddressHandler } = Logic();
  const dispatch = useDispatch();
  const session: any = supabase.auth.session();

  // UseSelector
  const cartPrice = useSelector((state: RootState) => state.cartReducer.price);
  const cartItems: Item[] = useSelector(
    (state: RootState) => state.cartReducer.cartItem
  );
  const totalPrice = 0.5 * (Number(cartPrice.totalPrice) + 2.99);

  // UseStates
  const [toggleAddressList, setToggleAddressList] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<AddressDetailsType[]>([]);
  const [selectedAddressDetails, setSelectedAddressDetails] =
    useState<SelectedAddressInfo>(DefaultSelectedAddressInfo);
  const [orderDetails, setOrderDetails] =
    useState<OrderDetails>(DefaultOrderDetails);
  const [formInfo, setFormInfo] =
    useState<AddressFormInfoType>(DefaultFormInfo);
  const [toggleForm, setToggleForm] = useState<boolean>(false);

  useEffect(() => {
    getAddressHandler(setAddressList);
    setOrderDetails({
      ...orderDetails,
      item: cartItems,
      total_price: totalPrice,
    });
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
    setSelectedAddressDetails((prev) => ({
      Name: response.data[0].province,
      Details: {
        ...prev.Details,
        address_id: response.data[0].address_id,
        full_name: response.data[0].full_name,
        phone_number: response.data[0].phone_number,
        region: response.data[0].region,
        province: response.data[0].province,
        city: response.data[0].city,
        street: response.data[0].street,
        postal_code: response.data[0].postal_code,
      },
    }));
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
    setSelectedAddressDetails(DefaultSelectedAddressInfo);
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
                {selectedAddressDetails.Name === ""
                  ? "Select Address"
                  : selectedAddressDetails.Name}{" "}
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
                {selectedAddressDetails.Details.address_id === 0
                  ? "No address selected"
                  : selectedAddressDetails.Details.full_name}
              </p>
            </div>
            <div className={styles.addressInfo}>
              <label>Phone:</label>
              <p>
                {selectedAddressDetails.Details.address_id === 0
                  ? "No address selected"
                  : selectedAddressDetails.Details.phone_number}
              </p>
            </div>
            <div className={styles.addressInfo}>
              <label>Address:</label>
              <p>
                {selectedAddressDetails.Details.address_id === 0
                  ? "No address selected"
                  : `${selectedAddressDetails.Details.region}, ${selectedAddressDetails.Details.province}, 
                  ${selectedAddressDetails.Details.city}, ${selectedAddressDetails.Details.street}
                      , ${selectedAddressDetails.Details.postal_code}`}
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
            id={formInfo.id}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default PaymentMethod;
