import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { BlogType } from "@/types";
import { getBlogById } from "@/libs/blogs";
import { formatDate } from "@/libs/formatDate";
import { getCurrentUser } from "@/libs/auth";

import {ButtonModifyBlog, ButtonDeleteBlog } from "@/components";

import styles from "./page.module.css";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if(!user) redirect ('/login');
  let blogData: BlogType;
  try {
    blogData = (await getBlogById(Number(id), Number(user.id))) as BlogType;
    // console.log("Blog data:", blogData);
  } catch (e) {
    notFound();
  }

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.textHeader}>
          {" "}
          <h1 className={styles.title}>{blogData.title}</h1>
          <div className={styles.meta}>
            <div className={styles.info}>
              <p>
                Created by{" "}
                <strong className={styles.author}>{blogData.author}</strong> at{" "}
                <span className={styles.createdAt}>
                  {formatDate(blogData.createdAt)}
                </span>
              </p>
              <p>Likes: {blogData.likes}</p>
            </div>
            {user.username === blogData.author && (
              <div className={styles.btns}>
                <ButtonModifyBlog blogId={blogData.id} />
                <ButtonDeleteBlog blogId={blogData.id} />
              </div>
            )}
          </div>
        </div>
      </header>
      <div className={styles.imageContainer}>
        <Link href={{pathname:`/photo/${blogData.id}`}}>
          <Image
            src={blogData.imageUrl}
            alt={blogData.title}
            width={300}
            height={300}
            priority={true}
          />
        </Link>
      </div>
      <section className={styles.content}>
        <p>{blogData.content}</p>
      </section>
    </article>
  );
}
