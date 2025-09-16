"use client";

import { useOptimistic } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { BlogType } from "@/types";
import { MAXLENGTHTEXT } from "@/constants";
import actionToggleLike from "@/actions/like";
import { formatDate, hourFromNow, isDisplayedByHour } from "@/libs/formatDate";

import ButtonLike from "./ButtonLike";
import { ButtonModifyBlog } from "./buttons/ButtonModify";

import styles from "./blogs.module.css";
import { redirect } from "next/navigation";
function Blog({
  isAuthor,
  blog,
  action,
}: {
  isAuthor: boolean;
  blog: BlogType;
  action: (blogId: number) => Promise<void>;
}) {
  return (
    <article
      className={styles.blog}
      onClick={() => redirect(`/blogs/${blog.id}`)}
    >
      <div className={styles.image}>
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          width={100}
          height={100}
          loading="lazy"
        />
      </div>
      <div className={styles.blogInfo}>
        <header>
          <h2>{blog.title}</h2>
          <p className={styles.author}>
            Shared by {blog.author} on{" "}
            {/* display [...hours ago] if the blog has been posted < 3 days ago */}
            {isDisplayedByHour(blog.createdAt) ? (
              <span>{hourFromNow(blog.createdAt)}</span>
            ) : (
              <time dateTime={blog.createdAt}>
                {formatDate(blog.createdAt)}
              </time>
            )}
          </p>
        </header>
        <p className={styles.content}>
          {blog.content.length > MAXLENGTHTEXT
            ? blog.content.slice(0, MAXLENGTHTEXT) + "..."
            : blog.content}
        </p>
      </div>
      <div className={styles.actions}>
        <div className={styles.likeContainer}>
          <ButtonLike action={action} isLiked={blog.isLiked} blogId={blog.id} />
          <p>{blog.likes}</p>
        </div>
        {isAuthor && <ButtonModifyBlog blog={blog} />}
      </div>
    </article>
  );
}

export default function Blogs({ blogs }: { blogs: BlogType[] }) {
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
          <Blog
            blog={blog}
            action={updateBlog}
            isAuthor={username === blog.author}
          />
        </li>
      ))}
    </ul>
  );
}
