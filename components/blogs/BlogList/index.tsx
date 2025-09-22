"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { BlogType } from "@/types";
import actionToggleLike from "@/actions/like";

import { SelectField } from "@/components/form";
import BlogItem from "../BlogItem";

import styles from "./styles.module.css";

export default function BlogList({ blogs }: { blogs: BlogType[] }) {
  const session = useSession();
  const username = session?.data?.user?.username;
  const router = useRouter();

  const [blogsList, setBlogsList] = useState<BlogType[] | null>(blogs);
  const [typeOrder, setTypeOrder] = useState("createdAt");
  const [nameOrder, setNameOrder] = useState("DESC");

  const fetchOrderBlogs = async (type: string, order: string) => {
    const res = await fetch(`/api/blogs?type=${type}&order=${order}`, {
      method: "GET",
    });

    if (!res.ok) {
      router.push("/login");
    }

    const { data } = await res.json();
    setBlogsList(data);
    return data;
  };

  const updateLikesBlog = (blogIdToUpdate: number) => {
    setBlogsList((prevBlogs) => {
      if (!prevBlogs) return null;
      // update Like
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

      // update sorted list
      if (typeOrder === "likes") {
        return [...newBlogs].sort((blog1, blog2) =>
          nameOrder === "DESC"
            ? blog2.likes - blog1.likes
            : blog1.likes - blog2.likes
        );
      }
      return newBlogs;
    });
  };

  const handleSelectOrder = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const data = await fetchOrderBlogs(typeOrder, value);
    if (!data) {
      return;
    }
    setNameOrder(value);
  };

  const handleSelectType = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const data = await fetchOrderBlogs(value, nameOrder);
    if (!data) {
      return;
    }
    setTypeOrder(value);
  };

  const updateBlog = async (blogId: number) => {
    updateLikesBlog(blogId);
    await actionToggleLike(blogId);
  };

  if (!blogsList || blogsList.length === 0) {
    return (
      <p className={styles.noPost}>There are no posts yet. Create a new one!</p>
    );
  }

  return (
    <>
      {/* sorted blog */}
      <div className={styles.sorted}>
        <SelectField
          items={[
            { name: "author", label: "Author", value: "author" },
            { name: "date", label: "Created date", value: "createdAt" },
            { name: "likes", label: "Likes", value: "likes" },
          ]}
          field={{
            id: "6",
            label: "Type",
            type: "select",
            name: "select type",
          }}
          defaultValue={typeOrder}
          handleChange={handleSelectType}
        />
        <SelectField
          items={[
            { name: "asc", label: "Asc", value: "ASC" },
            { name: "desc", label: "Desc", value: "DESC" },
          ]}
          field={{
            id: "7",
            label: "Order",
            type: "select",
            name: "order",
          }}
          defaultValue={nameOrder}
          handleChange={handleSelectOrder}
        />
      </div>
      <ul className={styles.blogs}>
        {blogsList &&
          blogsList.map((blog) => (
            <li key={blog.id}>
              <BlogItem
                blog={blog}
                action={updateBlog}
                isAuthor={username === blog.author}
              />
            </li>
          ))}
      </ul>
    </>
  );
}
