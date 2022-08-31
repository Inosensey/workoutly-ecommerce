import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/Home/Blog.module.css";

interface Props {
  ImgSrc: string;
  ImgAlt: string;
  BlogTitle: string;
  BlogDate: string;
  PosterName: string;
  LinkUrl: string;
}

function BlogCards({
  ImgSrc,
  ImgAlt,
  BlogTitle,
  BlogDate,
  PosterName,
  LinkUrl,
}: Props) {
  return (
    <>
      <div className={styles.blogCard}>
        <div className={styles.blogImageContainer}>
          <Image src={ImgSrc} alt={ImgAlt} layout="fill" objectFit="cover" />
        </div>
        <div className={styles.blogInfo}>
          <h3
            onClick={() => {
              document.location.href = LinkUrl;
            }}
          >
            {BlogTitle}
          </h3>
          <div className={styles.blogName}>
            <h4>{PosterName}</h4>
            <p>{BlogDate}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogCards;
