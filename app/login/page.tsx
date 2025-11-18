'use client';

import { authClient } from "@/lib/auth-client"; // Import the client
import { Mail, Lock, ArrowRight, Code, Github } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from "react";

// ... keep the GoogleIcon component ...

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/profile", // Redirect here after success
    });
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/profile",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center pt-20 px-4">
      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          {/* LINK TO HOME PAGE ADDED HERE */}
          <a href="/" className="inline-block hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code className="w-7 h-7 text-white" />
            </div>
          </a>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue to CodeWinder</p>
        </div>

        {/* Social Auth Buttons */}
        <div className="flex flex-col gap-3 mb-8">
          <button 
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 w-full bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-white font-medium py-3 rounded-xl transition-all"
          >
            <GoogleIcon/>
            <span>Continue with Google</span>
          </button>
          
          <button 
            onClick={handleGithubSignIn}
            className="flex items-center justify-center gap-3 w-full bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-white font-medium py-3 rounded-xl transition-all"
          >
            <Github className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-zinc-900/50 text-gray-500 uppercase tracking-wider text-xs backdrop-blur-xl">Or continue with email</span>
          </div>
        </div>

        {/* Traditional Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <a href="#" className="text-xs text-orange-500 hover:text-orange-400">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-colors"
              />
            </div>
          </div>

          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group">
            Sign In
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-8 text-gray-400 text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-orange-500 hover:text-orange-400 font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}