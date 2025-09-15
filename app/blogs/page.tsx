import { getServerSession } from "next-auth";
import { BlogType } from "@/types";
import { getAllBlogs } from "@/libs/blogs"

import { authOptions } from "../api/auth/[...nextauth]/route";
import Blogs from "@/components/Blogs";  

import styles from "./page.module.css"

export default async function BlogsPage(){
  const session = await getServerSession(authOptions); 
  const blogs = await getAllBlogs(Number(session?.user.id)) as BlogType[];
  
  return (
    <div className={styles.contain}>
      <h1>{session?.user && `Welcome back ${session.user?.username}. `}</h1>
      <Blogs blogs={blogs} />
    </div>
  )
}