// CodeWinder/app/blog/new/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming this path is correct
import { Input } from "@/components/ui/input";   // Assuming this path is correct
import { Textarea } from "@/components/ui/textarea"; // Assuming this path is correct
import { toast } from 'sonner'; // Assuming you use Sonner for toasts

// --- Component to handle blog creation ---
export default function CreateBlogPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Note: This page relies on the server-side check in /api/blog/route.ts 
    // to ensure only admins can successfully submit data.

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            toast.error("Please fill in both the title and content.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            if (res.ok) {
                toast.success("Blog post created successfully!");
                // Navigate back to the main blog list page
                router.push("/blog");
                router.refresh();
            } else {
                const errorData = await res.json();
                // This handles unauthorized (401) or forbidden (403 - Not Admin) errors
                const errorMessage = errorData.error || "Failed to create blog post.";
                toast.error(errorMessage);

                // If forbidden, redirect to a safer page
                if (res.status === 403) {
                    router.push("/blog");
                }
            }
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
            <div className="max-w-[800px] mx-auto p-8 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800">
                <h1 className="text-3xl font-bold mb-6 text-white text-center">
                    Create New Blog Post
                </h1>
                <p className="text-sm text-center text-red-400 mb-8">
                    (Admin Access Required)
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                            Title
                        </label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog post title"
                            required
                            disabled={isLoading}
                            className="bg-zinc-800 border-zinc-700 text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                            Content
                        </label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your blog content here..."
                            rows={15}
                            required
                            disabled={isLoading}
                            className="bg-zinc-800 border-zinc-700 text-white"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? "Publishing..." : "Publish Post"}
                    </Button>
                </form>
            </div>
        </div>
    );
}