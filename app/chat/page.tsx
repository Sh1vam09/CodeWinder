"use client";

import React from "react";
import { ChatWindow } from "@/components/ChatWindow";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Global Developer Chat
          </h1>
          <p className="text-gray-400">
            Connect with developers from around the world.
          </p>
        </div>

        {/* Embed the Chat Window */}
        <ChatWindow />
      </div>
    </div>
  );
}
