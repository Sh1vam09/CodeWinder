import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db"; 

// CRITICAL FIX: Always ensure protocol is present
function getBaseURL() {
  // If NEXT_PUBLIC_BETTER_AUTH_URL is set, use it
  if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
    const url = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
    // Add https:// if missing
    return url.startsWith('http') ? url : `https://${url}`;
  }
  
  // In production (Vercel), use VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Local development fallback
  return "http://localhost:3000";
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  baseURL: getBaseURL(),
});
