import styles from "../../../../styles/Home/Footer.module.css";
import { CategoriesType } from "../Logic/Types";

interface Props {
  CategoryList: CategoriesType[];
}

function Categories({ CategoryList }: Props) {
  return (
    <div className={styles.categoriesContainer}>
      <h3>Categories</h3>
      <div className={styles.categoryNames}>
        {CategoryList.map((category: CategoriesType) => (
          <p key={category.categoryName}>{category.categoryName}</p>
        ))}
      </div>
    </div>
  );
}

export default Categories;
