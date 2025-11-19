"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  ExternalLink,
  Trophy,
  Timer,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Contest {
  id: string;
  title: string;
  platform: string;
  startTime: string;
  endTime: string;
  description: string | null;
  url?: string;
}

export default function ContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchContests = async () => {
    setLoading(true);
    setError(false);
    try {
      // Add timestamp to bypass browser cache
      const res = await fetch(`/api/contest?t=${Date.now()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setContests(data);
    } catch (err) {
      console.error("Failed to fetch contests:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const getPlatformStyle = (platform: string) => {
    const p = platform.toLowerCase().replace(/\s/g, "");
    if (p.includes("codeforces"))
      return "bg-red-500/10 text-red-400 border-red-500/50";
    if (p.includes("leetcode"))
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/50";
    if (p.includes("codechef"))
      return "bg-amber-700/10 text-amber-500 border-amber-700/50";
    if (p.includes("atcoder"))
      return "bg-zinc-500/10 text-zinc-200 border-zinc-500/50";
    return "bg-blue-500/10 text-blue-400 border-blue-500/50";
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
              <Trophy className="text-yellow-500 w-8 h-8" />
              Competitive Programming Schedule
            </h1>
            <p className="text-gray-400">
              Live data from Codeforces, AtCoder, LeetCode & CodeChef.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={fetchContests}
            disabled={loading}
            className="border-zinc-700 hover:bg-zinc-800 text-zinc-300"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            {loading ? "Fetching..." : "Refresh Data"}
          </Button>
        </div>

        {error ? (
          <div className="text-center py-12 border border-red-900/50 bg-red-900/10 rounded-xl">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-400">
              Unable to load contests
            </h3>
            <p className="text-gray-400 mb-4">
              There was an issue connecting to the contest APIs.
            </p>
            <Button onClick={fetchContests} variant="secondary">
              Try Again
            </Button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 bg-zinc-900/50 rounded-xl animate-pulse border border-zinc-800"
              />
            ))}
          </div>
        ) : contests.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
            <Trophy className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Upcoming Contests Found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              It looks like a quiet week! No upcoming contests were returned
              from any platform.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contests.map((contest) => (
              <div
                key={contest.id}
                className="flex flex-col bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 hover:border-zinc-600 rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl group"
              >
                <div className="flex justify-between items-start mb-4">
                  <Badge
                    className={`${getPlatformStyle(contest.platform)} border`}
                  >
                    {contest.platform}
                  </Badge>
                </div>

                <h3
                  className="text-lg font-bold text-white mb-3 line-clamp-2 h-14 group-hover:text-yellow-500 transition-colors"
                  title={contest.title}
                >
                  {contest.title}
                </h3>

                <div className="space-y-3 text-sm text-gray-400 mb-6 flex-grow">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-zinc-500" />
                    <span className="text-zinc-300">
                      {new Date(contest.startTime).toLocaleString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-zinc-500" />
                    <span>{contest.description}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-zinc-100 text-zinc-900 hover:bg-white font-bold transition-colors"
                  onClick={() =>
                    contest.url && window.open(contest.url, "_blank")
                  }
                >
                  Register Now
                  <ExternalLink className="w-4 h-4 ml-2 opacity-60" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
