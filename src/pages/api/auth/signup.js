export const prerender = false;
import { validateSignup } from "../../../lib/middleware/validateSignup";
import { signupController } from "../../../lib/controllers/userController.js";
import { errorResponse } from "../../../lib/utils/responseHandler.js";

export async function POST({ request }) {
  try {
    const body = await request.json();
    const error = validateSignup(body);
    if (error) {
      errorResponse(error, 400);
    }

    return await signupController(body);
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    errorResponse();
  }
}
