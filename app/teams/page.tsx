"use client";

import React, { useEffect, useState } from "react";
import { Users, Hash, Copy } from "lucide-react"; // Added icons
import { CreateTeamModal } from "@/components/CreateTeamModal";
import { JoinTeamModal } from "@/components/JoinTeamModal"; // Import the new modal

interface Team {
  id: string;
  name: string;
  description: string;
  tags: string;
  joinCode: string; // Added joinCode
  _count: {
    members: number;
  };
  createdBy: {
    name: string | null;
  };
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    try {
      const res = await fetch("/api/teams");
      if (res.ok) {
        const data = await res.json();
        setTeams(data);
      }
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Helper to copy code to clipboard
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Code ${code} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-2 text-white">Teams</h2>
          <p className="text-gray-400 mb-8">
            Join or create a team to compete and collaborate.
          </p>

          {/* Action Bar */}
          <div className="flex gap-4 mb-10">
            <CreateTeamModal onTeamCreated={fetchTeams} />

            {/* Updated Join Button */}
            <JoinTeamModal onTeamJoined={fetchTeams} />
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loading ? (
              <p className="text-gray-500">Loading teams...</p>
            ) : teams.length === 0 ? (
              <div className="col-span-full text-center p-10 border border-dashed border-zinc-800 rounded-xl">
                <p className="text-gray-500">
                  No teams created yet. Be the first!
                </p>
              </div>
            ) : (
              teams.map((team) => (
                <div
                  key={team.id}
                  className="p-5 bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800 hover:border-teal-500 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Team Avatar */}
                    <div className="w-full h-32 flex items-center justify-center rounded-lg mb-4 bg-zinc-800 group-hover:bg-zinc-800/80 transition-colors relative">
                      <span className="text-3xl font-bold text-teal-500 uppercase">
                        {team.name.substring(0, 2)}
                      </span>

                      {/* JOIN CODE DISPLAY */}
                      <div
                        className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-teal-400 font-mono border border-teal-500/30 flex items-center gap-2 cursor-pointer hover:bg-black/80"
                        onClick={() => copyCode(team.joinCode)}
                        title="Click to copy join code"
                      >
                        <Hash className="w-3 h-3" />
                        {team.joinCode}
                        <Copy className="w-3 h-3 ml-1 opacity-50" />
                      </div>
                    </div>

                    <h4 className="text-xl font-bold mb-1 group-hover:text-teal-400 transition-colors">
                      {team.name}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {team.description || "No description provided."}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {team.tags
                        .split(",")
                        .slice(0, 3)
                        .map(
                          (tag, i) =>
                            tag.trim() && (
                              <span
                                key={i}
                                className="text-[10px] uppercase px-2 py-1 bg-zinc-800 rounded text-gray-400 border border-zinc-700"
                              >
                                {tag}
                              </span>
                            ),
                        )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {team._count.members}{" "}
                      Members
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
