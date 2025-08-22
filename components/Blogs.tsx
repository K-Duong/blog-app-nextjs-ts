'use client';
import { useOptimistic } from "react";
import Image from "next/image";

import { BlogType } from "@/constants/types";
import { MAXLENGTH } from "@/constants";
import actionToggleLike from "@/actions/like";

import { formatDate, hourFromNow } from "@/libs/formatDate";
import ButtonLike from "./ButtonLike";

import styles from "./blogs.module.css";

 function Blog({ blog, action }: { blog: BlogType, action: (blogId: number) => Promise<void> }) {
  return (
    <article className={styles.blog}>
      <div className={styles.image}>
        <Image src={blog.imageUrl} alt={blog.title} width={100} height={100} loading="lazy" />
      </div>
      <div className={styles.blogContent}>
        <header>
          <div>
            <h2>{blog.title}</h2>
            <p>
              Shared by {blog.author} on{' '}
              <span>{hourFromNow(blog.createdAt)} - </span>
              <time dateTime={blog.createdAt}>
                {formatDate(blog.createdAt)}
              </time>
            </p>
            
          </div>
          <div className={styles.likeContainer}>
            <ButtonLike action={action} isLiked={blog.isLiked} blogId={blog.id} /> 
            <p>{blog.likes}</p>
          </div>
        </header>
        <p>{blog.content.length > MAXLENGTH ? blog.content.slice(0,MAXLENGTH)+'...' : blog.content}</p>
      </div>
    </article>
  );
}

export default function Blogs({ blogs } : { blogs: BlogType[] }) {

  const [optimisticBlogs, setOptimisticBlogs] = useOptimistic(blogs, (prevBlogs, blogIdToUpdate) => {
    const index = prevBlogs.findIndex((blog) => blog.id === blogIdToUpdate);
    if (index === -1) return prevBlogs;
    const blogToUpdate = prevBlogs[index];
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.isLiked ? blogToUpdate.likes-1 : blogToUpdate.likes+1,
      isLiked: !blogToUpdate.isLiked
    };
    const newBlogs = [...prevBlogs];
    newBlogs[index] = updatedBlog;
    return newBlogs;
  });
  
  const updateBlog = async (blogId: number) => {
    setOptimisticBlogs(blogId);
    await actionToggleLike(blogId); 
  }

 
  if (!optimisticBlogs || optimisticBlogs.length === 0) {
    return <p>There are no posts yet. Create a new one!</p>;
  }

  return (
    <ul className={styles.blogs}>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Blog blog={blog} action={updateBlog} />
        </li>
      ))}
    </ul>
  );
}