import styles from "../../../styles/UserPanel/Header.module.css";

interface Props {
  CurrentLink: string;
  setShowSidebar: any;
}

function Header({ CurrentLink, setShowSidebar }: Props) {
  return (
    <div className={styles.container}>
      <h2>{CurrentLink}</h2>
      <div
        className={styles.burger}
        onClick={() => setShowSidebar((prev: boolean) => !prev)}
      >
        <div className={styles.lines}></div>
        <div className={styles.lines}></div>
        <div className={styles.lines}></div>
      </div>
    </div>
  );
}

export default Header;
