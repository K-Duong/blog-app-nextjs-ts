import bcrypt from 'bcryptjs';

import { db } from "./db";

import { MINLENGTHPW } from '@/constants';

//create user
type UserCheck = { username: string, email: string };
interface UserData {
  email: string,
  username: string,
  password: string
};

export const createUser = async (userData: UserData) => {
  try {
    const { email, username, password } = userData;
    // check pw min length
    if (password.length < MINLENGTHPW) {
      throw new Error('Min length pw is 6 characters')
    };

    // constraint uniqueness
    const stmt = db.prepare('SELECT username, email FROM users WHERE username = @username OR email = @email');
    const existingUser = stmt.get({ username, email }) as UserCheck | undefined;

    if (existingUser?.username === username) {
      throw new Error("This username already exists");
    }
    if (existingUser?.email === email) {
      throw new Error("This email already exists");
    }
    // hash
    const hashedPw = await bcrypt.hash(password, 10);

    // insert new user to db
    const insert = db.prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    const result = insert.run(username, email, hashedPw);

    // return success 
    return {
      success: true,
      data: {
        id: result.lastInsertRowid,
        username,
        email
      }
    }

  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        success: false,
        error: e.message
      }
    }
    return {
      success: false,
      error: 'Unknown error'
    }
  }
}

//login

//update user (pw, username)

