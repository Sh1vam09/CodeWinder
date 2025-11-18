"use client";

import React, { useEffect, useState } from "react";
import { Search, MessageCircle, Send, ChevronDown, ChevronUp, User as UserIcon } from "lucide-react";
import { AskQuestionModal } from "@/components/AskQuestionModal";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"; 
// Make sure you have a toast hook, or remove the toast calls if not used

interface Answer {
  id: string;
  content: string;
  createdAt: string;
  author: {
    name: string | null;
    image: string | null;
  };
}

interface Question {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags?: string[];
  author: {
    name: string | null;
    image: string | null;
  };
  answers: Answer[];
  _count: {
    answers: number;
  };
}

export default function QAPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchQuestions = async () => {
    try {
      const res = await fetch("/api/qa/question");
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

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-200 bg-clip-text text-transparent">
              Community Q&A
            </h1>
            <p className="text-gray-400 mt-2">
              Ask questions, share knowledge, and grow together.
            </p>
          </div>
          <AskQuestionModal onQuestionPosted={fetchQuestions} />
        </div>

        {/* Search Bar */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
          />
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading discussions...</div>
          ) : questions.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900 rounded-2xl border border-zinc-800">
              <MessageCircle className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No questions yet</h3>
              <p className="text-gray-400 mb-6">Be the first to start a discussion!</p>
            </div>
          ) : (
            questions
              .filter(
                (q) =>
                  q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  q.content.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((q) => (
                <QuestionCard key={q.id} question={q} />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-component to handle individual question state (Answer expansion)
function QuestionCard({ question }: { question: Question }) {
  const [expanded, setExpanded] = useState(false);
  const [answerContent, setAnswerContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localAnswers, setLocalAnswers] = useState<Answer[]>(question.answers || []);
  const { toast } = useToast();

  const handlePostAnswer = async () => {
    if (!answerContent.trim()) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/qa/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: question.id,
          content: answerContent,
        }),
      });

      if (res.ok) {
        const newAnswer = await res.json();
        setLocalAnswers((prev) => [...prev, newAnswer]);
        setAnswerContent("");
        toast({ title: "Success", description: "Answer posted successfully!" });
      } else {
        toast({ title: "Error", description: "Failed to post answer.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error posting answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800 hover:border-zinc-700 transition-all overflow-hidden">
      <div 
        className="p-6 cursor-pointer" 
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-2 text-zinc-100 group-hover:text-orange-400 transition-colors">
              {question.title}
            </h3>
            <p className="text-gray-400 text-base mb-4 line-clamp-2">
              {question.content}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                   <AvatarImage src={question.author.image || ""} />
                   <AvatarFallback>{question.author.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <span>{question.author.name || "Anonymous"}</span>
              </div>
              <span>•</span>
              <span>{new Date(question.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-zinc-950 p-3 rounded-lg border border-zinc-800 min-w-[80px]">
            <MessageCircle className={`w-6 h-6 mb-1 ${localAnswers.length > 0 ? 'text-orange-500' : 'text-zinc-600'}`} />
            <span className="font-bold text-white">
              {localAnswers.length}
            </span>
            <span className="text-xs text-gray-500">Answers</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
            {expanded ? <ChevronUp className="text-zinc-600 w-5 h-5" /> : <ChevronDown className="text-zinc-600 w-5 h-5" />}
        </div>
      </div>

      {/* Expandable Answer Section */}
      {expanded && (
        <div className="border-t border-zinc-800 bg-zinc-950/50 p-6 space-y-6">
          
          {/* List of Answers */}
          <div className="space-y-4">
            {localAnswers.length > 0 ? (
              localAnswers.map((ans) => (
                <div key={ans.id} className="flex gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarImage src={ans.author.image || ""} />
                    <AvatarFallback className="bg-zinc-700 text-zinc-300">
                      {ans.author.name?.[0] || <UserIcon className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-zinc-300">{ans.author.name || "User"}</span>
                      <span className="text-xs text-zinc-600">{new Date(ans.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-zinc-400 text-sm whitespace-pre-wrap">{ans.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-600 text-sm italic">No answers yet. Be the first to help!</p>
            )}
          </div>

          {/* Add Answer Form */}
          <div className="flex gap-3 pt-2">
             <Textarea 
                placeholder="Write your answer here..." 
                className="bg-zinc-900 border-zinc-800 focus:border-orange-500/50 min-h-[80px]"
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
             />
             <Button 
                onClick={(e) => {
                    e.stopPropagation();
                    handlePostAnswer();
                }}
                disabled={isSubmitting || !answerContent.trim()}
                className="h-auto bg-orange-600 hover:bg-orange-700 text-white px-4"
             >
                {isSubmitting ? "..." : <Send className="w-4 h-4" />}
             </Button>
          </div>
        </div>
      )}
    </div>
  );
}