import styles from "../../../../styles/Home/Footer.module.css";

function SocialMediaLinks() {
  return (
    <div className={styles.contactsContainer}>
      <h3>Get in touch</h3>
      <p>
        Any questions? Let us know in store at Lorem ipsum dolor sit amet
        consectetur adipisicing.
      </p>
      <div className={styles.socialMediaLinksContainer}>
        <i className={`fa-brands fa-facebook-f ${styles.facebook}`}></i>
        <i className={`fa-brands fa-discord ${styles.discord}`}></i>
        <i className={`fa-brands fa-youtube ${styles.youtube}`}></i>
        <i className={`fa-brands fa-twitter ${styles.twitter}`}></i>
      </div>
    </div>
  );
}

export default SocialMediaLinks;
