import { redirect } from "next/navigation";
import { IoIosAdd } from "react-icons/io";

import { BlogType } from "@/types";
import { getAllBlogs } from "@/libs/blogs";
import { getCurrentUser } from "@/libs/auth";

import { BlogList, ButtonRedirect, IconProvider } from "@/components";

import styles from "./page.module.css";

export default async function BlogsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const blogs = (await getAllBlogs(Number(user.id))) as BlogType[];

  const hasBlog =
    blogs.findIndex((blog) => {
      return blog.author === user.username;
    }) !== -1;
    
  return (
    <div className={styles.contain}>
      <h1>{user && `Welcome back ${user?.username}. `}</h1>
      {!hasBlog && (
        <div className={styles.cta}>
          {" "}
          <h3>{"Let's create your first blog!"}</h3>
          <ButtonRedirect path="/new-blog">
            <IoIosAdd style={{fontSize: '1rem'}}/>
            Create your first blog
          </ButtonRedirect>
        </div>
      )}
      <BlogList blogs={blogs} />
    </div>
  );
}
