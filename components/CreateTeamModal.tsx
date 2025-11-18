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

export function CreateTeamModal({
  onTeamCreated,
}: {
  onTeamCreated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        body: JSON.stringify({ name, description, tags }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setOpen(false);
        // Reset form
        setName("");
        setDescription("");
        setTags("");
        onTeamCreated(); // Refresh parent list
      } else {
        alert("Failed to create team. Please try again.");
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
        <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20">
          Create Team
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Create a New Team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-300">
              Team Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-800 border-zinc-700 focus-visible:ring-teal-500"
              placeholder="e.g. CodeCrushers"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-300">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-zinc-800 border-zinc-700 focus-visible:ring-teal-500"
              placeholder="What is your team about?"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-300">
              Tags (comma separated)
            </label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="bg-zinc-800 border-zinc-700 focus-visible:ring-teal-500"
              placeholder="e.g. java, competitive, beginners"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700"
          >
            {loading ? "Creating..." : "Create Team"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
