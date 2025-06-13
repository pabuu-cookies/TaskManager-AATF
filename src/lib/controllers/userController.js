import { registerUser, loginUser } from "../services/userService.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";

export async function signupController({ name, email, password }) {
  const result = await registerUser(name, email, password);

  if (!result.success) {
    return errorResponse();
  }

  return successResponse({ message: "User successfully created" }, 201);
}

export async function loginController(body) {
  const { email, password } = body;
  const result = await loginUser(email, password);

  if (!result.success) {
    return errorResponse(result.message, result.status);
  }

  return successResponse({
    message: "Login successful",
    data: result.data,
  });
}
