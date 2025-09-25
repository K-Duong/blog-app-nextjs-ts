// app/blogs/loading.tsx
import { LoadingSpinner } from "@/components";
import styles from "./loading.module.css";

export default function LoadingBlogs() {
  return (
    <div className={styles.loadingContainer}>
      <LoadingSpinner/>
    </div>
  );
}