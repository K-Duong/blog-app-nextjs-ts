'use client'
import { BlogType } from "@/types";
import { createContext, useContext, useEffect, useState,  } from "react";

interface Values {
  blogsList: BlogType[] | null;
  setBlogsList: React.Dispatch<React.SetStateAction<BlogType[] | null>>;
}

export const BlogsContext = createContext<Values | undefined>(undefined);

export function BlogsProvider({
  blogs,
  children,
}: {
  blogs: BlogType[];
  children: React.ReactNode;
}) {
  const [blogsList, setBlogsList] = useState<BlogType[] | null>(blogs);
  
  useEffect(() => {
    setBlogsList(blogs)
  },[blogs])

  return (
    <BlogsContext.Provider value={{blogsList, setBlogsList}}>
      {children}
    </BlogsContext.Provider>
  )
};

export function useBlogsList() {
  const context = useContext(BlogsContext);
  if (!context) {
    throw new Error("useBlogsList must be used within a BlogsProvider");
  }
  return context;
}
