import path from 'path';
import Database from 'better-sqlite3';


const dbPath = path.join(process.cwd(), 'data', 'blogs.db');
export const db = new Database(dbPath);

// create alls tables

function initDb() {
  db.exec(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
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
    email: 'admin@test.fr',
    password: 'admin123'
  }, {
    username: 'duong',
    email: 'duong@test.com',
    password: 'duong123'
  }];
  const stmt = db.prepare('SELECT COUNT(*) AS count FROM users');
  const result = stmt.get() as { count: number };
  if (result.count === 0) {
    const insert = db.prepare(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`);
    users.forEach(user => {
      try {
        insert.run(user.username, user.email, user.password)
      } catch (error) {
        console.error(`Error inserting user ${user.username}:`, error);
      }
    })
  }
};
initDb();
createSeedUsers();