export function validateSignup({ name, email, password }) {
  if (!name || !email || !password) return "email and password are required";
  if (name.length < 3) return "name must be at least 3 characters";

  if (email.length < 3) return "email must be at least 3 characters";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
}
