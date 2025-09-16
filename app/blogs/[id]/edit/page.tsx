import { notFound } from "next/navigation";

import { BlogType } from "@/types";
import { getBlogById } from "@/libs/blogs";
import { getCurrentUser } from "@/libs/auth";

import FormNewBlog from "@/components/Form";

import styles from './page.module.css'

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}){
  const { id } = await params;
  const user = await getCurrentUser();

  const blogData = await getBlogById(Number(id)) as BlogType | null;
  if (!blogData || (blogData.author !== user.username ) ) {
    notFound();
  }
  // console.log("Blog data to edit:", blogData);
  return (
    <div className={styles.contain}>
      <header>
        <h1>Edit the blog</h1>
      </header>
      <main className={styles.main}>
        <FormNewBlog blog={blogData}/>
      </main>
    </div>
  )
}