// import { formatDate } from '@/lib/format';
import Image from "next/image";

import { BlogType } from "@/constants/types";

import ButtonLike from "./ButtonLike";

import styles from "./blogs.module.css";
import { formatDate, hourFromNow } from "@/libs/formatDate";

 function Blog({ blog }: { blog: BlogType }) {
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
          <div>
            <ButtonLike />
          </div>
        </header>
        <p>{blog.content}</p>
      </div>
    </article>
  );
}

export default function Blogs({ blogs } : { blogs: BlogType[] }) {
  if (!blogs || blogs.length === 0) {
    return <p>There are no posts yet. Create a new one!</p>;
  }

  return (
    <ul className={styles.blogs}>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Blog blog={blog} />
        </li>
      ))}
    </ul>
  );
}