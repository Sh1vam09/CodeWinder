"use client";

import React, { useEffect, useState } from "react";
import { FileText, Clock, User, ArrowRight } from "lucide-react";

// 1. Define interfaces matching your API response (from Prisma)
interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string | null;
  };
}

export default function BlogPage() {
  // 2. Create state to hold real data
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // 3. Fetch data from your new API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog"); // Calls your GET route
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="pt-24 text-center text-white">Loading updates...</div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-white text-center">
          Blog & Community Updates
        </h1>

        <div className="space-y-12">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No updates yet.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="p-6 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800"
              >
                <span className="text-sm font-semibold text-teal-400 uppercase tracking-widest block mb-2">
                  Blog Post
                </span>
                <h2 className="text-2xl font-bold mb-2 text-white">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />{" "}
                    {post.author.name || "Anonymous"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {post.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
