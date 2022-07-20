import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/403/AccessForbidden.module.css";
import Nav from "../../common/Nav";

function AccessForbidden() {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imgContainer}>
            <Image
              src="/img/access-forbidden.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={styles.message}>
            <h2>Access Denied</h2>
            <p>
              Seems like you are not allowed to access this page. Click the
              button below to go back
            </p>
            <Link href="/">
              <button>Click here</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccessForbidden;
