"use client";

import React, { useEffect, useState } from "react";
import { Search, Tag, MessageCircle } from "lucide-react";
import { AskQuestionModal } from "@/components/AskQuestionModal"; // Ensure this path matches where you saved it

// Interface matching your API/Prisma structure
interface Question {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags?: string[]; // Optional if you haven't implemented tags in the DB yet
  author: {
    name: string | null;
    image: string | null;
  };
  _count: {
    answers: number;
  };
}

export default function QAPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch questions (reused when a new question is posted)
  const fetchQuestions = async () => {
    try {
      const res = await fetch("/api/qa/questions");
      if (res.ok) {
        const data = await res.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Filter locally for now
  const filteredQuestions = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            Q&A / Doubts
          </h1>
          <p className="text-gray-400 text-lg">
            Ask questions, share knowledge, and find answers.
          </p>
        </header>

        {/* Search and Action Area */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 justify-center max-w-4xl mx-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 bg-zinc-800 text-white text-lg rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-shadow"
            />
            <Search className="w-6 h-6 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
          </div>

          {/* The Modal Component - Passes the refresh function */}
          <AskQuestionModal onQuestionPosted={fetchQuestions} />
        </div>

        {/* Questions List */}
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading questions...</p>
          ) : filteredQuestions.length === 0 ? (
            <p className="text-center text-gray-500">
              No questions found. Be the first to ask!
            </p>
          ) : (
            filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="p-6 bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800 hover:border-orange-600 transition-all group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                      {q.title}
                    </h3>
                    <p className="text-gray-400 text-base mb-4 line-clamp-2">
                      {q.content}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Posted by {q.author.name || "Anonymous"}</span>
                      <span>•</span>
                      <span>{new Date(q.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-zinc-950 p-3 rounded-lg border border-zinc-800 min-w-[80px]">
                    <MessageCircle className="w-6 h-6 text-orange-500 mb-1" />
                    <span className="font-bold text-white">
                      {q._count.answers}
                    </span>
                    <span className="text-xs text-gray-500">Answers</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
