import { auth } from "@/lib/auth"; // Import from the file you created in Step 3
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);