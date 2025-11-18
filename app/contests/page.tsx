"use client";

import React, { useEffect, useState } from "react";
import { Calendar, ExternalLink, Trophy } from "lucide-react";

interface Contest {
  id: string;
  title: string;
  platform: string;
  startTime: string;
  endTime: string;
  description: string | null;
}

export default function ContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await fetch("/api/contests");
        if (res.ok) {
          const data = await res.json();
          setContests(data);
        }
      } catch (error) {
        console.error("Failed to fetch contests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
          <Trophy className="text-yellow-500" /> Upcoming Contests
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-gray-500">Loading contests...</p>
          ) : contests.length === 0 ? (
            <div className="col-span-full text-center p-8 border border-dashed border-zinc-800 rounded-lg">
              <p className="text-gray-400">
                No upcoming contests found in the database.
              </p>
            </div>
          ) : (
            contests.map((contest) => (
              <div
                key={contest.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-yellow-600 transition-colors shadow-lg relative overflow-hidden group"
              >
                {/* Platform Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-zinc-800 text-gray-300 rounded-full border border-zinc-700">
                    {contest.platform}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 mt-2">
                  {contest.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-500" />
                    <span>
                      Starts: {new Date(contest.startTime).toLocaleString()}
                    </span>
                  </div>
                  <p className="line-clamp-2">
                    {contest.description || "No description available."}
                  </p>
                </div>

                <button className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  Register Now <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
