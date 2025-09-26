"use client";
import { redirect } from "next/navigation";
import { IoIosAdd } from "react-icons/io";

import { BlogList, ButtonRedirect } from "@/components";

import styles from "./page.module.css";
import { useBlogsList } from "@/components/context/blogsContext";
import { useSession } from "next-auth/react";

export default  function BlogsPage() {
  const session = useSession();
  const user = session?.data?.user;
  if (!user) redirect("/login");

  const { blogsList } = useBlogsList();
  const hasBlog =
    blogsList?.findIndex((blog) => {
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
            <IoIosAdd style={{ fontSize: "1rem" }} />
            Create your first blog
          </ButtonRedirect>
        </div>
      )}
      <BlogList />
    </div>
  );
}
