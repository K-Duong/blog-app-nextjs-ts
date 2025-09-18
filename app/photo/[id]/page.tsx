import Image from "next/image";
import { notFound } from "next/navigation";

import { getBlogById } from "@/libs/blogs";
import { BlogType } from "@/types";

import styles from "./page.module.css"

export default async function PhotoPage({params} : {params: Promise<{ id: string }>}) {
  const {id} = await params;
  if (!id || !Number(id) ) {
    notFound();
  } 
   let blogData: BlogType
    try {
      blogData = (await getBlogById(Number(id))) as BlogType;
    } catch (e) {
      notFound();
    }
  return (
    <div className={styles.photoContainer}>
      <Image
        src={blogData && blogData.imageUrl ? blogData.imageUrl:''}
        alt="photo of the blog"
        fill
        priority
      />
      </div>
  );
}
