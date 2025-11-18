'use client';

import Link from 'next/link';
import { Code } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-600 flex items-center justify-center rounded">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">CodeWinder</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/chat" className="text-gray-300 hover:text-white transition-colors">
            World Chat
          </Link>
          <Link href="/teams" className="text-gray-300 hover:text-white transition-colors">
            Teams
          </Link>
          <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/contests" className="text-gray-300 hover:text-white transition-colors">
            Contests
          </Link>
          <Link href="/qa" className="text-gray-300 hover:text-white transition-colors">
            Q&A
          </Link>
        </div>

        {/* Auth Buttons */}
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/signup" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
            Sign Up
          </Link>
          <Link href="/login" className="text-gray-300 hover:text-white font-semibold px-6 py-2 transition-colors">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}