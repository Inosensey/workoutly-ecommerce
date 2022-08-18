import styles from "../../../../styles/Home/Footer.module.css";

function BlogSubscription() {
  return (
    <div className={styles.blogSubscriptionContainer}>
      <h3>Blog</h3>
      <div className={styles.blogInputControlContainer}>
        <input type="text" name="subscribe" placeholder="Email@example.com" />
        <button>Subscribe</button>
      </div>
    </div>
  );
}

export default BlogSubscription;
