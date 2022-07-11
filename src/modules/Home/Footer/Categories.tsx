import styles from "../../../../styles/Home/Footer.module.css";

function Categories({ CategoryList }: any) {
  return (
    <div className={styles.categoriesContainer}>
      <h3>Categories</h3>
      <div className={styles.categoryNames}>
        {CategoryList.map((category: any) => (
          <p key={category.categoryName}>{category.categoryName}</p>
        ))}
      </div>
    </div>
  );
}

export default Categories;
