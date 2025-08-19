import { FieldType } from "./types";

export const PATHS = {
  HOME: {
    path: '/',
    name: 'Home'
  },
  BLOGS: {
    path: '/blogs',
    name: 'Blogs'
  },
  NEWBLOG: {
    path: '/new-blog',
    name: 'New blog'
  },

}

export const FIELDS: Record<string, FieldType> = {
  title: {
    id: "title",
    label: "Title",
    type: "text",
    name: "title",
    validationRules: {
      required: true,
    },
  },
  image: {
    id: "image",
    label: "Image",
    type: "file",
    name: "image",
    validationRules: {
      required: true,
      maxSize: 1 * 1024 * 1024, // 1MB
    },
  },
  content: {
    id: "content",
    label: "Content",
    type: "text",
    name: "content",
    validationRules: {
      required: true,
    },
  },
};