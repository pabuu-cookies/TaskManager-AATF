import { readJsonFile, writeJsonFile } from "../utils/fileHelper.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const USERS_FILE = "users.json";
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;
console.log("JWT_EXPIRY (raw):", JWT_EXPIRY);

export async function registerUser(name, email, password) {
  try {
    const users = await readJsonFile(USERS_FILE);

    if (users.some((u) => u.email === email)) {
      return { success: false, status: 409, message: "User already exists" };
    }

    users.push({ name, email, password });
    await writeJsonFile(USERS_FILE, users);

    return { success: true };
  } catch (err) {
    console.error("❌ Failed to register user:", err);
    return { success: false, message: "Server error" };
  }
}

export async function loginUser(email, password) {
  try {
    const users = await readJsonFile(USERS_FILE);

    const user = users.find((u) => u.email === email);
    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not found",
      };
    }

    if (user.password !== password) {
      return {
        success: false,
        status: 401,
        message: "Incorrect password",
      };
    }
    console.log(typeof JWT_EXPIRY, JWT_EXPIRY);

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    return {
      success: true,
      data: {
        email,
        token,
      },
    };
  } catch (err) {
    console.error("❌ Login error:", err);
    return {
      success: false,
      message: "Server error",
      status: 500,
    };
  }
}
