import styles from "../../../styles/Collection/Items.module.css";

function Items({ Items }: any) {
  console.log(Items);
  return (
    <div className={styles.container}>
      <div className={styles.itemsContainer}>
        {Items.map((item: any) => (
          <div className={styles.items}>
            <div className={styles.productPhotoContainer}>
              <img src={item.productPhoto.url} />
            </div>
            <div className={styles.productInfoContainer}>
              <p>Name: {item.productName}</p>
              <p>Price: {item.productPrice}</p>
              <p>Stock: {item.productQuantity}</p>
              <button>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
