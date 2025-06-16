export const prerender = false;

import {
  updateTodoController,
  deleteTodoController,
} from "../../../lib/controllers/todoController.js";
import { validateUpdateTodo } from "../../../lib/middleware/validateUpdateTodo.js";
import { errorResponse } from "../../../lib/utils/responseHandler.js";
import { verifyAuth } from "../../../lib/utils/verifyAuth.js";

export async function PATCH(context) {
  try {
    const { user, err, status } = await verifyAuth(request);
    if (!user) return errorResponse(err, status);

    const body = await context.request.json();
    const { id } = context.params;

    const error = validateUpdateTodo(body);
    if (error) return errorResponse(error, 400);

    return await updateTodoController(user.id, id, body);
  } catch (err) {
    console.error(`❌ PUT /api/todos/${context.params.id} failed:`, err);
    return errorResponse();
  }
}

export async function DELETE(context) {
  try {
    const { user, error, status } = await verifyAuth(request);
    if (!user) return errorResponse(error, status);

    const { id } = context.params;
    return await deleteTodoController(user.id, id);
  } catch (err) {
    console.error(`❌ DELETE /api/todos/${context.params.id} failed:`, err);
    return errorResponse();
  }
}
