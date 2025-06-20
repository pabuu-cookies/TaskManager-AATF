export function validateUpdateTodo({ text, completed }) {
  const hasText = text !== undefined;
  const hasCompleted = completed !== undefined;

  if (!hasText && !hasCompleted) {
    return "At least one field (text or completed) must be provided";
  }

  if (hasText) {
    if (typeof text !== "string") {
      return "Todo text must be a string";
    }

    if (text.trim().length < 1) {
      return "Todo text cannot be empty";
    }

    if (text.length > 200) {
      return "Todo text cannot exceed 200 characters";
    }
  }

  if (hasCompleted) {
    if (typeof completed !== "boolean") {
      return "Completed must be a boolean";
    }
  }

  return null; // means valid
}
