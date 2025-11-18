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
import { useRouter } from "next/navigation";

export function JoinTeamModal({ onTeamJoined }: { onTeamJoined: () => void }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/teams/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ joinCode: code }),
      });

      const data = await res.json();

      if (res.ok) {
        setOpen(false);
        setCode("");
        onTeamJoined(); // Refresh the list
      } else {
        setError(data.error || "Failed to join team");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-zinc-800 hover:bg-zinc-700 text-gray-200 font-semibold px-6 py-2 rounded-lg transition-colors border border-zinc-700">
          Join with Code
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Join a Team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-gray-300">
              Enter 6-Digit Join Code
            </label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-zinc-800 border-zinc-700 focus-visible:ring-teal-500 text-center text-2xl tracking-widest uppercase"
              placeholder="000000"
              maxLength={6}
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <Button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full bg-teal-600 hover:bg-teal-700"
          >
            {loading ? "Joining..." : "Join Team"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
