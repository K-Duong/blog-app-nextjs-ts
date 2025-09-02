import { BlogType } from "@/constants/types";
import { getAllBlogs } from "@/libs/blogs"

import Blogs from "@/components/Blogs";  

import styles from "./page.module.css"

export default async function BlogsPage(){
  const blogs = await getAllBlogs() as BlogType[];
  // console.log("Blogs:", blogs)
  return (
    <div className={styles.contain}>
      <h1>All posts by all users</h1>
      <Blogs blogs={blogs} />
    </div>
  )
}