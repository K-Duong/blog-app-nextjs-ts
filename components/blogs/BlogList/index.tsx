"use client";

import { useOptimistic } from "react";
import { useSession } from "next-auth/react";

import { BlogType } from "@/types";
import actionToggleLike from "@/actions/like";

import BlogItem from "../BlogItem";

import styles from "./styles.module.css";

export default function BlogList({ blogs }: { blogs: BlogType[] }) {
  const session = useSession();
  const username = session?.data?.user?.username;

  const [optimisticBlogs, setOptimisticBlogs] = useOptimistic(
    blogs,
    (prevBlogs, blogIdToUpdate) => {
      const index = prevBlogs.findIndex((blog) => blog.id === blogIdToUpdate);
      if (index === -1) return prevBlogs;
      const blogToUpdate = prevBlogs[index];
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.isLiked
          ? blogToUpdate.likes - 1
          : blogToUpdate.likes + 1,
        isLiked: !blogToUpdate.isLiked,
      };
      const newBlogs = [...prevBlogs];
      newBlogs[index] = updatedBlog;
      // console.log('updated blog:', updatedBlog)
      return newBlogs;
    }
  );

  const updateBlog = async (blogId: number) => {
    setOptimisticBlogs(blogId);
    await actionToggleLike(blogId);
  };

  if (!optimisticBlogs || optimisticBlogs.length === 0) {
    return (
      <p className={styles.noPost}>There are no posts yet. Create a new one!</p>
    );
  }

  return (
    <ul className={styles.blogs}>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <BlogItem
            blog={blog}
            action={updateBlog}
            isAuthor={username === blog.author}
          />
        </li>
      ))}
    </ul>
  );
}
