import { readJsonFile, writeJsonFile } from "../utils/fileHelper.js";
import { nanoid } from "nanoid";

const TODOS_FILE = "todos.json";

export async function createTodo(userId, { text }) {
  try {
    const todos = await readJsonFile(TODOS_FILE);

    const newTodo = {
      id: nanoid(),
      text,
      user: userId,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    await writeJsonFile(TODOS_FILE, todos);

    return { success: true, data: newTodo };
  } catch (err) {
    console.error("❌ Failed to create todo:", err);
    return { success: false, message: "Server error" };
  }
}

export async function getAllTodos(userId) {
  try {
    const todos = await readJsonFile(TODOS_FILE);
    const userTodos = todos
      .filter((t) => t.user === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return { success: true, data: userTodos };
  } catch (err) {
    console.error("❌ Failed to fetch todos:", err);
    return { success: false, message: "Server error" };
  }
}

export async function updateTodo(userId, todoId, updateData) {
  try {
    const todos = await readJsonFile(TODOS_FILE);
    const index = todos.findIndex((t) => t.id === todoId && t.user === userId);

    if (index === -1) {
      return { success: false, message: "Todo not found" };
    }

    todos[index] = { ...todos[index], ...updateData };
    await writeJsonFile(TODOS_FILE, todos);

    return { success: true, data: todos[index] };
  } catch (err) {
    console.error("❌ Failed to update todo:", err);
    return { success: false, message: "Server error" };
  }
}

export async function deleteTodo(userId, todoId) {
  try {
    const todos = await readJsonFile(TODOS_FILE);
    const filtered = todos.filter(
      (t) => !(t.id === todoId && t.user === userId)
    );

    if (filtered.length === todos.length) {
      return { success: false, message: "Todo not found" };
    }

    await writeJsonFile(TODOS_FILE, filtered);

    return { success: true, data: { id: todoId } };
  } catch (err) {
    console.error("❌ Failed to delete todo:", err);
    return { success: false, message: "Server error" };
  }
}
