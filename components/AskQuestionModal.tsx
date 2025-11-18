"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function AskQuestionModal({
  onQuestionPosted,
}: {
  onQuestionPosted: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // FIX: Changed fetch URL from "/api/qa/questions" (plural) to "/api/qa/question" (singular)
      const res = await fetch("/api/qa/question", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setOpen(false);
        setTitle("");
        setContent("");
        onQuestionPosted(); // Refresh the parent list
      } else {
        alert("Failed to post question. Are you logged in?");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
          Ask Question
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Ask a Question</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
              placeholder="e.g. How does Dijkstra work?"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Details</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
              placeholder="Describe your doubt..."
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600"
          >
            {loading ? "Posting..." : "Submit Question"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}