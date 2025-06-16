export function validateCreateTodo({ text }) {
  if (!text || typeof text !== "string") {
    return "Todo text is required";
  }

  if (text.trim().length < 1) {
    return "Todo text cannot be empty";
  }

  if (text.length > 200) {
    return "Todo text cannot exceed 200 characters";
  }

  return null; // means valid
}
