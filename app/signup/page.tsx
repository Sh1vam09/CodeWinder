"use client";

import { authClient } from "@/lib/auth-client";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Code,
  Github,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Reusable Google Icon
const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Social Sign Up
  const handleSocialSignUp = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider: provider,
      callbackURL: "/profile",
    });
  };

  // Email Sign Up Handler
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/profile",
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          router.push("/profile");
        },
        onError: (ctx) => {
          // Show exact error (e.g., "User already exists")
          alert(ctx.error.message || "Something went wrong during signup");
          setLoading(false);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center pt-24 pb-12 px-4">
      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <a
            href="/"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code className="w-7 h-7 text-white" />
            </div>
          </a>
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400">
            Join the competitive programming community
          </p>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3 mb-8">
          <button
            onClick={() => handleSocialSignUp("google")}
            className="flex items-center justify-center gap-3 w-full bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-white font-medium py-3 rounded-xl transition-all"
          >
            <GoogleIcon />
            <span>Sign up with Google</span>
          </button>
          <button
            onClick={() => handleSocialSignUp("github")}
            className="flex items-center justify-center gap-3 w-full bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-white font-medium py-3 rounded-xl transition-all"
          >
            <Github className="w-5 h-5" />
            <span>Sign up with GitHub</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-zinc-900/50 text-gray-500 uppercase tracking-wider text-xs backdrop-blur-xl">
              Or sign up with email
            </span>
          </div>
        </div>

        {/* Signup Form */}
        <form className="space-y-5" onSubmit={handleEmailSignUp}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="codewizard"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Get Started"
              )}
              {!loading && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </div>
        </form>

        <p className="text-center mt-8 text-gray-400 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-orange-500 hover:text-orange-400 font-semibold"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
