export const prerender = false;

import { logoutController } from "../../../lib/controllers/userController.js";

export async function GET() {
  return logoutController();
}
