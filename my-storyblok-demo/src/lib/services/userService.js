import { readJsonFile, writeJsonFile } from "../utils/fileHelper.js";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const USERS_FILE = "users.json";
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

export async function registerUser(name, email, password) {
  try {
    const users = await readJsonFile(USERS_FILE);

    if (users.some((u) => u.email === email)) {
      return { success: false, status: 409, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ id: nanoid(), name, email, password: hashedPassword });
    await writeJsonFile(USERS_FILE, users);

    return { success: true };
  } catch (err) {
    console.error(" Failed to register user:", err);
    return { success: false, message: "Server error" };
  }
}

export async function loginUser(email, password) {
  try {
    const users = await readJsonFile(USERS_FILE);
    const user = users.find((u) => u.email === email);

    if (!user) {
      return { success: false, status: 404, message: "User not found" };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { success: false, status: 401, message: "Incorrect password" };
    }

    const tokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    return {
      success: true,
      user: tokenPayload,
      token,
    };
  } catch (err) {
    return {
      success: false,
      message: "Server error",
      status: 500,
    };
  }
}
