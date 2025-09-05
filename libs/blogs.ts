import { db } from "./db";

interface Blog {
  imageUrl: string;
  title: string;
  content: string;
  userId: number;
}

// queries

export async function getAllBlogs(maxLimit?: number) {
  // we suppose that the current user can see all blogs of all users and he can like any blog. There are also counter for likes and the button is liked or not.
  let limitClause = '';
  if (maxLimit && maxLimit > 0) {
    limitClause = `LIMIT ?`
  };

  const stmt = db.prepare(
    // suppose that the current user is user with id = 1
    `SELECT blogs.id, blogs.title, blogs.content, blogs.image_url as imageUrl, blogs.created_at as createdAt, users.username as author, COUNT(likes.blog_id) as likes, EXISTS (SELECT * FROM likes WHERE likes.blog_id = blogs.id AND likes.user_id = 1) as isLiked
    FROM blogs
    INNER JOIN users ON blogs.user_id = users.id
    LEFT JOIN likes ON likes.blog_id = blogs.id
    GROUP BY blogs.id
    ORDER BY blogs.created_at DESC
    ${limitClause}`
  );

  return maxLimit ? stmt.all(maxLimit) : stmt.all();
};

export async function getBlogById(blogId: number) {
  // console.log('blogId:', blogId);
  // TODO: assume that user_id = 1 is login
  const stmt = db.prepare(`SELECT blogs.id, blogs.title, blogs.content, blogs.image_url as imageUrl, blogs.created_at as createdAt, users.username as author, COUNT(likes.blog_id) as likes, EXISTS(SELECT * FROM likes WHERE likes.blog_id = blogs.id AND likes.user_id = 1) as isLiked
    FROM blogs 
    INNER JOIN users ON blogs.user_id = users.id
    LEFT JOIN likes ON likes.blog_id = blogs.id 
    WHERE blogs.id = ?
    GROUP BY blogs.id`);

  const result = stmt.get(blogId);
  // console.log('result: ', result)
  if (!result) {
    throw new Error('Blog not found');
  } else {
    // console.log('Blog found:', result);
    return result
  }
};

//mutations:
export async function storeBlog(blog: Blog) {
  const user = db.prepare('SELECT * FROM users WHERE id = ?');
  const currentUser = user.get(blog.userId);
  if (!currentUser) {
    throw new Error('User not found')
  } else {
    const stmt = db.prepare(`
    INSERT INTO blogs (image_url, title, content, user_id)
    VALUES (?, ?, ?, ?)`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return stmt.run(blog.imageUrl, blog.title, blog.content, blog.userId);
  }

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

