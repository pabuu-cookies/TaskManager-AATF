import { registerUser, loginUser } from "../services/userService.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import cookie from "cookie";

export async function signupController({ name, email, password }) {
  const result = await registerUser(name, email, password);

  if (!result.success) {
    return errorResponse(
      result.message || "failed to signup",
      result.status || 400
    );
  }

  return successResponse({ message: "User successfully created" }, 201);
}

export async function loginController(body) {
  const { email, password } = body;
  const result = await loginUser(email, password);

  if (!result.success) {
    return errorResponse(
      result.message || "failed to login",
      result.status || 400
    );
  }
  const { user, token } = result;
  const cookieHeader = cookie.serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return successResponse(user, 200, { "Set-Cookie": cookieHeader });
}

export function logoutController() {
  const expiredCookie = cookie.serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  return successResponse({ message: "Logged out successfully" }, 200, {
    "Set-Cookie": expiredCookie,
  });
}
