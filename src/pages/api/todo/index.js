export const prerender = false;

import { validateCreateTodo } from "../../../lib/middleware/validateTodo.js";
import {
  createTodoController,
  getAllTodosController,
} from "../../../lib/controllers/todoController.js";
import { errorResponse } from "../../../lib/utils/responseHandler.js";
import { verifyAuth } from "../../../lib/utils/verifyAuth.js";

export async function POST({ request }) {
  try {
    const { user, err, status } = await verifyAuth(request);
    if (!user) return errorResponse(err, status);

    const body = await request.json();
    const error = validateCreateTodo(body);
    if (error) return errorResponse(error, 400);

    return await createTodoController(user.id, body);
  } catch (err) {
    console.error("❌ Unexpected error in POST /todos:", err);
    return errorResponse();
  }
}

export async function GET({ request }) {
  try {
    const { user, error, status } = await verifyAuth(request);
    console.log(status);
    if (!user) return errorResponse(error, status);

    return await getAllTodosController(user.id);
  } catch (err) {
    console.error("❌ Unexpected error in GET /todos:", err);
    return errorResponse();
  }
}
