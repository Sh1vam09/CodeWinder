"use client";

import React, { useEffect, useState, useRef } from "react";
import { Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    name: string | null;
    image: string | null;
    username: string | null;
  };
}

export function ChatWindow({ teamId }: { teamId?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Function to fetch messages
  const fetchMessages = async () => {
    try {
      // If teamId is provided, append it to the URL
      const url = teamId ? `/api/chat?teamId=${teamId}` : "/api/chat"; // Default to World Chat

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching chat:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Function to send a message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          content: newMessage,
          teamId: teamId || null, // Send teamId if it exists, else null for World Chat
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setNewMessage("");
        fetchMessages(); // Refresh immediately
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // 3. Poll for new messages every 3 seconds
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [teamId]);

  // 4. Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-zinc-800 bg-zinc-900">
        <h3 className="font-bold text-white flex items-center gap-2">
          {teamId ? "Team Chat" : "World Chat"}
          <span className="text-xs font-normal text-green-500 ml-2">
            ● Live
          </span>
        </h3>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="text-center text-gray-500 mt-10">Loading chat...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No messages yet. Say hi!
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 items-start">
              <Avatar className="w-8 h-8">
                <AvatarImage src={msg.sender.image || ""} />
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-orange-400">
                    {msg.sender.name || msg.sender.username || "User"}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mt-1 bg-zinc-800/50 p-2 rounded-lg inline-block">
                  {msg.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={sendMessage}
        className="p-4 bg-zinc-950 border-t border-zinc-800 flex gap-2"
      >
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="bg-zinc-800 border-zinc-700 text-white focus-visible:ring-orange-600"
        />
        <Button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
