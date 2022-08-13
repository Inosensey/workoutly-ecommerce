import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  adjustItemQuantity,
} from "../../Redux/Reducers/Cart";
import { RootState } from "../../Redux/store";
import styles from "../../../styles/ShoppingCart/ShoppingCart.module.css";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state: RootState) => state.cartReducer.cartItem
  );
  console.log(cartItems);
  return (
    <div className={styles.cartItems}>
      {!cartItems.length ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#ccc",
            fontFamily: "League Spartan",
            fontSize: "1.2rem",
          }}
        >
          <h3>Shopping Cart is Empty</h3>
        </div>
      ) : (
        cartItems.map((item: any) => (
          <div className={styles.itemContainer} key={Math.random() * 1000}>
            <div className={styles.itemPhotoContainer}>
              <img src={`${item.itemInfo.productPhoto.url}`} alt="" />
            </div>
            <div className={styles.itemInfoContainer}>
              <p>{item.itemInfo.productName}</p>
              <p>{item.itemInfo.productPrice}$</p>
              <div className={styles.itemActionContainer}>
                <div className={styles.quantityContainer}>
                  <div className={styles.quantityController}>
                    <i
                      onClick={() =>
                        dispatch(
                          adjustItemQuantity({
                            itemInfo: item.itemInfo,
                            ActionType: "Decrement",
                          })
                        )
                      }
                      className="fa-solid fa-minus"
                    ></i>
                    <p>{item.Quantity}</p>
                    <i
                      onClick={() =>
                        dispatch(
                          adjustItemQuantity({
                            itemInfo: item.itemInfo,
                            ActionType: "Increment",
                          })
                        )
                      }
                      className="fa-solid fa-plus"
                    ></i>
                  </div>
                </div>
                <i
                  onClick={() => dispatch(removeItemFromCart(item.itemInfo.id))}
                  className="fa-solid fa-circle-xmark"
                ></i>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CartItem;
