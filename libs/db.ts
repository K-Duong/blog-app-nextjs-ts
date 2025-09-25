
import path from 'path';
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
// import { hashPw } from './users';


const dbPath = path.join(process.cwd(), 'data', 'blogs.db');
export const db = new Database(dbPath);

// create alls tables
export const hashPw = async (password: string): Promise<string> => await bcrypt.hash(password, 10)

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

async function createSeedUsers() {
  const users = [{
    username: 'admin',
    email: 'admin@test.fr',
    password: 'admin123',
    blogs: [{
      title: "Far far away",
      image_url: 'https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA',
      content: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.\r\n' +
        '\r\n' +
        'It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.\r\n' +
        '\r\n' +
        'The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way.',
      created_at: "2025-09-22 14:48:32",
    },
    {
      title: "Mr September.",
      image_url: 'https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM',
      content: 'Bringing so sociable felicity supplied mr. September suspicion far him two acuteness perfectly. Covered as an examine so regular of. Ye astonished friendship remarkably no. Window admire matter praise you bed whence. Delivered ye sportsmen zealously arranging frankness estimable as. Nay any article enabled musical shyness yet sixteen yet blushes. Entire its the did figure wonder off.\r\n' +
        '\r\n' +
        'Did shy say mention enabled through elderly improve. As at so believe account evening behaved hearted is. House is tiled we aware. It ye greatest removing concerns an overcame appetite. Manner result square father boy behind its his. Their above spoke match ye mr right oh as first. Be my depending to believing perfectly concealed household. Point could to built no hours smile sense.\r\n',

      created_at: "2025-09-02 11:04:31",
    }]
  }, {
    username: 'duong',
    email: 'duong@test.com',
    password: 'duong123',
    blogs: [{
      title: "Breakfast on the beach",
      image_url: 'https://fastly.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g',
      content: 'Behind sooner dining so window excuse he summer. Breakfast met certainty and fulfilled propriety led. Waited get either are wooded little her. Contrasted unreserved as mr particular collecting it everything as indulgence. Seems ask meant merry could put. Age old begin had boy noisy table front whole given.\r\n' +
        '\r\n' +
        'Marianne or husbands if at stronger ye. Considered is as middletons uncommonly. Promotion perfectly ye consisted so. His chatty dining for effect ladies active. Equally journey wishing not several behaved chapter she two sir. Deficient procuring favourite extensive you two. Yet diminution she impossible understood age.\r\n',
      created_at: "2025-09-22 14:48:32",
    }]
  }];

  const stmt = db.prepare('SELECT COUNT(*) AS count FROM users');
  const result = stmt.get() as { count: number };
  if (result.count === 0) {
    // console.log("start seed data")
    const insertUser = db.prepare(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`);
    const insertBlogs = db.prepare(`INSERT INTO blogs (user_id, title, image_url, content, created_at) VALUES (?, ?, ?, ?, ?)`)
    const insertSeeders = db.transaction((user, hashedPassword) => {
      const newUser = insertUser.run(user.username, user.email, hashedPassword);
      if (newUser.lastInsertRowid > 0) {
        user.blogs.forEach((blog: { title: string, image_url: string, content: string, created_at: string }) => {
          insertBlogs.run(newUser.lastInsertRowid, blog.title, blog.image_url, blog.content, blog.created_at || new Date().toISOString())
        })
      };
    })
    for (const user of users) {
      try {
        // hashed pw
        const hashedPassword = await hashPw(user.password)
        insertSeeders(user, hashedPassword);

        // console.log("user created:", user.username);
      } catch (error) {
        console.error(`Error inserting user ${user.username}:`, error);
      }
    }

  }
};
initDb();
createSeedUsers();