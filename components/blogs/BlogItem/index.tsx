'use client'
import Image from "next/image";
import { redirect } from "next/navigation";

import { MAXLENGTHTEXT } from "@/constants";
import { BlogType } from "@/types";

import { formatDate, hourFromNow, isDisplayedByHour } from "@/libs/formatDate";

import {ButtonDeleteBlog, ButtonLike, ButtonModifyBlog} from "../../buttons";

import styles from "./styles.module.css";
// import { useState } from "react";

export default function BlogItem({
  isAuthor,
  blog,
  action,
}: {
  isAuthor: boolean;
  blog: BlogType;
  action: (blogId: number) => Promise<void>;
}) {
  // const [isOpenedModal, setIsOpenedModal] = useState(false);

  return (
    <>
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
        {isAuthor && <div className={styles.btns}>
           <ButtonModifyBlog blogId={blog.id} />
           <ButtonDeleteBlog blogId={blog.id} />
        </div>}
      </div>
    </article>
    
    </>
  );
}

