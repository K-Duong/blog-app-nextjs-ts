'use client'
import {  redirect } from "next/navigation"

import Button from "@/components/buttons/ButtonWrapper"

export default function ButtonModifyBlog ({blogId}: {blogId: number}) {
   const handleOpenEditor = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log("open editor for blog id:", blogId);
    e.stopPropagation();
      redirect(`/blogs/${blogId}/edit`);
  };
  return (
    <Button type="button" onClick={handleOpenEditor}> Edit </Button>
  )
}