import styles from "../../../styles/Home/Blog.module.css";
import BlogCard from "./BlogCard";

function Blog() {
  return (
    <section className={styles.container}>
      <div className={styles.sectionTitleContainer}>
        <h2>Our Blog</h2>
        <p>Explore the benefits when using our workout routines</p>
      </div>
      <div className={styles.blogCardContainer}>
        <BlogCard
          ImgSrc="/img/important-to-start.jpg"
          ImgAlt="BeginnerImg"
          BlogTitle="How important for your health to start exercising"
          PosterName="Philip Mathew"
          BlogDate="May 4, 2022"
          LinkUrl="https://workoutly-blog.vercel.app/posts/how-important-for-your-health-to-start-exercising"
        />
        <BlogCard
          ImgSrc="/img/exercise-benefits.jpg"
          ImgAlt="ExerciseBenefitsImg"
          BlogTitle="The benefits of living a healthy life style"
          PosterName="Philip Mathew"
          BlogDate="May 4, 2022"
          LinkUrl="https://workoutly-blog.vercel.app/posts/the-benefits-of-living-a-healthy-lifestyle"
        />
        <BlogCard
          ImgSrc="/img/athlete-mindset.jpg"
          ImgAlt="AthleteMindsetImg"
          BlogTitle="Think like an athelete: How mindset affect our workouts"
          PosterName="Philip Mathew"
          BlogDate="May 4, 2022"
          LinkUrl="https://workoutly-blog.vercel.app/posts/how-mindset-affect-our-workouts"
        />
      </div>
    </section>
  );
}

export default Blog;
