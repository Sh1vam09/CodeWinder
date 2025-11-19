import { createAuthClient } from "better-auth/react";

const baseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";

// FIX: Ensure protocol is present.
// If baseUrl is just "code-winder.vercel.app", this makes it "https://code-winder.vercel.app"
const secureBaseUrl = baseUrl.startsWith("http") 
  ? baseUrl 
  : `https://${baseUrl}`;

export const authClient = createAuthClient({
  baseURL: secureBaseUrl,
});

export const { signIn, signOut, signUp, useSession } = authClient;
