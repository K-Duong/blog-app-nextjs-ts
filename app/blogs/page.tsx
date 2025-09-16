import { BlogType } from "@/types";
import { getAllBlogs } from "@/libs/blogs"
import { getCurrentUser } from "@/libs/auth";

import {BlogList} from "@/components";  

import styles from "./page.module.css"

export default async function BlogsPage(){
  const user = await getCurrentUser()
  const blogs = await getAllBlogs(Number(user.id)) as BlogType[];
  
  return (
    <div className={styles.contain}>
      <h1>{user && `Welcome back ${user?.username}. `}</h1>
      <BlogList blogs={blogs} />
    </div>
  )
}