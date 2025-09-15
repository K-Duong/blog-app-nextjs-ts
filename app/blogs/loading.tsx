// app/blogs/loading.tsx
import styles from "./loading.module.css";

export default function LoadingBlogs() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Loading blogs...</h1>
      <div className={styles.skeletonCard}></div>
      <div className={styles.skeletonCard}></div>
      <div className={styles.skeletonCard}></div>
    </div>
  );
}