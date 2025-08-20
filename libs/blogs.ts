import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.join(process.cwd(), 'data', 'blogs.db');
const db = new Database(dbPath);

// create alls tables

function initDb() {
  db.exec(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
  );
  db.exec(
    `CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      image_url TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`
  );

  db.exec(
    `CREATE TABLE IF NOT EXISTS likes (
      user_id INTEGER NOT NULL,
      blog_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(user_id, blog_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE
    );`
  )

};

function createSeedUsers() {
  const users = [{
    username: 'admin',
    password: 'admin123'
  }, {
    username: 'duong',
    password: 'duong123'
  }];
  const stmt = db.prepare('SELECT COUNT(*) AS count FROM users');
  const result = stmt.get() as { count: number };
  if (result.count === 0) {
    const insert = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
    users.forEach(user => {
      try {
        insert.run(user.username, user.password)
      } catch (error) {
        console.error(`Error inserting user ${user.username}:`, error);
      }
    })
  }
};
initDb();
createSeedUsers();

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
    `SELECT blogs.id, blogs.title, blogs.content, blogs.image_url as imageUrl, blogs.created_at as createdAt, users.username as author, COUNT(likes.blog_id), EXISTS (SELECT * FROM likes WHERE likes.blog_id = blogs.id AND likes.user_id = 1) 
    FROM blogs
    INNER JOIN users ON blogs.user_id = users.id
    LEFT JOIN likes ON likes.blog_id = blogs.id
    GROUP BY blogs.id
    ORDER BY blogs.created_at DESC
    ${limitClause}`
  );

  return maxLimit ? stmt.all(maxLimit) : stmt.all();
}
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

