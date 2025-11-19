"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming this is your button component
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

// ⭐️ NEW INTERFACE FOR ADMIN CHECK ⭐️
interface AdminStatus {
  isAdmin: boolean;
  isLoggedIn: boolean;
}

export default function BlogPage() {
  // 2. Create state to hold real data
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // ⭐️ ADD STATE FOR ADMIN CHECK ⭐️
  const [adminStatus, setAdminStatus] = useState<AdminStatus>({ isAdmin: false, isLoggedIn: false });
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  // 3. Fetch all blog posts
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

  // ⭐️ FETCH ADMIN STATUS (New useEffect) ⭐️
  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const res = await fetch("/api/admin/status");
        if (res.ok) {
          const data = await res.json();
          setAdminStatus(data);
        }
      } catch (error) {
        console.error("Failed to fetch admin status:", error);
      } finally {
        setLoadingAdmin(false);
      }
    }
    fetchAdminStatus();
  }, []);


  // Wait for both posts and admin status to load
  if (loading || loadingAdmin)
    return (
      <div className="pt-24 text-center text-white">Loading updates...</div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-[1000px] mx-auto">

        {/* ⭐️ CONDITIONAL BUTTON RENDERING IN HEADER ⭐️ */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-white">
            Blog & Community Updates
          </h1>

          {/* Conditional Admin Button */}
          {adminStatus.isAdmin && (
            <Link href="/blog/new" passHref>
              <Button className="bg-teal-600 hover:bg-teal-700">
                Create New Blog
              </Button>
            </Link>
          )}
        </div>

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