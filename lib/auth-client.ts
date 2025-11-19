import { createAuthClient } from "better-auth/react";

// Fix: Always use the correct production URL
const baseUrl = 
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

export const authClient = createAuthClient({
  baseURL: baseUrl,
});

export const { signIn, signOut, signUp, useSession } = authClient;
