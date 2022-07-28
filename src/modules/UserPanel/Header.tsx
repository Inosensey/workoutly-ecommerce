import styles from "../../../styles/UserPanel/Header.module.css";

interface Props {
  CurrentLink: string;
}

function Header({ CurrentLink }: Props) {
  return (
    <div className={styles.container}>
      <h2>{CurrentLink}</h2>
    </div>
  );
}

export default Header;
