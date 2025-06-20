export function validateSignin({ email, password }) {
  if (!email || !password) return "email and password are required";
  return null;
}
