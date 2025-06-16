import jwt from "jsonwebtoken";
import { errorResponse } from "./responseHandler.js";

function parseCookies(cookieString = "") {
  const parsed = Object.fromEntries(
    cookieString.split("; ").map((c) => {
      const [k, v] = c.split("=");
      return [k, decodeURIComponent(v)];
    })
  );
  return parsed;
}

export async function verifyAuth(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parseCookies(cookieHeader);
  const token = cookies.token;

  if (!token) {
    return { user: null, error: "No token", status: 401 };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded, error: null, status: 200 };
  } catch (err) {
    return { user: null, error: "Invalid token", status: 401 };
  }
}
