// Providers.tsx — temporary debug version
"use client";

import React from "react";
import * as NavbarModule from "@/components/Navbar";
import * as BetterAuthModule from "better-auth/react";
import * as AuthClientModule from "@/lib/auth-client";

console.log("DEBUG Providers imports:", {
  NavbarModule,
  BetterAuthModule,
  AuthClientModule,
});

// Resolve the component/provider from modules (handles default vs named)
const Navbar = (NavbarModule as any).default ?? (NavbarModule as any).Navbar;
const AuthProvider = (BetterAuthModule as any).AuthProvider ?? (BetterAuthModule as any).default;
const authClient = (AuthClientModule as any).authClient ?? (AuthClientModule as any).default ?? AuthClientModule;

if (!Navbar) {
  console.error("Providers debug: Navbar is undefined. NavbarModule:", NavbarModule);
}
if (!AuthProvider) {
  console.error("Providers debug: AuthProvider is undefined. BetterAuthModule:", BetterAuthModule);
}
if (!authClient) {
  console.error("Providers debug: authClient is undefined. AuthClientModule:", AuthClientModule);
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // Render simple fallback if something's broken to avoid React crash and keep logs visible
  if (!Navbar || !AuthProvider || !authClient) {
    return (
      <div style={{ padding: 24, background: "#111", color: "#fff", minHeight: "100vh" }}>
        <h1 style={{ color: "#ff6a00" }}>Providers boot error — check console</h1>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {`Navbar: ${!!Navbar}\nAuthProvider: ${!!AuthProvider}\nauthClient: ${!!authClient}`}
        </pre>
        <p>Open the browser console & server terminal. See logged modules for the undefined export.</p>
      </div>
    );
  }

  return (
    // trust the resolved AuthProvider component
    <AuthProvider client={authClient}>
      <Navbar />
      {children}
    </AuthProvider>
  );
}
