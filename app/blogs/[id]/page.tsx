import Image from "next/image";
import { notFound } from "next/navigation";

import { BlogType } from "@/constants/types";
import { getBlogById } from "@/libs/blogs";
import { formatDate } from "@/libs/formatDate";

import styles from "./page.module.css";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let blogData: BlogType;
  try {
    // id mal formatté
    // id not found
    // id found, server error

    blogData = (await getBlogById(Number(id))) as BlogType;
    console.log("Blog data:", blogData);
  } catch (e) {
    notFound();
  }

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1>{blogData.title}</h1>
        <p>
          Created by <span className={styles.author}>{blogData.author}</span> at{" "}
          <span className={styles.createdAt}>
            {formatDate(blogData.createdAt)}
          </span>
        </p>
        <p>Likes: {blogData.likes}</p>
      </header>
      <div className={styles.imageContainer}>
        <Image
          src={blogData.imageUrl}
          alt={blogData.title}
          loading="lazy"
          width={500}
          height={500}
        />
      </div>
      <section className={styles.content}>
        <p>{blogData.content}</p>
      </section>
    </article>
  );
}
