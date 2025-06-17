import {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from "../services/todoService.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export async function createTodoController(userId, body) {
  const result = await createTodo(userId, body);

  if (!result.success) {
    return errorResponse(
      result.message || "Failed to create todo",
      result.status || 400
    );
  }

  return successResponse(result.data, 201);
}

export async function getAllTodosController(userId) {
  const result = await getAllTodos(userId);

  if (!result.success) {
    return errorResponse(
      result.message || "Failed to fetch todos",
      result.status || 400
    );
  }

  return successResponse(result.data);
}

export async function updateTodoController(userId, todoId, body) {
  const result = await updateTodo(userId, todoId, body);

  if (!result.success) {
    return errorResponse(
      result.message || "Failed to update todo",
      result.status || 400
    );
  }

  return successResponse(result.data);
}

export async function deleteTodoController(userId, todoId) {
  const result = await deleteTodo(userId, todoId);

  if (!result.success) {
    return errorResponse(
      result.message || "Failed to delete todo",
      result.status || 400
    );
  }

  return successResponse({
    message: "Todo deleted successfully",
  });
}
