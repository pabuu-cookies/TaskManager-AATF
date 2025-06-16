export const prerender = false;
import { validateSignin } from "../../../lib/middleware/validateSignin.js";
import { loginController } from "../../../lib/controllers/userController.js";
import { errorResponse } from "../../../lib/utils/responseHandler.js";

export async function POST({ request }) {
  try {
    const body = await request.json();
    const error = validateSignin(body);
    if (error) {
      return errorResponse(error, 400);
    }

    return await loginController(body);
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    errorResponse();
  }
}
