import { db } from "./db";
import { UserPayload, BlogDataType, BlogPayload} from "@/types";
// import { waitForDebug } from "./utils";

// queries
export async function getAllBlogs(userId: number, maxLimit?: number,) {
  // we suppose that the current user can see all blogs of all users and he can like any blog. There are also counter for likes and the button is liked or not.
  let limitClause = '';
  if (maxLimit && maxLimit > 0) {
    limitClause = `LIMIT ?`
  };

  const stmt = db.prepare( `
    SELECT blogs.id, blogs.title, blogs.content, blogs.image_url as imageUrl, blogs.created_at as createdAt, users.username as author, COUNT(likes.blog_id) as likes, 
    EXISTS (SELECT * FROM likes  
      INNER JOIN users ON likes.user_id = users.id
      WHERE likes.blog_id = blogs.id AND likes.user_id = ?) as isLiked
    FROM blogs
    INNER JOIN users ON blogs.user_id = users.id
    LEFT JOIN likes ON likes.blog_id = blogs.id
    GROUP BY blogs.id
    ORDER BY blogs.created_at DESC
    ${limitClause}`
  );
  // await waitForDebug(3000) // simulate delay
  return maxLimit ? stmt.all(maxLimit, userId) : stmt.all(userId);
};


export async function getBlogById(blogId: number, userId?: number) { // userId is optional, it is not necessary for editing the blog
  const stmt = db.prepare(`SELECT blogs.id, blogs.title, blogs.content, blogs.image_url as imageUrl, blogs.created_at as createdAt, users.username as author, COUNT(likes.blog_id) as likes, 
    EXISTS(SELECT * FROM likes  
      INNER JOIN users ON likes.user_id = users.id
      WHERE likes.blog_id = blogs.id AND likes.user_id = ?
      ) as isLiked
    FROM blogs 
    INNER JOIN users ON blogs.user_id = users.id
    LEFT JOIN likes ON likes.blog_id = blogs.id 
    WHERE blogs.id = ?
    GROUP BY blogs.id`);

  const result = stmt.get(userId, blogId);
  if (!result) {
    throw new Error('Blog not found');
  } else {
    return result
  }
};

export const sortBlogsByType = async (userId: number, type: string, order: string)=> {
    const stmt = db.prepare( `
    SELECT blogs.id, blogs.title, blogs.content, blogs.image_url as imageUrl, blogs.created_at as createdAt, users.username as author, COUNT(likes.blog_id) as likes, 
    EXISTS (SELECT * FROM likes  
      INNER JOIN users ON likes.user_id = users.id
      WHERE likes.blog_id = blogs.id AND likes.user_id = ?) as isLiked
    FROM blogs
    INNER JOIN users ON blogs.user_id = users.id
    LEFT JOIN likes ON likes.blog_id = blogs.id
    GROUP BY blogs.id
    ORDER BY ${type} ${order}`
  );
  return stmt.all(userId);
}

////MUTATIONS
// create new blog:
export async function storeBlog(blog: BlogPayload) {
  const user = db.prepare('SELECT * FROM users WHERE id = ?');
  const currentUser = user.get(blog.userId);
  if (!currentUser) {
    throw new Error('User not found')
  } else {
    const stmt = db.prepare(`
    INSERT INTO blogs (image_url, title, content, user_id)
    VALUES (?, ?, ?, ?)`);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    return stmt.run(blog.imageUrl, blog.title, blog.content, blog.userId);
  }

}

// update blog
export async function updateBlog(blogId: number, blog: BlogPayload, userId: number) {
  const currentUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as UserPayload | null;
  const currentBlog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(blogId) as BlogDataType | null;
  // console.log('Current user:', currentUser, currentBlog);
  // const result = {status: false}
  if (!currentUser) {
    throw new Error('User not found');
  } else if (!currentBlog) {
    throw new Error('Blog not found');
  } else if (currentUser?.id !== currentBlog?.user_id) {
    throw new Error('You are not authorized to update this blog');
  } else {
    const stmt = db.prepare(`
      UPDATE blogs
      SET image_url = ?, title = ?, content =?
      Where id = ?
   `);
    const updatedBlog = stmt.run(blog.imageUrl, blog.title, blog.content, blogId);
    console.log('Updated blog:', updatedBlog);
    return updateBlog
  }
}

// delete blog
export async function deleteBlog(blogId: number) {
  const stmt = db.prepare('DELETE FROM blogs WHERE id = ?');
  const deletedBlog = stmt.run(blogId);
  console.log('Deleted blog:', deletedBlog);
  return deletedBlog;
}

export async function toggleLikeBlog(blogId: number, userId: number) {
  const user = db.prepare('SELECT * FROM users WHERE id = ?');
  const currentUser = user.get(userId);
  if (!currentUser) {
    // throw error 404 user not found to invite the user to login to like the blog
    throw new Error('User not found');
  } else {
    const stmt = db.prepare('SELECT * FROM likes WHERE blog_id = ? AND user_id = ?');
    const existingLike = stmt.get(blogId, userId);
    if (existingLike) {
      // unlike 
      const deleteStmt = db.prepare('DELETE FROM likes WHERE blog_id = ? AND user_id = ?');
      const result = deleteStmt.run(blogId, userId);
      // console.log('Unlike result:', result);
      return { liked: false }
    } else {
      // like 
      const insertStmt = db.prepare('INSERT INTO likes (blog_id, user_id) VALUES (?, ?)');
      const result = insertStmt.run(blogId, userId);
      // console.log('Like result:', result);
      return { liked: true }
    };
  }
}